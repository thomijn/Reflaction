import React, {useState, useEffect, useContext} from 'react';
import en from '../lang/en.json';
import nl from '../lang/nl.json';
import * as RNLocalize from 'react-native-localize';

const LanguageContext = React.createContext;

const languageObj = {
  en: en,
  nl: nl,
};

export const LanguageContextProvider = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const currentLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys(languageObj),
    );

    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);

  const value = {
    ...languageObj[selectedLanguage],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
