import * as html from 'node-html-parser'
import { decode } from 'he'

// TODO: Move this into the parse folder and convert it to follow the pattern of other parsers (include tests).

export const extractInputField = (sought: string, attrs: string[]) => {
  // there must be a better way to do this...
  const s = attrs.find(e => e.indexOf(sought) >= 0) || ""
  const v = s.substring(s.indexOf('value="') + 'value="'.length)
  return v.substring(0, v.length - 2)
}

export function extractMvghostRequestBody(initBankIdResponseText: string) {
  const doc = html.parse(decode(initBankIdResponseText))
  const inputAttrs = doc.querySelectorAll('input').map(i => (i as any).rawAttrs)
  const relayState = extractInputField('RelayState', inputAttrs)
  const samlRequest = extractInputField("SAMLRequest", inputAttrs)
  const mvghostRequestBody = `RelayState=${encodeURIComponent(relayState)}&SAMLRequest=${encodeURIComponent(samlRequest)}`
  
  return mvghostRequestBody
}

export function extractHjarntorgetSAMLLogin(authGbgLoginResponseText: string) {
  const authGbgLoginDoc = html.parse(decode(authGbgLoginResponseText))
  const inputAttrs = authGbgLoginDoc.querySelectorAll('input').map(i => (i as any).rawAttrs)
  const RelayStateText = extractInputField('RelayState', inputAttrs)
  const SAMLResponseText = extractInputField("SAMLResponse", inputAttrs)

  return `SAMLResponse=${encodeURIComponent(SAMLResponseText || '')}&RelayState=${encodeURIComponent(RelayStateText || '')}`
}

export function extractAuthGbgLoginRequestBody(signatureResponseText: string) {
  const signatureResponseDoc = html.parse(decode(signatureResponseText))
  const signatureResponseTextAreas = signatureResponseDoc.querySelectorAll('textarea')
  const SAMLResponseElem = signatureResponseTextAreas.find(ta => {
    const nameAttr = ta.getAttribute("name")
    return nameAttr === 'SAMLResponse'
  })
  const SAMLResponseText = SAMLResponseElem?.rawText
  const RelayStateElem = signatureResponseTextAreas.find(ta => {
    const nameAttr = ta.getAttribute("name")
    return nameAttr === 'RelayState'
  })
  const RelayStateText = RelayStateElem?.rawText
  const authGbgLoginBody = `SAMLResponse=${encodeURIComponent(SAMLResponseText || '')}&RelayState=${encodeURIComponent(RelayStateText || '')}`
  return authGbgLoginBody
}

export const parseCalendarItem = (x: html.HTMLElement): { id: number; title: string; startDate: string; endDate: string } => {
  const info = Array.from(x.querySelectorAll('a'))
  // TODO: the identifier is realy on this format: '\d+:\d+' currently we only take the first part so Id will clash between items
  const id = info[0].getAttribute("onClick")?.replace(new RegExp("return viewEvent\\('(\\d+).+"), "$1") || NaN
  const day = info[1].textContent
  const timeSpan = info[2].textContent
  const [startTime, endTime] = timeSpan.replace(".", ":").split("-")

  return { id: +id, title: info[0].textContent, startDate: `${day} ${startTime}`, endDate: `${day} ${endTime}` }
}