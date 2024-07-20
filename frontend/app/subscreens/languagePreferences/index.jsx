import { View, Text, ScrollView, StyleSheet, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import {  styles  } from "./languagePreferencesStyles.js"
import SettingsButton from '../../globalComponents/settingsButton';
import { Header } from '../../globalComponents/header.jsx';

import '../../../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';
import LanguageContext from '../../../src/context/LanguageContext.js';

const languagePreferences = () => {
  const { t, i18n } = useTranslation();
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1, }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t('settingsLanguage')}</Text>
            <SettingsButton
              style={styles.settingsBtn}
              title={t('settingsChangeLanguageEN')}
              screen={'subscreens/languagePreferences'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsBtn}
              title={t('settingsChangeLanguageBG')}
              screen={'subscreens/languagePreferences'}
            ></SettingsButton>
          </View>
        {/* Change language button - for removal after successful translation implementation */}
        <TouchableOpacity onPress={toggleLanguage}>
          <Text>{t('changeLanguage')}</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
};

export default languagePreferences;
