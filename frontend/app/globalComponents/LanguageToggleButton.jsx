import React, { useContext } from 'react';
import { Button } from 'react-native';
import LanguageContext from '../../src/context/LanguageContext';


const LanguageToggleButton = () => {
  const { toggleLanguage, language } = useContext(LanguageContext);

  return (
    <Button
      title={language === 'bg' ? 'Switch to English' : 'Превключи на български'}
      onPress={toggleLanguage}
      color="#388FED"
    />
  );
};

export default LanguageToggleButton;
