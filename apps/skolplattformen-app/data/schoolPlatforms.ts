import CookieManager from '@react-native-cookies/cookies'
import initSkolplattformen, {
  features as featuresSkolPlattformen,
} from '@skolplattformen/api-skolplattformen'
import initInfomentor, {
  features as featuresInfomentor,
} from '@skolplattformen/api-infomentor'

// TEMP DEV-session (harness-verifierad hub-session) - byt mot riktig
// SAML/BankID-login när sessionsemantiken är löst
const INFOMENTOR_DEV_SESSION =
  'ASP.NET_SessionId=01xvglfnrmrr53izcc1wyqwg; BIGipServer~INFOMENTOR~INFOMENTOR-SE-HTTPS-POOL=rd1o00000000000000000000ffffd5b44c05o443; TS0116cbba=01b55c859ee317f9f308d39812c2dca8517e11b4cf300ba22ff2df20a8014ea3f9cff47627a3ee1b649989c68b623e333b6968de4b'

export const schoolPlatforms = [
  {
    id: 'stockholm-skolplattformen',
    displayName: 'Stockholms stad (Skolplattformen)',
    api: initSkolplattformen(fetch as any, CookieManager),
    features: featuresSkolPlattformen,
  },
  {
    id: 'infomentor',
    displayName: 'Infomentor',
    api: initInfomentor(
      fetch as any,
      CookieManager,
      undefined,
      'stockholm_par',
      INFOMENTOR_DEV_SESSION
    ),
    features: featuresInfomentor,
  },
]
