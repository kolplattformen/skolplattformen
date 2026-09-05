import CookieManager from '@react-native-cookies/cookies'
import initInfomentor, {
  features as featuresInfomentor,
} from '@skolplattformen/api-infomentor'

// DEV-session (valfri): sätt EXPO_PUBLIC_INFOMENTOR_DEV_SESSION i
// apps/skolplattformen-app/.env.local (gitignored) - t.ex. kopiera
// DEV-SESSION-raden som e2e-qr-server.ts skriver ut efter en lyckad
// QR-inloggning. Starta om Metro efter ändring. Utan variabel körs
// riktig BankID-login (QR-metoden).
const INFOMENTOR_DEV_SESSION =
  process.env.EXPO_PUBLIC_INFOMENTOR_DEV_SESSION || ''

export const schoolPlatforms = [
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
