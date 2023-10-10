import {useEffect, useRef, useState} from 'react';
import {LanguageService} from '../services/languageService';

const generateKey = () => {
  return `${Date.now()}-${Math.random() * 1000}`;
};

export const useLangCode = () => {
  const [langCode, setLangCode] = useState(LanguageService.getLanguageCode());

  const key = useRef(generateKey());

  useEffect(() => {
    const unsubscribe = LanguageService.onChange({key: key.current}, lang => {
      setLangCode(lang);
    });

    return () => unsubscribe();
  }, []);

  return langCode;
};
