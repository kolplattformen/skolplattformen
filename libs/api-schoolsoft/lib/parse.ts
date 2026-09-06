import { parse, HTMLElement } from 'node-html-parser'
import { decode } from 'he'
import { Teacher } from '@skolplattformen/api'
import {
  SsAbsenceDayState,
  SsAbsenceWeek,
  SsAgendaResponse,
  SsChildIdentity,
  SsMessage,
  SsNewsDetail,
  SsNewsListItem,
  SsStaffOption,
} from './types'

/**
 * Alla parsers är rena funktioner: rå HTML in (från fetchFixtures eller
 * nätverk), strukturerad data ut. Schoolsoft-JSP deklarerar iso-8859-1 men
 * våra fixtures är sparade som UTF-8; he.decode normaliserar entiteter
 * (&nbsp;, &amp;, ...) innan trädet byggs - samma mönster som api-infomentor.
 */

const ELEMENT_NODE = 1

const asElements = (nodes: HTMLElement['childNodes']): HTMLElement[] =>
  nodes.filter((n) => n.nodeType === ELEMENT_NODE) as HTMLElement[]

/** Rensar &nbsp;/radbrytningar/multimellanslag och trimmar. */
const text = (el: HTMLElement | null | undefined): string =>
  (el?.text || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()

const hasClass = (el: HTMLElement | null | undefined, cls: string): boolean =>
  !!el && (el.getAttribute('class') || '').split(/\s+/).includes(cls)

const nextElement = (el: HTMLElement): HTMLElement | null => {
  let node = el.nextSibling as HTMLElement | null
  while (node && node.nodeType !== ELEMENT_NODE) {
    node = node.nextSibling as HTMLElement | null
  }
  return node
}

const previousElement = (el: HTMLElement): HTMLElement | null => {
  let node = el.previousSibling as HTMLElement | null
  while (node && node.nodeType !== ELEMENT_NODE) {
    node = node.previousSibling as HTMLElement | null
  }
  return node
}

/**
 * Närmast föregående .h3_bold i dokumentordning (kategorirubrik ovanför
 * nyhetsraden/gruppen) - går via förälderns syskonkedja.
 */
const precedingCategory = (el: HTMLElement): string | undefined => {
  let node: HTMLElement | null = el
  for (let depth = 0; depth < 6 && node; depth++) {
    let sib = previousElement(node)
    while (sib) {
      if (hasClass(sib, 'h3_bold')) {
        const label = text(sib)
        if (label) return label
      }
      sib = previousElement(sib)
    }
    node = node.parentNode as HTMLElement | null
  }
  return undefined
}

const parseDoc = (html: string): HTMLElement => parse(decode(html))

/**
 * Barnets identitet ur sidhuvudet (#parent-header-root):
 *   <p class="...MuiTypography-body2...">Edward Landgren</p>
 *   <span class="...MuiTypography-caption...">ProCivitas Karlberg  | SA24a</span>
 */
export const parseChildIdentity = (html: string): SsChildIdentity | null => {
  const header = parseDoc(html).querySelector('#parent-header-root')
  if (!header) return null

  const infoSpan = header.querySelector('span.MuiTypography-caption')
  const nameP = infoSpan
    ? infoSpan.parentNode?.querySelector('p') ?? null
    : header.querySelector('p.MuiTypography-body2')

  const name = text(nameP)
  if (!name) return null

  const [school = '', className = ''] = text(infoSpan).split('|')
  return {
    name,
    school: school.trim(),
    className: className.trim(),
  }
}

/** Vårdnadshavarens förnamn ur användarmeny-knappen i sidhuvudet. */
export const parseParentName = (html: string): string | null => {
  const button = parseDoc(html).querySelector('button#menu-button')
  const name = text(button?.querySelector('p'))
  return name || null
}

/** Antal nya meddelanden ur menyknapps-aria-labeln ("8 nya meddelanden"). */
export const parseUnreadMessages = (html: string): number => {
  const link = parseDoc(html).querySelector('a#messages-link-button')
  const label = link?.getAttribute('aria-label') || text(link)
  const match = label.match(/(\d+)/)
  return match ? Number(match[1]) : 0
}

/**
 * Nyhetslista - två varianter:
 * 1. Startsidans box: <a class="toplist-item" href="right_student_news.jsp?requestid=...">
 *    med .heading_bold (titel) + efterföljande div (ingress).
 * 2. Nyhetssidan (right_student_news.jsp): accordion-grupper
 *    div#accordion-group{id} med span#name{id}, .preview-block och
 *    .accordion-heading-date-wide (datumtext, t.ex. "24 aug."/"Igår").
 * Kategori = närmast föregående .h3_bold ("Rektorn informerar" osv).
 */
export const parseNewsList = (html: string): SsNewsListItem[] => {
  const doc = parseDoc(html)
  const items: SsNewsListItem[] = []

  doc.querySelectorAll('a.toplist-item').forEach((a) => {
    const href = a.getAttribute('href') || ''
    const idMatch = href.match(/requestid=(\d+)/)
    if (!idMatch) return
    const titleEl = a.querySelector('.heading_bold')
    const excerptEl = titleEl ? nextElement(titleEl) : null
    items.push({
      id: idMatch[1],
      title: text(titleEl),
      excerpt: text(excerptEl),
      category: precedingCategory(a),
    })
  })

  doc.querySelectorAll('div.accordion-group').forEach((group) => {
    const id = (group.getAttribute('id') || '').replace('accordion-group', '')
    if (!/^\d+$/.test(id)) return
    items.push({
      id,
      title: text(group.querySelector(`#name${id}`)),
      excerpt: text(group.querySelector('.preview-block')),
      dateText:
        text(group.querySelector('.accordion-heading-date-wide')) ||
        text(group.querySelector('.accordion-heading-date')) ||
        undefined,
      category: precedingCategory(group),
    })
  })

  return items
}

const SV_MONTHS: { [month: string]: number } = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  maj: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  okt: 10,
  nov: 11,
  dec: 12,
}

const pad2 = (n: number): string => String(n).padStart(2, '0')

const toIsoDate = (d: Date): string =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`

/**
 * Schoolsofts datumtexter till ISO-datum:
 *  "24 aug." -> "2026-08-24" (innevarande år)
 *  "Igår"    -> gårdagens datum
 *  "Idag"    -> dagens datum
 *  övriga    -> oförändrat (t.ex. redan ISO)
 */
export const svDateToIso = (dateText: string, now: Date = new Date()): string => {
  const value = (dateText || '').trim()
  const lower = value.toLowerCase().replace(/\.$/, '')

  if (lower === 'idag') return toIsoDate(now)
  if (lower === 'igår') {
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    return toIsoDate(yesterday)
  }
  if (lower === 'imorgon' || lower === 'i morgon') {
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return toIsoDate(tomorrow)
  }

  const match = lower.match(/^(\d{1,2})\s+([a-zåäö]+)$/)
  if (match && SV_MONTHS[match[2]]) {
    return `${now.getFullYear()}-${pad2(SV_MONTHS[match[2]])}-${pad2(
      Number(match[1])
    )}`
  }

  return dateText
}

/**
 * Brödtext + avsändare för AKTIV nyhet på nyhetssidan (gruppens accordion-
 * inner är serverrenderad inline):
 *   p.tinymce-p...        -> brödstycken
 *   .inner_right_info     -> <label>Från</label><div>Maria Lafrenz (P)</div>
 *                            <label>Publicerad</label><div>24 aug.</div>
 */
export const parseNewsDetail = (html: string): SsNewsDetail | null => {
  const doc = parseDoc(html)
  const info = doc.querySelector('.inner_right_info')
  if (!info) return null

  let author: string | undefined
  let publishedText: string | undefined
  asElements(info.childNodes).forEach((el) => {
    if ((el.tagName || '').toLowerCase() !== 'label') return
    const label = text(el).toLowerCase()
    const value = text(nextElement(el))
    if (label === 'från') author = value || undefined
    if (label === 'publicerad') publishedText = value || undefined
  })

  let inner: HTMLElement | null = info
  while (inner && !hasClass(inner, 'accordion-inner')) {
    inner = inner.parentNode as HTMLElement | null
  }

  const left = inner?.querySelector('.accordion_inner_left')
  const paragraphs = left ? left.querySelectorAll('p.tinymce-p') : []
  const bodyText = paragraphs
    .map((p) => text(p))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return { bodyText, author, publishedText }
}

/**
 * Inkorgen (right_student_message.jsp?folder=inbox): en accordion-grupp per
 * meddelande. bodyHtml ligger i span#mess{id}; lärar-id för svar i den
 * dolda input[name="teacher{id}"].
 */
export const parseMessages = (html: string): SsMessage[] => {
  const doc = parseDoc(html)
  return doc.querySelectorAll('div.accordion-group').map((group) => {
    const id = (group.getAttribute('id') || '').replace('accordion-group', '')
    const preview = text(group.querySelector('.preview-block')).replace(
      /\.{3}$/,
      ''
    )
    const bodyEl = group.querySelector(`#mess${id}`)
    const teacherInput = group.querySelector(`input[name="teacher${id}"]`)
    const teacherId = teacherInput?.getAttribute('value') || undefined
    return {
      id,
      subject: text(group.querySelector(`#messheader${id}`)),
      preview,
      from: text(group.querySelector('.accordion-heading-from')),
      dateText: text(group.querySelector('.accordion-heading-date')),
      bodyHtml: (bodyEl?.innerHTML || '').trim(),
      teacherId,
    }
  })
}

/**
 * Meddelandesidans mottagarlista: <select name="users"> med personal som
 * "Efternamn Förnamn". Tom/disablead raden value="-222" hoppas över.
 */
export const parseStaffSelect = (html: string): SsStaffOption[] => {
  const select = parseDoc(html).querySelector('select[name="users"]')
  if (!select) return []
  return select
    .querySelectorAll('option')
    .map((option) => ({
      id: Number(option.getAttribute('value')),
      fullName: text(option),
    }))
    .filter(
      (option) => Number.isFinite(option.id) && option.id !== -222 && !!option.fullName
    )
}

/**
 * "Lundvall Rebecka" -> { lastname: 'Lundvall', firstname: 'Rebecka' }
 * (efternamnet kan i sin tur innehålla mellanslag - splitta på SISTA).
 */
export const staffToTeachers = (options: SsStaffOption[]): Teacher[] =>
  options.map(({ id, fullName }) => {
    const splitAt = fullName.lastIndexOf(' ')
    const lastname = splitAt > 0 ? fullName.slice(0, splitAt) : fullName
    const firstname = splitAt > 0 ? fullName.slice(splitAt + 1) : ''
    return {
      id,
      sisId: '',
      firstname,
      lastname,
      active: true,
      status: '',
      timeTableAbbreviation: '',
    }
  })

/**
 * Frånvaroblanketten (right_student_absence.jsp): en kolumn per veckodag
 * (.wrapper-all) med subformheader "Mån 31 aug" osv. En andra subformheader
 * "Anmäld frånvaro" i kolumnen markerar rapporterad dag; knappen ls-{n} är
 * disabled för passerade/låsta dagar. "Anmält av: X" ligger som fri text i
 * formuläret.
 */
export const parseAbsenceWeek = (html: string): SsAbsenceWeek => {
  const doc = parseDoc(html)
  const form = doc.querySelector('#days') || doc

  const days: SsAbsenceDayState[] = form
    .querySelectorAll('.wrapper-all')
    .map((column, dayIndex) => {
      const headers = column.querySelectorAll('.subformheader')
      const button = column.querySelector('button[name="b"]')
      return {
        dayIndex,
        label: text(headers[0]),
        reported: headers.some((h) => text(h).includes('Anmäld frånvaro')),
        disabled: button?.getAttribute('disabled') !== undefined,
      }
    })

  const raw = decode(html).replace(/\u00a0/g, ' ')
  const reportedByMatch = raw.match(/Anmält av:\s*([^<]+)/)

  return {
    days,
    reportedBy: reportedByMatch ? reportedByMatch[1].trim() : undefined,
  }
}

/** Typvakt för agenda-svaret från kalender-REST:en. */
export const isSsAgendaResponse = (
  json: unknown
): json is SsAgendaResponse =>
  !!json &&
  Array.isArray((json as SsAgendaResponse).lessons) &&
  ((json as SsAgendaResponse).lessons as unknown[]).every(
    (lesson) =>
      typeof (lesson as SsAgendaResponse['lessons'][0]).eventId === 'number' &&
      typeof (lesson as SsAgendaResponse['lessons'][0]).startDate ===
        'string' &&
      typeof (lesson as SsAgendaResponse['lessons'][0]).endDate === 'string'
  )
