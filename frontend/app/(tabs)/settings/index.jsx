import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Header } from '../../globalComponents/header.jsx';
import { styles } from './settingsStyles.js';
import SettingsButton from '../../globalComponents/settingsButton.jsx';

import '../../../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t, i18n } = useTranslation();

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
              screen={'subscreens/notifications'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={t('settingsApp')}
              screen={'subscreens/appSettings'}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
