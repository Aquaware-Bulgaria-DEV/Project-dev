import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LanguageContext from '../../src/context/LanguageContext';
import { styles } from './LanguageToggleButtonStyles'; // Define styles in a separate file

const LanguageToggleButton = () => {
  const { toggleLanguage, language } = useContext(LanguageContext);
  console.log(language);
  

  return (
    <TouchableOpacity onPress={toggleLanguage}>
      <Text style={styles.linkBold}>
        {language === 'bg' ? 'English' : 'Български'}
      </Text>
    </TouchableOpacity>
  );
};

export default LanguageToggleButton;