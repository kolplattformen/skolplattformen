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
  `ASP.NET_SessionId=lz1qwbtisns0jyahatz1nq3g; BIGipServer~INFOMENTOR~INFOMENTOR-SE-HTTPS-POOL=rd1o00000000000000000000ffffd5b44c05o443; TS0116cbba=01b55c859edebb78a865a27e1fea8319aba05564cb0dac6eab482f8802cb5c5e218600407b70e42b978edda88ac8b35c880de68dc4; IMHome=0102C76F5685390BDF08FEC75FD91B3F0BDF080107330030003000340030003300390000012F00FF6254310B9BA35AC58DE49DD2568F651041B37ECFB2A7F45C261AD4D789942F64`

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
