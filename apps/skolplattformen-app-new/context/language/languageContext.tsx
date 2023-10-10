import React, {useState, useEffect, ReactNode} from 'react';
import * as RNLocalize from 'react-native-localize';
import {LoadingComponent} from '../../components/loading.component';

import {LanguageService} from '../../services/languageService';
import {translations} from '../../utils/translation';

import AppStorage from '../../services/appStorage';

interface LanguageContextProps {
  Strings: Record<string, any>;
  languageCode?: string;
}

export const LanguageContext = React.createContext<LanguageContextProps>({
  Strings: {},
  languageCode: '',
});

interface Props {
  children: ReactNode;
  data: any;
  initialLanguageCode?: string;
  cache: any;
}

export const LanguageProvider: React.FC<Props> = ({
  children,
  data,
  initialLanguageCode,
  cache,
}) => {
  const fallBack = {languageTag: 'sv', isRTL: false};

  LanguageService.setAllData({data});

  const [languageCode, setLanguageCode] = useState<string | undefined>(
    undefined,
  );

  const setLanguageConfig = (langCode: string) => {
    LanguageService.setLanguageCode({langCode: langCode});
    LanguageService.seti18nConfig({langCode: langCode});
    setLanguageCode(langCode);
  };

  const [Strings, setStrings] = useState(() => {
    if (initialLanguageCode && data[initialLanguageCode]) {
      setLanguageConfig(initialLanguageCode);

      return data[initialLanguageCode];
    }

    const {languageTag} =
      RNLocalize.findBestLanguageTag(Object.keys(translations)) || fallBack;

    const bestStrings = data[languageTag];

    return bestStrings;
  });

  useEffect(() => {
    LanguageService.onChange({key: 'LanguageProvider'}, (langCode: string) => {
      if (langCode && data[langCode]) {
        setLanguageCode(langCode);
        setStrings(data[langCode]);
        if (cache) {
          AppStorage.setSetting('langCode', langCode);
        }
      }
    });

    const checkLanguageLocal = async () => {
      // Saved language
      if (cache) {
        // Get cached lang
        const cachedLang = await AppStorage.getSetting<string>('langCode');

        // Try to find best suited language
        const {languageTag} =
          RNLocalize.findBestLanguageTag(Object.keys(translations)) || fallBack;

        const currentLanguageCode = cachedLang || languageTag;

        setLanguageConfig(currentLanguageCode);
      }
    };
    checkLanguageLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LanguageContext.Provider value={{Strings, languageCode: languageCode}}>
      {languageCode ? children : <LoadingComponent />}
    </LanguageContext.Provider>
  );
};
