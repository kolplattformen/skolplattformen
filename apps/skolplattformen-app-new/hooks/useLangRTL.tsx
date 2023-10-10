import {isRTL} from '../services/languageService';
import {useLangCode} from './useLangCode';

export const useLangRTL = () => {
  const langCode = useLangCode();
  return isRTL(langCode);
};
