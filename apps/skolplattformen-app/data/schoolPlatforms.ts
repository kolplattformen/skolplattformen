import CookieManager from '@react-native-cookies/cookies'
import initSkolplattformen, {
  features as featuresSkolPlattformen,
} from '@skolplattformen/api-skolplattformen'
import initInfomentor, {
  features as featuresInfomentor,
} from '@skolplattformen/api-infomentor'

// TEMP DEV-session (QR-verifierad hub-session) - byt mot riktig
// SAML/BankID-login när sessionsemantiken är löst
const INFOMENTOR_DEV_SESSION =
  'ASP.NET_SessionId=bf2aqgia0n2m0betmdbar0lg; BIGipServer~INFOMENTOR~INFOMENTOR-SE-HTTPS-POOL=rd1o00000000000000000000ffffd5b44c15o443; TS0116cbba=01b55c859e735fcd4109427d050f2d12dec5175915d48c8d67acb71efe16e2abe9e2ce97d236148873e8a923a721890763e9248ef8; IMHome=01029D617D6FEF09DF08FE9D510006F509DF080107330030003000340030003300390000012F00FFC2FD83AB4CEF14F340CF7F5361D8F66BD3BF405606E499861B307929CFD1C173'

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
