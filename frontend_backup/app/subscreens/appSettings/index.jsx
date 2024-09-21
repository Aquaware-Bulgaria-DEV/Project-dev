import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Switch, Alert } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { styles } from "./appSettingsStyles.js";
import { Header } from "../../globalComponents/header.jsx";
import { useTranslation } from "react-i18next";
import SettingsButton from "../../globalComponents/settingsButton.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appSettings = () => {
  const { t } = useTranslation();
  const [isBiometricLoginTurnedOn, setBiometricLogin] = useState(false);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const biometricLogin = await AsyncStorage.getItem('biometricLogin');

        if (biometricLogin !== null) {
          setBiometricLogin(JSON.parse(biometricLogin));
        }

      } catch (error) {
        console.error("Error loading login preferences:", error);
      }
    };

    loadPreferences();
  }, []);

  const savePreferences = async (biometricLogin, passwordLogin) => {
    try {
      await AsyncStorage.setItem('biometricLogin', JSON.stringify(biometricLogin));
    } catch (error) {
      console.error("Error saving login preferences:", error);
    }
  };

  const handleToggleBiometricLoginBtn = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        if (isBiometricLoginTurnedOn) {
          setBiometricLogin(false);
          console.log("Biometric Login Turned Off");
        } else {
          const authResult = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate',
            fallbackLabel: 'Use Password'
          });
          console.log('Authentication Result:', authResult);

          if (authResult.success) {
            setBiometricLogin(true);
            console.log("Biometric authentication enabled");
          } else {
            Alert.alert("Authentication failed", "Please try again.");
          }
        }
        savePreferences(!isBiometricLoginTurnedOn);
      } else {
        Alert.alert("Biometrics not supported", "This device does not support biometric authentication.");
      }
    } catch (error) {
      console.error("Error checking biometric availability:", error);
      Alert.alert("Error", "An error occurred while checking biometric availability.");
    }
  };

  return (
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false} />
        <View style={styles.content}>
          <Text style={styles.title}>{t("settingsApp")}</Text>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("appSettingsBiometricDataLogin")}</Text>
            <Switch
              value={isBiometricLoginTurnedOn}
              onValueChange={handleToggleBiometricLoginBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <SettingsButton
            style={styles.settingsBtn}
            title={t("appSettingsChangePassword")}
            screen={"subscreens/changePassword"}
          />
        </View>
      </ScrollView>
  );
};

export default appSettings;
