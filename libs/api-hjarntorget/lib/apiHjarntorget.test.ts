import { wrapToughCookie } from '@skolplattformen/api'
import { CookieJar } from 'tough-cookie'
import { ApiHjarntorget } from './apiHjarntorget'

const setupSuccessfullLoginInitiation = (fetcherMock: jest.Mock) => {
  // 'begin-login'
  fetcherMock.mockReturnValueOnce(
    Promise.resolve({
      url: 'some url with url encoded at the end?return=hello',
    })
  )

  // 'init-shibboleth-login'
  fetcherMock.mockReturnValueOnce(
    Promise.resolve({
      url: 'some url with url encoded at the end?Target=hello',
    })
  )

  // 'init-bankId'
  fetcherMock.mockReturnValueOnce(
    Promise.resolve({
      text: jest.fn().mockReturnValue(
        Promise.resolve(`
        <html>
        <body>
        <input name="RelayState" value="aUUID"></input>
        <input name="SAMLRequest" value="somebase64value"></input>
        </body>
        </html>`)
      ),
    })
  )

  // 'pick-mvghost'
  fetcherMock.mockReturnValueOnce(
    Promise.resolve({
      url: 'some url to a mvghost',
    })
  )

  // 'start-bankId'
  fetcherMock.mockReturnValueOnce(
    Promise.resolve({
      url: 'some base url to a mvghost to use when polling status',
    })
  )
}

const setupSuccessfullBankIdLogin = (fetcherMock: jest.Mock) => {
  // 'poll-bankid-status'
  fetcherMock.mockReturnValueOnce(
    Promise.resolve({
      json: jest.fn().mockReturnValue(
        Promise.resolve({
          infotext: '',
          location: 'an url to go to confirm the login',
        })
      ),
    })
  )

  // 'confirm-signature-redirect'
  fetcherMock.mockReturnValueOnce(
    Promise.resolve({
      text: jest.fn().mockReturnValue(
        Promise.resolve(`
        <html>
        <body>
        <textarea name="RelayState">relay state probably same uuid as before</textarea>
        <textarea name="SAMLResponse">base64 encoded saml response</textarea>
        </body>
        </html>`)
      ),
    })
  )

  // 'authgbg-saml-login'
  fetcherMock.mockReturnValueOnce(
    Promise.resolve({
      text: jest.fn().mockReturnValue(
        Promise.resolve(`
        <html>
        <body>
        <input name="RelayState" value="aUUID"></input>
        <input name="SAMLResponse" value="somebase64value"></input>
        </body>
        </html>`)
      ),
    })
  )

  // 'hjarntorget-saml-login'
  fetcherMock.mockReturnValueOnce(Promise.resolve({ status: 200 }))
}

describe('api', () => {
  let fetcherMock: jest.Mock
  let api: ApiHjarntorget

  beforeEach(() => {
    const fetcher = jest.fn()
    fetcherMock = fetcher as jest.Mock

    const cookieManager = wrapToughCookie(new CookieJar())
    cookieManager.clearAll()
    api = new ApiHjarntorget(jest.fn(), cookieManager)
    api.replaceFetcher(fetcher)
  })
  it('works', () => {
    expect(1 + 1).toBe(2)
  })
  // describe('#login', () => {
  //     it('goes through single sing-on steps', async (done) => {
  //         setupSuccessfullLoginInitiation(fetcherMock)
  //         setupSuccessfullBankIdLogin(fetcherMock)
  //         const personalNumber = 'my personal number'

  //         const loginComplete = new Promise((resolve, reject) => {
  //             api.on('login', () => done())
  //         });
  //         await api.login(personalNumber)
  //     })
  //     it('checker emits PENDING', async (done) => {
  //         // 'poll-bankid-status'
  //         fetcherMock.mockReturnValueOnce(Promise.resolve({
  //             json: jest.fn().mockReturnValue(Promise.resolve({
  //                 infotext: "some prompt to do signing in app",
  //                 location: ""
  //             }))
  //         }))

  //         const status = checkStatus(fetcherMock, "some url")
  //         status.on('PENDING', () => {
  //             status.cancel()
  //             done()
  //         })
  //     })
  //     it('checker emits ERROR', async (done) => {
  //         // 'poll-bankid-status'
  //         fetcherMock.mockReturnValueOnce(Promise.resolve({
  //             json: jest.fn().mockReturnValue(Promise.resolve({
  //                 infotext: "some prompt to do signing in app",
  //                 location: "url with error in the name"
  //             }))
  //         }))

  //         const status = checkStatus(fetcherMock, "some url")
  //         status.on('ERROR', () => {
  //             status.cancel()
  //             done()
  //         })
  //     })
  //     it('checker emits ERROR when an exception occurs', async (done) => {
  //         // 'poll-bankid-status'
  //         fetcherMock.mockReturnValueOnce(Promise.resolve({
  //             json: jest.fn().mockReturnValue(Promise.resolve({
  //                 infotext: undefined,
  //                 location: undefined
  //             }))
  //         }))

  //         const status = checkStatus(fetcherMock, "some url")
  //         status.on('ERROR', () => {
  //             status.cancel()
  //             done()
  //         })
  //     })
  //     it('remembers used personal number', async (done) => {
  //         setupSuccessfullLoginInitiation(fetcherMock)
  //         setupSuccessfullBankIdLogin(fetcherMock)
  //         const personalNumber = 'my personal number'
  //         await api.login(personalNumber)
  //         api.on('login', () => {
  //             expect(api.getPersonalNumber()).toEqual(personalNumber)
  //             done()
  //         })
  //     })
  //     it('forgets used personal number if sign in is unsuccessful', async (done) => {
  //         setupSuccessfullLoginInitiation(fetcherMock)
  //         // 'poll-bankid-status'
  //         fetcherMock.mockReturnValueOnce(Promise.resolve({
  //             json: jest.fn().mockReturnValue(Promise.resolve({
  //                 infotext: "",
  //                 location: "an url to go to confirm the login"
  //             }))
  //         }))
  //         // 'confirm-signature-redirect'
  //         fetcherMock.mockReturnValueOnce(Promise.resolve({
  //             text: Promise.resolve("some error occured")
  //         }))

  //         const personalNumber = 'my personal number'
  //         const status = await api.login(personalNumber)

  //         status.on('ERROR', () => {
  //             expect(api.getPersonalNumber()).toEqual(undefined)
  //             done()
  //         })
  //     })

  //     // TODO: Possibly rewrite the mocking so we mock the responses more properly,
  //     // that way it would be possible to implement a throwIfNotOk wrapper for the
  //     // fetch calls.
  //     // it('throws error on external api error', async () => {
  //     //     const personalNumber = 'my personal number'
  //     //     try {
  //     //         await api.login(personalNumber)
  //     //     } catch (error: any) {
  //     //         expect(error.message).toEqual(expect.stringContaining('Server Error'))
  //     //     }
  //     // })
  // })
  // describe('#logout', () => {
  //     // it('clears session', async () => {
  //     //     await api.logout()
  //     //     const session = await api.getSession('')
  //     //     expect(session).toEqual({
  //     //         headers: {
  //     //             cookie: '',
  //     //         },
  //     //     })
  //     // })
  //     it('emits logout event', async () => {
  //         const listener = jest.fn()
  //         api.on('logout', listener)
  //         await api.logout()
  //         expect(listener).toHaveBeenCalled()
  //     })
  //     it('sets .isLoggedIn', async () => {
  //         api.isLoggedIn = true
  //         await api.logout()
  //         expect(api.isLoggedIn).toBe(false)
  //     })
  //     it('forgets personalNumber', async () => {
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         (api as any).personalNumber = 'my personal number'
  //         api.isLoggedIn = true

  //         await api.logout()

  //         expect(api.getPersonalNumber()).toEqual(undefined)
  //     })
  // })
  /*
    describe('fake', () => {
        it('sets fake mode for the correct pnr:s', async () => {
            let status

            status = await api.login('121212121212')
            expect(status.token).toEqual('fake')

            status = await api.login('201212121212')
            expect(status.token).toEqual('fake')

            status = await api.login('1212121212')
            expect(status.token).toEqual('fake')
        })
        it('delivers fake data', async (done) => {
            api.on('login', async () => {
                const user = await api.getUser()
                expect(user).toEqual({
                    firstName: 'Namn',
                    lastName: 'Namnsson',
                    isAuthenticated: true,
                    personalNumber: "195001182046",
                })

                const children = await api.getChildren()
                expect(children).toHaveLength(2)

                const calendar1 = await api.getCalendar(children[0])
                expect(calendar1).toHaveLength(20)
                const calendar2 = await api.getCalendar(children[1])
                expect(calendar2).toHaveLength(18)

                const skola24Children = await api.getSkola24Children()
                expect(skola24Children).toHaveLength(1)

                const timetable = await api.getTimetable(skola24Children[0], 2021, 15, 'sv')
                expect(timetable).toHaveLength(32)

                done()
            })
            await api.login('121212121212')
        })
    })*/
})
