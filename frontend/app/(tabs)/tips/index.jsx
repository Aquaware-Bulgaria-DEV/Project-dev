import React, { useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Header } from '../../globalComponents/header.jsx';
import { styles } from './tipsStyles.js';

import HANDS_PIC from '../../../assets/hands.jpeg';
import { List } from './subcomponents/list.jsx';

import '../../../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';
import LanguageContext, { LanguageProvider } from '../../../src/context/LanguageContext.js';

const Tips = () => {

  const { t, i18n } = useTranslation();
  const { language, toggleLanguage } = useContext(LanguageContext);

  // const changeLanguage = () => {
  //   if (i18n.language === 'bg') {
  //     i18n.changeLanguage('en');
  //   } else {
  //     i18n.changeLanguage('bg');
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <Text style={styles.title}>{t('generalTips')}</Text>

        <Image style={styles.headerPic} source={HANDS_PIC}></Image>

        {/* Change language button - for removal after successful translation implementation */}
        <TouchableOpacity onPress={toggleLanguage}>
        <Text>{t('changeLanguage')}</Text>
      </TouchableOpacity>

        <List />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tips;
