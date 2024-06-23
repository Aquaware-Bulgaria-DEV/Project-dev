import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Header } from '../../globalComponents/header.jsx';
import { styles } from './settingsStyles.js';
import SettingsButton from '../../globalComponents/settingsButton.jsx';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.content}>
          <Text style={styles.title}>Настройки</Text>
          <View>
            <SettingsButton
              style={styles.settingsButton}
              title={'Личен профил'}
              screen={'subscreens/myProfile'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={'Направи заявка'}
              screen={'troubleshoot'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={'Управление на имоти'}
              screen={'subscreens/myProperties'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={'Нотификации'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={'Настройки на приложението'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={'Език'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={'Самоотчет'}
              screen={'subscreens/selfReport'}
            ></SettingsButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
