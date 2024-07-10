import React, { useContext } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Header } from '../../globalComponents/header.jsx';
import { styles } from './settingsStyles.js';
import SettingsButton from '../../globalComponents/settingsButton.jsx';

import '../../../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';
import LanguageContext from '../../../src/context/LanguageContext.js';

const Settings = () => {
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
        <View style={styles.content}>
          <Text style={styles.title}>{t('settings')}</Text>
          <View>
            <SettingsButton
              style={styles.settingsButton}
              title={t('settingsPersonalInfo')}
              screen={'subscreens/myProfile'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={t('settingsMakeARequest')}
              screen={'troubleshoot'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={t('settingsPropertiesManagement')}
              screen={'subscreens/myProperties'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={t('settingsNotifications')}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={t('settingsApp')}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={t('settingsLanguage')}
              screen={'subscreens/languagePreferences'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={t('settingsSelfReport')}
              screen={'subscreens/selfReport'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={t('settingsLogout')}
              screen={'signOut'}
            ></SettingsButton>
          </View>
        </View>
        {/* Change language button - for removal after successful translation implementation */}
        <TouchableOpacity onPress={toggleLanguage}>
          <Text>{t('changeLanguage')}</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
};

export default Settings;
