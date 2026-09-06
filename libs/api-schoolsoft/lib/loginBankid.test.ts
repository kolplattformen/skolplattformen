import * as fs from 'fs'
import * as path from 'path'
import { CookieManager, Fetch, Response } from '@skolplattformen/api'
import { ApiSchoolsoft } from './api'
import { parseAutoPostForm } from './loginBankid'

const fixtureHtml = (name: string): string =>
  fs.readFileSync(
    path.join(__dirname, '__mocks__', 'html', `${name}.html`),
    'utf-8'
  )
const fixtureJson = (name: string): string =>
  fs.readFileSync(
    path.join(__dirname, '__mocks__', 'json', `${name}.json`),
    'utf-8'
  )

const startpageFixture = fixtureHtml('startpage')
const PNR_PAGE = fixtureHtml('grandid-pnr')
const STATUS_PAGE = fixtureHtml('grandid-status')

interface FakeResponseInit {
  status?: number
  body?: string
  location?: string
}

const fakeResponse = ({
  status = 200,
  body = '',
  location,
}: FakeResponseInit): Response =>
  ({
    ok: status >= 200 && status < 300,
    status,
    statusText: String(status),
    headers: {
      get: (name: string) => (name === 'location' ? location ?? null : null),
    },
    text: async () => body,
    json: async () => JSON.parse(body),
  } as unknown as Response)

const SSO_URL =
  'https://saml2.grandid.com/saml2/idp/SSO_abc?SAMLRequest=xyz&RelayState=cookie%3A1'
const SESSION_URL =
  'https://login.grandid.com/?sessionid=abcd1234abcd1234abcd1234abcd1234'
const LOGIN_PAGE_URL = `${SESSION_URL}&ReturnTo=https%3A%2F%2Fsaml2.grandid.com%2Fmodule.php%2Fgrandid%2Fresume.php%3FState%3DT`
const BANKID_URL = `${SESSION_URL}&bankid=1`
const COLLECT_URL = `${SESSION_URL}&collect=1`
const CANCEL_URL = `${SESSION_URL}&cancel-bankid=1`
const RESUME_URL =
  'https://saml2.grandid.com/module.php/grandid/resume.php?State=T'
const ACS_URL =
  'https://sms.schoolsoft.se/procivitas/Shibboleth.sso/SAML2/POST'
const REACT_URL = 'https://sms.schoolsoft.se/procivitas/react/'

const LOGIN_PAGE_HTML =
  '<html><body><form method="post" action="' +
  LOGIN_PAGE_URL +
  '"><input type="text" name="username"><input type="password" name="password"></form></body></html>'

// OBS: i riktiga auto-post-form är RelayState RAW (HTML-escapad), inte
// procentkodad - samma form som shibboleth skickar tillbaka. Håll den så.
const SAML_FORM_HTML = `<html><body onload="document.forms[0].submit()"><form action="${ACS_URL}" method="post"><input type="hidden" name="SAMLResponse" value="PHNhbWw+ZmFrZTwvc2FtbD4=" /><input name="RelayState" type="hidden" value="cookie:1788718468_652b" /></form></body></html>`

/** Ett collect-svar från fixtures ('pending'|'userSign'|'complete') eller råtext. */
type CollectStep = 'pending' | 'userSign' | 'complete' | { raw: string }

interface ChainState {
  orderPosted: boolean
  cancelCalled: boolean
  polls: number
  /** Slumpplan för collect-pollerna; sista steget upprepas i oändlighet */
  collectPlan: CollectStep[]
  /** Svar på pnr-POST (default: riktiga grandid-status-fixturen) */
  postBody?: string
  /** Svar på bankidstart-GET (default: pnr-sidfixturen) */
  bankidStartBody?: string
}

const collectBody = (step: CollectStep): string => {
  if (typeof step === 'object') return step.raw
  return fixtureJson(`grandid-collect-${step}`)
}

const createChainFetch = (state: ChainState) => {
  const postedSamlBodies: string[] = []
  const fetch: Fetch = async (
    url: string,
    init?: { method?: string; body?: string }
  ) => {
    const method = init?.method || 'GET'
    if (url.includes('/samlLogin.jsp')) {
      return fakeResponse({ status: 302, location: SSO_URL })
    }
    if (url.includes('saml2.grandid.com/saml2/idp/SSO')) {
      return fakeResponse({ status: 302, location: LOGIN_PAGE_URL })
    }
    if (url === LOGIN_PAGE_URL) {
      return fakeResponse({ body: LOGIN_PAGE_HTML })
    }
    if (url.startsWith(CANCEL_URL)) {
      state.cancelCalled = true
      return fakeResponse({ body: '<html>Avbruten</html>' })
    }
    if (url.startsWith(COLLECT_URL)) {
      state.polls += 1
      const plan = state.collectPlan
      const step = plan[Math.min(state.polls - 1, plan.length - 1)]
      return fakeResponse({ body: collectBody(step) })
    }
    if (url.startsWith(BANKID_URL)) {
      if (method === 'POST') {
        state.orderPosted = true
        return fakeResponse({ body: state.postBody ?? STATUS_PAGE })
      }
      return fakeResponse({ body: state.bankidStartBody ?? PNR_PAGE })
    }
    if (url === SESSION_URL) {
      // efter complete navigerar sidan hit -> SAML-kedjan fortsätter
      return fakeResponse({ status: 302, location: RESUME_URL })
    }
    if (url.includes('resume.php')) {
      return fakeResponse({ body: SAML_FORM_HTML })
    }
    if (url.includes('Shibboleth.sso/SAML2/POST') && method === 'POST') {
      postedSamlBodies.push(init?.body || '')
      return fakeResponse({ status: 302, location: REACT_URL })
    }
    if (url === REACT_URL) {
      return fakeResponse({ body: '<html>schoolsoft react</html>' })
    }
    if (url.includes('right_student_startpage.jsp')) {
      return fakeResponse({ body: startpageFixture })
    }
    if (url.includes('/rest-api/parent/calendar/settings')) {
      return fakeResponse({
        body: '{"userType":"STUDENT","userId":17149,"app":false,"mode":"agenda","categories":[],"showWeekends":false,"agendaRange":"day"}',
      })
    }
    throw new Error(`createChainFetch: oväntad URL ${method} ${url}`)
  }
  return { fetch, postedSamlBodies }
}

const inMemoryCookieManager = (): CookieManager => {
  let store: { [host: string]: string } = {}
  return {
    setCookie: async () => undefined,
    getCookies: async () => [],
    setCookieString: async (cookieString: string, url: string) => {
      const host = new URL(url).host
      store[host] = store[host]
        ? `${store[host]}; ${cookieString}`
        : cookieString
    },
    getCookieString: async (url: string) => store[new URL(url).host] || '',
    clearAll: async () => {
      store = {}
    },
  }
}

const createApi = (state: ChainState) => {
  const { fetch, postedSamlBodies } = createChainFetch(state)
  const api = new ApiSchoolsoft({
    fetch,
    cookieManager: inMemoryCookieManager(),
    pollIntervalMs: 1,
    loginTimeoutMs: 600,
  })
  return { api, state, postedSamlBodies }
}

/** Samlar checker-events tills OK/ERROR/CANCELLED och returnerar sekvensen. */
const track = (
  checker: ReturnType<ApiSchoolsoft['login']> extends Promise<infer T>
    ? T
    : never
): { events: string[]; done: Promise<string[]> } => {
  const events: string[] = []
  const done = new Promise<string[]>((resolve) => {
    checker.on('PENDING', () => events.push('PENDING'))
    checker.on('USER_SIGN', () => events.push('USER_SIGN'))
    checker.on('OK', () => {
      events.push('OK')
      resolve(events)
    })
    checker.on('ERROR', () => {
      events.push('ERROR')
      resolve(events)
    })
    checker.on('CANCELLED', () => {
      events.push('CANCELLED')
      resolve(events)
    })
  })
  return { events, done }
}

describe('Schoolsoft BankID-login (GrandID, liveverifierat protokoll)', () => {
  it('lyckas: token ur status-sidan, PENDING → USER_SIGN → OK, SAML vidare', async () => {
    const { api } = createApi({
      orderPosted: false,
      cancelCalled: false,
      polls: 0,
      collectPlan: ['pending', 'pending', 'userSign', 'complete'],
    })
    const loginEvents: string[] = []
    api.on('login', () => loginEvents.push('login'))

    const events: string[] = []
    const checker = await api.login('19500101-1234')
    expect(checker.token).toEqual('TOKEN000-0000-4000-8000-000000000000')
    const done = new Promise<string>((resolve) => {
      checker.on('PENDING', () => events.push('PENDING'))
      checker.on('USER_SIGN', () => events.push('USER_SIGN'))
      checker.on('OK', () => {
        events.push('OK')
        resolve('OK')
      })
      checker.on('ERROR', () => {
        events.push('ERROR')
        resolve('ERROR')
      })
      checker.on('CANCELLED', () => events.push('CANCELLED'))
    })
    await done

    expect(events).toEqual(['PENDING', 'USER_SIGN', 'OK'])
    expect(api.isLoggedIn).toBe(true)
    expect(api.getPersonalNumber()).toEqual('195001011234')
    expect(loginEvents).toEqual(['login'])
    const children = await api.getChildren()
    expect(children[0].id).toEqual('17149')
  })

  it('emittar USER_SIGN bara en gång även vid upprepade userSign-hints', async () => {
    const { api } = createApi({
      orderPosted: false,
      cancelCalled: false,
      polls: 0,
      collectPlan: ['pending', 'userSign', 'userSign', 'complete'],
    })
    const events: string[] = []
    const checker = await api.login('195001011234')
    const done = new Promise<string>((resolve) => {
      checker.on('PENDING', () => events.push('PENDING'))
      checker.on('USER_SIGN', () => events.push('USER_SIGN'))
      checker.on('OK', () => resolve('OK'))
      checker.on('ERROR', () => resolve('ERROR'))
    })
    expect(await done).toEqual('OK')
    expect(events.filter((e) => e === 'USER_SIGN').length).toEqual(1)
  })

  it('cancel() ringer grandids avbryt-endpoint och emittar CANCELLED utan ERROR', async () => {
    const { api, state } = createApi({
      orderPosted: false,
      cancelCalled: false,
      polls: 0,
      collectPlan: ['pending'],
    })
    const checker = await api.login('195001011234')
    const { events, done } = track(checker)
    // invänta PENDING innan cancel för deterministisk ordning
    await new Promise((r) => setTimeout(r, 25))
    await checker.cancel()
    await done
    expect(events).toEqual(['PENDING', 'CANCELLED'])
    expect(state.cancelCalled).toBe(true)
    expect(api.isLoggedIn).toBe(false)
  })

  it('emittar ERROR vid brutet collect-svar (ej JSON)', async () => {
    const { api } = createApi({
      orderPosted: false,
      cancelCalled: false,
      polls: 0,
      collectPlan: ['pending', { raw: '<html>Något gick fel</html>' }],
    })
    const checker = await api.login('195001011234')
    const { events, done } = track(checker)
    await done
    expect(events).toEqual(['PENDING', 'ERROR'])
    expect(api.isLoggedIn).toBe(false)
  })

  it('emittar ERROR när personnumret saknas i AcadeMedias AD', async () => {
    const { api } = createApi({
      orderPosted: false,
      cancelCalled: false,
      polls: 0,
      collectPlan: ['complete'],
      postBody:
        '<html><body>Ditt personnummer 195001011234 kunde inte hittas i AD eller så är ditt konto inaktiverat.</body></html>',
    })
    const checker = await api.login('195001011234')
    const { events, done } = track(checker)
    await done
    expect(events).toEqual(['ERROR'])
    expect(api.isLoggedIn).toBe(false)
  })

  it('emittar ERROR när GrandID avvisar bankid-start', async () => {
    const { api } = createApi({
      orderPosted: false,
      cancelCalled: false,
      polls: 0,
      collectPlan: ['complete'],
      bankidStartBody: 'Unauthorized',
    })
    const checker = await api.login('195001011234')
    const { events, done } = track(checker)
    await done
    expect(events).toEqual(['ERROR'])
  })

  it('kräver personnummer med 12 siffror', async () => {
    const { api } = createApi({
      orderPosted: false,
      cancelCalled: false,
      polls: 0,
      collectPlan: ['complete'],
    })
    const checker = await api.login('1212')
    const { events, done } = track(checker)
    await done
    expect(events).toEqual(['ERROR'])
  })
})

describe('parseAutoPostForm', () => {
  it('extraherar action och hidden-fält (båda attributordningarna)', () => {
    const form = parseAutoPostForm(SAML_FORM_HTML)
    expect(form).not.toBeNull()
    expect(form?.action).toEqual(ACS_URL)
    expect(form?.fields.SAMLResponse).toEqual('PHNhbWw+ZmFrZTwvc2FtbD4=')
    expect(form?.fields.RelayState).toEqual('cookie:1788718468_652b')
  })

  it('returnerar null utan SAMLResponse', () => {
    expect(parseAutoPostForm('<html><body>hej</body></html>')).toBeNull()
  })
})
