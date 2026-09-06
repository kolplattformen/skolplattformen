import { EventEmitter } from 'events'
import { LoginStatusChecker } from '@skolplattformen/api'

/**
 * Nop-checker för flöden utan riktig BankID-poll.
 * Speglar motsvarigheten i api-infomentor. Eventuell status emittas av
 * källaren (t.ex. ApiSchoolsoft.login) med en ticks fördröjning så att
 * appens lyssnare hinner registreras.
 */
export class DummyStatusChecker
  extends EventEmitter
  implements LoginStatusChecker
{
  token = ''

  async cancel(): Promise<void> {
    // do nothing
  }
}
