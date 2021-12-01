import CookieManager from '@react-native-cookies/cookies'
import initHjarntorget, {
  features as featuresHjarntorget,
} from '@skolplattformen/api-hjarntorget'
import initSkolplattformen, {
  features as featuresSkolPlattformen,
} from '@skolplattformen/api-skolplattformen'

export const schoolPlatforms = [
  {
    id: 'stockholm-skolplattformen',
    displayName: 'Stockholm stad (Skolplattformen)',
    api: initSkolplattformen(fetch, CookieManager),
    features: featuresSkolPlattformen,
  },
  {
    id: 'goteborg-hjarntorget',
    displayName: 'Göteborg stad (Hjärntorget)',
    api: initHjarntorget(fetch, CookieManager),
    features: featuresHjarntorget,
  },
]
