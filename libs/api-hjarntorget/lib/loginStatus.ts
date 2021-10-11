import { EventEmitter } from 'events'
import { Fetcher } from '../../api/lib/fetcher'
import { LoginStatusChecker } from '../../api/lib/loginStatus'
import { 
    extractAuthGbgLoginRequestBody, 
    extractHjarntorgetSAMLLogin
} from './parse/parsers'

export class HjarntorgetChecker extends EventEmitter {

    private fetcher: Fetcher

    private basePollingUrl: string

    public token: string

    private cancelled: boolean = false

    constructor(fetcher: Fetcher, basePollingUrl: string) {
        super()
        this.token = '' // not used, but needed for compatability with the LoginStatusChecker 
        this.fetcher = fetcher
        this.basePollingUrl = basePollingUrl

        this.check()
    }

    async check(): Promise<void> {
        try {
            console.log("polling bankid signature")
            // https://mNN-mg-local.idp.funktionstjanster.se/mg-local/auth/ccp11/grp/pollstatus
            const pollStatusUrl = `${this.basePollingUrl}pollstatus`
            const pollStatusResponse = await this.fetcher('poll-status', pollStatusUrl)
            const pollStatusResponseJson = await pollStatusResponse.json()

            const keepPolling = pollStatusResponseJson.infotext !== ''
            const isError = pollStatusResponseJson.location.indexOf('error') >= 0
            if (!keepPolling && !isError) {
                console.log("bankid successfull! follow to location...")
                // follow response location to get back to auth.goteborg.se
                // r.location is something like:
                //  'https://mNN-mg-local.idp.funktionstjanster.se/mg-local/auth/ccp11/grp/signature'
                const signatureResponse = await this.fetcher('signature', pollStatusResponseJson.location, {
                    redirect: "follow"
                })
                const signatureResponseText = await signatureResponse.text()

                const authGbgLoginBody = extractAuthGbgLoginRequestBody(signatureResponseText)
                const authGbgLoginUrl = 'https://auth.goteborg.se/FIM/sps/BankID/saml20/login'
                console.log("authGbg saml login")
                const authGbgLoginResponse = await this.fetcher('samlLogin', authGbgLoginUrl, {
                    redirect: 'follow',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: authGbgLoginBody
                })
                const authGbgLoginResponseText = await authGbgLoginResponse.text()

                const hjarntorgetSAMLLogin = extractHjarntorgetSAMLLogin(authGbgLoginResponseText)
                const hjarntorgetSAMLLoginUrl = 'https://hjarntorget.goteborg.se/Shibboleth.sso/SAML2/POST'
                console.log("hjarntorget saml login")

                await this.fetcher('samlLogin', hjarntorgetSAMLLoginUrl, {
                    method: 'POST',
                    redirect: 'follow',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: hjarntorgetSAMLLogin,
                })

                // TODO: add some checks to see if everything is actually 'OK'...
                this.emit('OK')
            } else if (isError) {
                console.log("polling error")
                this.emit('ERROR')
            } else if (!this.cancelled && keepPolling) {
                console.log("keep on polling...")
                setTimeout(() => this.check(), 3000)
            }
        } catch (er) {
            console.log('Error validating login to Hjärntorget', er)
            this.emit('ERROR')
        }
    }

    async cancel(): Promise<void> {
        this.cancelled = true
    }
}

export const checkStatus = (fetch: Fetcher, basePollingUrl: string): LoginStatusChecker =>
  new HjarntorgetChecker(fetch, basePollingUrl)