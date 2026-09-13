import CookieManager from '@react-native-cookies/cookies'
import initSchoolsoft, {
  features as featuresSchoolsoft,
} from '@skolplattformen/api-schoolsoft'
import initSkolplattformen, {
  features as featuresSkolPlattformen,
} from '@skolplattformen/api-skolplattformen'

export const schoolPlatforms = [
  {
    id: 'stockholm-skolplattformen',
    displayName: 'Stockholms stad (Skolplattformen)',
    api: initSkolplattformen(fetch as any, CookieManager),
    features: featuresSkolPlattformen,
  },
  {
    id: 'schoolsoft-procivitas',
    displayName: 'Schoolsoft – ProCivitas (beta)',
    api: initSchoolsoft(fetch as any, CookieManager),
    features: featuresSchoolsoft,
  },
]
