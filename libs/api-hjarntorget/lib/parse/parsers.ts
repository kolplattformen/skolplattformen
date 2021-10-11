import * as html from 'node-html-parser'
import { decode } from 'he'

// TODO: Move this into the parse folder and convert it to follow the pattern of other parsers (include tests).
export function extractInitBankIdParams(shibbolethRedirectUrl: any) {
  const targetParamIndex = shibbolethRedirectUrl.indexOf('Target=') + 'Target='.length
  const targetParam = decodeURIComponent(shibbolethRedirectUrl.substring(targetParamIndex))
  const initBankIdUrl = 'https://auth.goteborg.se/FIM/sps/BankID/saml20/logininitial?'
  const initBankIdParams = new URLSearchParams({
    ITFIM_WAYF_IDP: 'https://m00-mg-local.idp.funktionstjanster.se/samlv2/idp/metadata/0/34',
    submit: 'Mobilt BankID',
    ResponseBinding: 'HTTPPost',
    RequestBinding: 'HTTPPost',
    Target: targetParam,
  }).toString()
  return { initBankIdUrl, initBankIdParams }
}

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
  const mvghostRequestBody = new URLSearchParams({ 
    RelayState: relayState, 
    SAMLRequest: samlRequest 
  }).toString()
  return mvghostRequestBody
}

export function extractHjarntorgetSAMLLogin(authGbgLoginResponseText: string) {
  const authGbgLoginDoc = html.parse(decode(authGbgLoginResponseText))
  const inputAttrs = authGbgLoginDoc.querySelectorAll('input').map(i => (i as any).rawAttrs)
  const relayState = extractInputField('RelayState', inputAttrs)
  const samlResponse = extractInputField("SAMLResponse", inputAttrs)
  const hjarntorgetSAMLLoginRequestBody = new URLSearchParams({ 
    RelayState: relayState, 
    SAMLResponse: samlResponse 
  }).toString()
  return hjarntorgetSAMLLoginRequestBody
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
  const authGbgLoginBody = new URLSearchParams({
    'SAMLResponse': SAMLResponseText || '',
    'RelayState': RelayStateText || '',
  }).toString()
  return authGbgLoginBody
}