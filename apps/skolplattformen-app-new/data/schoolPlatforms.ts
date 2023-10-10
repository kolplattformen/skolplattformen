import CookieManager from '@react-native-cookies/cookies';
import initHjarntorget, {
  features as featuresHjarntorget,
} from '../libs/api-hjarntorget/lib/';
import initSkolplattformen, {
  features as featuresSkolPlattformen,
} from '../libs/api-skolplattformen/lib/';

export const schoolPlatforms = [
  {
    id: 'stockholm-skolplattformen',
    displayName: 'Stockholms stad (Skolplattformen)',
    api: initSkolplattformen(fetch as any, CookieManager),
    features: featuresSkolPlattformen,
  },
  {
    id: 'goteborg-hjarntorget',
    displayName: 'Göteborgs Stad (Hjärntorget)',
    api: initHjarntorget(fetch as any, CookieManager),
    features: featuresHjarntorget,
  },
];
