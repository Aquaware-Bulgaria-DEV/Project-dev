import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../app/Context/AuthContext';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const { preferences, savePreferences } = useContext(AuthContext);
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    if (preferences && preferences.language && preferences.language !== language) {
      setLanguage(preferences.language);
      i18n.changeLanguage(preferences.language);
    }
  }, [preferences, i18n, language]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = async () => {
    const newLanguage = language === 'bg' ? 'en' : 'bg';
    setLanguage(newLanguage);

    // Update user's language preference in the context and local storage
    const newPreferences = { ...preferences, language: newLanguage };
    await savePreferences(newPreferences);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;