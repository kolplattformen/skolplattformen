import * as fs from 'fs'
import * as path from 'path'
import { CookieManager, Fetch, Response } from '@skolplattformen/api'
import { ApiSchoolsoft } from './api'
import { parseAutoPostForm } from './loginBankid'

const startpageFixture = fs.readFileSync(
  path.join(__dirname, '__mocks__', 'html', 'startpage.html'),
  'utf-8'
)

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
    headers: { get: (name: string) => (name === 'location' ? location ?? null : null) },
    text: async () => body,
    json: async () => JSON.parse(body),
  } as unknown as Response)

const SSO_URL =
  'https://saml2.grandid.com/saml2/idp/SSO_abc?SAMLRequest=xyz&RelayState=cookie%3A1'
const LOGIN_PAGE_URL =
  'https://login.grandid.com/?sessionid=abc123def456&ReturnTo=https%3A%2F%2Fsaml2.grandid.com%2Fmodule.php%2Fgrandid%2Fresume.php%3FState%3DT'
const BANKID_URL =
  'https://login.grandid.com/?sessionid=abc123def456&bankid=1'
const RESUME_URL =
  'https://saml2.grandid.com/module.php/grandid/resume.php?State=T'
const ACS_URL =
  'https://sms.schoolsoft.se/procivitas/Shibboleth.sso/SAML2/POST'
const REACT_URL = 'https://sms.schoolsoft.se/procivitas/react/'

const LOGIN_PAGE_HTML =
  '<html><body><form method="post" action="' +
  LOGIN_PAGE_URL +
  '"><input type="text" name="username"><input type="password" name="password"></form></body></html>'
const PNR_PAGE_HTML =
  '<html><body><form id="pnrform" method="post" action="' +
  BANKID_URL +
  '"><input type="text" name="pnr"></form></body></html>'
const WAIT_PAGE_HTML = '<html><body>Väntar på godkännande i BankID...</body></html>'
// OBS: i riktiga auto-post-form är RelayState RAW (HTML-escapad), inte
// procentkodad - samma form som shibboleth skickar tillbaka. Håll den så.
const SAML_FORM_HTML = `<html><body onload="document.forms[0].submit()"><form action="${ACS_URL}" method="post"><input type="hidden" name="SAMLResponse" value="PHNhbWw+ZmFrZTwvc2FtbD4=" /><input name="RelayState" type="hidden" value="cookie:1788718468_652b" /></form></body></html>`

interface ChainState {
  orderPosted: boolean
  polls: number
  /** När poller når detta antal: 302 tillbaka till resume */
  completeAtPoll: number
  /** Svarssida för poller före completion */
  waitBody: string
  /** t.ex. för att simulera utgången grandid-session */
  bankidStartBody?: string
  /** Svar på pnr-POST (default: WAIT_PAGE_HTML) */
  postBody?: string
}

const createChainFetch = (state: ChainState) => {
  const postedSamlBodies: string[] = []
  const fetch: Fetch = async (url: string, init?: { method?: string; body?: string }) => {
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
    if (url.startsWith(BANKID_URL)) {
      if (state.bankidStartBody !== undefined) {
        return fakeResponse({ body: state.bankidStartBody })
      }
      if (method === 'POST') {
        state.orderPosted = true
        return fakeResponse({ body: state.postBody ?? WAIT_PAGE_HTML })
      }
      if (!state.orderPosted) {
        return fakeResponse({ body: PNR_PAGE_HTML })
      }
      state.polls += 1
      if (state.polls >= state.completeAtPoll) {
        return fakeResponse({ status: 302, location: RESUME_URL })
      }
      return fakeResponse({ body: state.waitBody })
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
    loginTimeoutMs: 500,
  })
  return { api, postedSamlBodies }
}

const collectEvents = (
  api: ApiSchoolsoft,
  pnr?: string
): { done: Promise<string[]> } => {
  const events: string[] = []
  const done = new Promise<string[]>((resolve) => {
    api
      .login(pnr)
      .then((checker) => {
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
      .catch((error) => resolve([...events, `THROW:${(error as Error).message}`]))
  })
  return { done }
}

describe('Schoolsoft BankID-login (GrandID-kedjan)', () => {
  it('lyckas: PENDING → USER_SIGN → OK, session etableras, SAML postas vidare', async () => {
    const state: ChainState = {
      orderPosted: false,
      polls: 0,
      completeAtPoll: 2,
      waitBody: WAIT_PAGE_HTML,
    }
    const { api, postedSamlBodies } = createApi(state)
    const loginEvents: string[] = []
    api.on('login', () => loginEvents.push('login'))

    const { done } = collectEvents(api, '19500101-1234')
    const events = await done

    expect(events).toEqual(['PENDING', 'USER_SIGN', 'OK'])
    expect(api.isLoggedIn).toBe(true)
    expect(api.getPersonalNumber()).toEqual('195001011234')
    expect(loginEvents).toEqual(['login'])
    // SAML-formuläret postades med okodade fält
    expect(postedSamlBodies.length).toEqual(1)
    expect(postedSamlBodies[0]).toContain(
      'SAMLResponse=PHNhbWw%2BZmFrZTwvc2FtbD4%3D'
    )
    expect(postedSamlBodies[0]).toContain('RelayState=cookie%3A1788718468_652b')
    // barn hämtbart direkt efter login
    const children = await api.getChildren()
    expect(children[0].id).toEqual('17149')
  })

  it('avbryter via cancel() utan att emitta ERROR', async () => {
    const state: ChainState = {
      orderPosted: false,
      polls: 0,
      completeAtPoll: 9999,
      waitBody: WAIT_PAGE_HTML,
    }
    const { api } = createApi(state)

    const events: string[] = []
    const done = new Promise<string[]>((resolve) => {
      void api.login('195001011234').then((checker) => {
        checker.on('PENDING', () => events.push('PENDING'))
        checker.on('USER_SIGN', async () => {
          events.push('USER_SIGN')
          await checker.cancel()
        })
        checker.on('CANCELLED', () => {
          events.push('CANCELLED')
          resolve(events)
        })
        checker.on('OK', () => events.push('OK'))
        checker.on('ERROR', () => events.push('ERROR'))
      })
    })
    let forEvents = await done
    await new Promise((r) => setTimeout(r, 20))
    expect(forEvents).toEqual(['PENDING', 'USER_SIGN', 'CANCELLED'])
    expect(api.isLoggedIn).toBe(false)
    forEvents = events
  })

  it('emittar CANCELLED när status-sidan signalerar avbrott', async () => {
    const state: ChainState = {
      orderPosted: false,
      polls: 0,
      completeAtPoll: 9999,
      waitBody: '<html><body>Autentiseringen avbruten.</body></html>',
    }
    const { api } = createApi(state)
    const { done } = collectEvents(api, '195001011234')
    const events = await done
    expect(events).toEqual(['PENDING', 'USER_SIGN', 'CANCELLED'])
    expect(api.isLoggedIn).toBe(false)
  })

  it('emittar ERROR när personnumret saknas i AcadeMedias AD', async () => {
    const state: ChainState = {
      orderPosted: false,
      polls: 0,
      completeAtPoll: 1,
      waitBody: WAIT_PAGE_HTML,
      postBody:
        '<html><body>Ditt personnummer 195001011234 kunde inte hittas i AD eller så är ditt konto inaktiverat.</body></html>',
    }
    const { api } = createApi(state)
    const { done } = collectEvents(api, '195001011234')
    const events = await done
    expect(events).toEqual(['PENDING', 'ERROR'])
    expect(api.isLoggedIn).toBe(false)
  })

  it('emittar ERROR när GrandID avvisar bankid-start', async () => {
    const state: ChainState = {
      orderPosted: false,
      polls: 0,
      completeAtPoll: 1,
      waitBody: WAIT_PAGE_HTML,
      bankidStartBody: 'Unauthorized',
    }
    const { api } = createApi(state)
    const { done } = collectEvents(api, '195001011234')
    const events = await done
    expect(events).toEqual(['PENDING', 'ERROR'])
    expect(api.isLoggedIn).toBe(false)
  })

  it('kräver personnummer med 12 siffror', async () => {
    const state: ChainState = {
      orderPosted: false,
      polls: 0,
      completeAtPoll: 1,
      waitBody: WAIT_PAGE_HTML,
    }
    const { api } = createApi(state)
    const { done } = collectEvents(api, '1212')
    const events = await done
    expect(events).toEqual(['ERROR'])
    expect(api.isLoggedIn).toBe(false)
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
