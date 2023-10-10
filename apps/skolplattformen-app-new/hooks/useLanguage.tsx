import {useContext} from 'react';
import {LanguageContext} from '../context/language/languageContext';
import {LanguageService} from '../services/languageService';

export const useLanguage = () => {
  const {Strings} = useContext(LanguageContext);

  const setLanguageCode = ({languageCode}: {languageCode: string}) => {
    LanguageService.setLanguageCode({langCode: languageCode});
    LanguageService.seti18nConfig({langCode: languageCode});
  };

  return {Strings, setLanguageCode};
};
