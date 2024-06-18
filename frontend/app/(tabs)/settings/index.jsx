import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Header } from '../../components/header.jsx';
import { styles } from './settingsStyles.js';
import SettingsButton from '../../components/settingsButton.jsx';

//linear gradiant for the buttons

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
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={'Направи заявка'}
            ></SettingsButton>
            <SettingsButton
              style={styles.settingsButton}
              title={'Управление на имоти'}
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
            ></SettingsButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
