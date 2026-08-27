import CookieManager from '@react-native-cookies/cookies'
import initSkolplattformen, {
  features as featuresSkolPlattformen,
} from '@skolplattformen/api-skolplattformen'
import initInfomentor, {
  features as featuresInfomentor,
} from '@skolplattformen/api-infomentor'

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
    api: initInfomentor(fetch as any, CookieManager, undefined, 'stockholm_par'),
    features: featuresInfomentor,
  },
]
