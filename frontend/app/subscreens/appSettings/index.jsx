import { View, Text, ScrollView, Switch, Alert, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./appSettingsStyles.js";
import { Header } from "../../globalComponents/header.jsx";

import "../../../src/i18n/i18n.config";
import { useTranslation } from "react-i18next";
import { NotificationContext } from "../../../src/context/NotificationsContext.js";
import SettingsButton from "../../globalComponents/settingsButton.jsx";
import axios from "axios";

const appSettings = () => {
  const { t, i18n } = useTranslation();

  const [isBiometricLoginTurnedOn, turnOnBiometricLogin] = useState(false);
  const [isPasswordLoginTurnedOn, turnOnPasswordLogin] = useState(false);

  const handleToggleBiometricLoginBtn = async () => {
    if (!isBiometricLoginTurnedOn) {
      turnOnBiometricLogin(true);
      turnOnPasswordLogin(false);
      console.log('Biometric Login Turned On');
    } else {
      turnOnBiometricLogin(false);
      console.log('Biometric Login Turned Off');
    }
  
    try { //endpoint change
      await axios.post('http://192.168.1.2:8000/profile/update-login-settings/', {
        biometricLogin: isBiometricLoginTurnedOn,
        passwordLogin: isPasswordLoginTurnedOn,
      });
    } catch (error) {
      console.error('Error updating login settings:', error);
    }
  };
  
  const handleTogglePasswordLoginBtn = async () => {
    if (!isPasswordLoginTurnedOn) {
      turnOnPasswordLogin(true);
      turnOnBiometricLogin(false);
      console.log('Password Login Turned On');
    } else {
      turnOnPasswordLogin(false);
      console.log('Password Login Turned Off');
    }
  
    try { //endpoint change
      await axios.post('http://192.168.1.2:8000/profile/update-login-settings/', {
        biometricLogin: isBiometricLoginTurnedOn,
        passwordLogin: isPasswordLoginTurnedOn,
      });
    } catch (error) {
      console.error('Error updating login settings:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false} />
        <View style={styles.content}>
          <Text style={styles.title}>{t("settingsApp")}</Text>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>
              {t("appSettingsBiometricDataLogin")}
            </Text>
            <Switch
              value={isBiometricLoginTurnedOn}
              onValueChange={handleToggleBiometricLoginBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>
              {t("appSettingsPasswordLogin")}
            </Text>
            <Switch
              value={isPasswordLoginTurnedOn}
              onValueChange={handleTogglePasswordLoginBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <SettingsButton
            style={styles.settingsBtn}
            title={t("appSettingsChangePassword")}
            screen={"subscreens/changePassword"}
          ></SettingsButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default appSettings;
