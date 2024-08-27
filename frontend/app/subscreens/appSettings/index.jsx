import React, { useState } from "react";
import { View, Text, ScrollView, Switch, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as LocalAuthentication from 'expo-local-authentication';
import { styles } from "./appSettingsStyles.js";
import { Header } from "../../globalComponents/header.jsx";
import { useTranslation } from "react-i18next";
import SettingsButton from "../../globalComponents/settingsButton.jsx";
import axios from "axios";

const appSettings = () => {
  const { t } = useTranslation();
  const [isBiometricLoginTurnedOn, setBiometricLogin] = useState(false);
  const [isPasswordLoginTurnedOn, setPasswordLogin] = useState(false);

  const updateLoginSettings = async (biometricLogin, passwordLogin) => {
    try { //! Create API
      await axios.post('http://192.168.1.2:8000/profile/update-login-settings/', {
        biometricLogin,
        passwordLogin,
      });
      console.log("Settings updated successfully.");
    } catch (error) {
      console.error("Error updating login settings:", error);
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
            fallbackLabel: 'Use Password',
          });

          if (authResult.success) {
            setBiometricLogin(true);
            setPasswordLogin(false);
            console.log("Biometric authentication enabled");
          } else {
            Alert.alert("Authentication failed", "Please try again.");
          }
        }
        //! Make the API request with the updated state
        updateLoginSettings(!isBiometricLoginTurnedOn, isPasswordLoginTurnedOn);
      } else {
        Alert.alert("Biometrics not supported", "This device does not support biometric authentication.");
      }
    } catch (error) {
      console.error("Error checking biometric availability:", error);
      Alert.alert("Error", "An error occurred while checking biometric availability.");
    }
  };

  const handleTogglePasswordLoginBtn = async () => {
    setPasswordLogin(!isPasswordLoginTurnedOn);
    setBiometricLogin(false);
    console.log(`Password Login Turned ${!isPasswordLoginTurnedOn ? "On" : "Off"}`);

    //! Make the API request with the updated state
    updateLoginSettings(isBiometricLoginTurnedOn, !isPasswordLoginTurnedOn);
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("appSettingsPasswordLogin")}</Text>
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
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default appSettings;
