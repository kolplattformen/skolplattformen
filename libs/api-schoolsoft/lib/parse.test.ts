import * as fs from 'fs'
import * as path from 'path'
import {
  isSsAgendaResponse,
  parseAbsenceWeek,
  parseChildIdentity,
  parseMessages,
  parseNewsDetail,
  parseNewsList,
  parseParentName,
  parseStaffSelect,
  parseUnreadMessages,
  staffToTeachers,
  svDateToIso,
} from './parse'

const html = (name: string): string =>
  fs.readFileSync(
    path.join(__dirname, '__mocks__', 'html', `${name}.html`),
    'utf-8'
  )

const NOW = new Date('2026-09-06T12:00:00')

describe('startpage-parse', () => {
  const startpage = html('startpage')

  it('parsar barnets identitet ur sidhuvudet', () => {
    expect(parseChildIdentity(startpage)).toEqual({
      name: 'Edward Landgren',
      school: 'ProCivitas Karlberg',
      className: 'SA24a',
    })
  })

  it('returnerar null utan sidhuvud', () => {
    expect(parseChildIdentity('<html></html>')).toBeNull()
  })

  it('parsar vårdnadshavarens namn', () => {
    expect(parseParentName(startpage)).toEqual('Christian')
  })

  it('parsar olästa meddelanden ur aria-label', () => {
    expect(parseUnreadMessages(startpage)).toEqual(8)
  })
})

describe('parseNewsList', () => {
  it('parsar startsidans nyhetsbox', () => {
    const items = parseNewsList(html('startpage'))
    expect(items.length).toBeGreaterThanOrEqual(9)
    expect(items[0].id).toEqual('54267')
    expect(items[0].title).toContain('Fagersta')
    expect(items[0].category).toEqual('Rektorn informerar')
  })

  it('parsar nyhetssidan med datumtexter', () => {
    const items = parseNewsList(html('news'))
    expect(items.length).toBeGreaterThanOrEqual(9)
    expect(items.map((i) => i.id).slice(0, 2)).toEqual(['54267', '53096'])
    expect(items[0].dateText).toEqual('24 aug.')
    expect(items[1].dateText).toEqual('14 aug.')
  })
})

describe('svDateToIso', () => {
  it('svensk kortmånad med innevarande år', () => {
    expect(svDateToIso('24 aug.', NOW)).toEqual('2026-08-24')
    expect(svDateToIso('19 aug.', NOW)).toEqual('2026-08-19')
  })

  it('relativa dagar', () => {
    expect(svDateToIso('Idag', NOW)).toEqual('2026-09-06')
    expect(svDateToIso('Igår', NOW)).toEqual('2026-09-05')
  })

  it('övriga strängar passerar orörda', () => {
    expect(svDateToIso('2026-01-05', NOW)).toEqual('2026-01-05')
  })
})

describe('parseNewsDetail', () => {
  it('parsar aktiv nyhets brödtext och avsändare', () => {
    const detail = parseNewsDetail(html('news'))
    expect(detail).not.toBeNull()
    expect(detail?.author).toContain('Maria Lafrenz')
    expect(detail?.publishedText).toContain('24 aug')
    expect(detail?.bodyText).toContain('Fagersta')
    expect(detail?.bodyText.length).toBeGreaterThanOrEqual(200)
  })
})

describe('parseMessages', () => {
  const messages = parseMessages(html('messages'))

  it('parsar inkorgen', () => {
    expect(messages.length).toBeGreaterThanOrEqual(15)
    expect(messages[0].id).toEqual('117511')
    expect(messages[0].subject).toEqual('Ansökan studieresor 26/27')
    expect(messages[0].from).toEqual('Jonny Gartne')
    expect(messages[0].preview.length).toBeGreaterThan(0)
    expect(messages[0].preview).not.toContain('...')
    expect(messages[0].bodyHtml).toContain('Google Form')
    expect(messages[0].teacherId).toEqual('697')
  })
})

describe('parseStaffSelect / staffToTeachers', () => {
  const staff = staffToTeachers(parseStaffSelect(html('messages')))

  it('parsar personallistan', () => {
    expect(staff.length).toBeGreaterThanOrEqual(50)
    const rebecka = staff.find((t) => t.id === 7790)
    expect(rebecka).toBeDefined()
    expect(rebecka?.lastname).toEqual('Lundvall')
    expect(rebecka?.firstname).toEqual('Rebecka')
    expect(rebecka?.active).toBe(true)
  })
})

describe('parseAbsenceWeek', () => {
  const week = parseAbsenceWeek(html('absence-form'))

  it('parsar veckans dagkolumner', () => {
    expect(week.days.length).toEqual(5)
    expect(week.days[2].label).toContain('Ons')
    expect(week.days[2].reported).toBe(true)
    expect(week.days[0].reported).toBe(false)
    expect(week.days[0].disabled).toBe(true)
  })

  it('parsar vem som anmält', () => {
    expect(week.reportedBy).toContain('Lundvall')
  })
})

describe('isSsAgendaResponse', () => {
  it('validerar lessons-fixturen', () => {
    const json = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '__mocks__', 'json', 'lessons-agenda-w36.json'),
        'utf-8'
      )
    )
    expect(isSsAgendaResponse(json)).toBe(true)
    expect(isSsAgendaResponse({})).toBe(false)
    expect(isSsAgendaResponse(null)).toBe(false)
  })
})
