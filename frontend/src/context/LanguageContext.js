import React, { createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'bg' ? 'en' : 'bg'));
  };

  const getLanguage = () => {
    return language;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, getLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;