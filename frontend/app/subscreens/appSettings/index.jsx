import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Switch, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as LocalAuthentication from 'expo-local-authentication';
import { styles } from "./appSettingsStyles.js";
import { Header } from "../../globalComponents/header.jsx";
import { useTranslation } from "react-i18next";
import SettingsButton from "../../globalComponents/settingsButton.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appSettings = () => {
  const { t } = useTranslation();
  const [isBiometricLoginTurnedOn, setBiometricLogin] = useState(false);
  const [isPasswordLoginTurnedOn, setPasswordLogin] = useState(false);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const biometricLogin = await AsyncStorage.getItem('biometricLogin');
        const passwordLogin = await AsyncStorage.getItem('passwordLogin');

        if (biometricLogin !== null) {
          setBiometricLogin(JSON.parse(biometricLogin));
        }
        if (passwordLogin !== null) {
          setPasswordLogin(JSON.parse(passwordLogin));
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
      await AsyncStorage.setItem('passwordLogin', JSON.stringify(passwordLogin));
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
          setPasswordLogin(true); // Turn on password login if biometrics are turned off
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
        savePreferences(!isBiometricLoginTurnedOn, isPasswordLoginTurnedOn);
      } else {
        Alert.alert("Biometrics not supported", "This device does not support biometric authentication.");
      }
    } catch (error) {
      console.error("Error checking biometric availability:", error);
      Alert.alert("Error", "An error occurred while checking biometric availability.");
    }
  };

  const handleTogglePasswordLoginBtn = async () => {
    if (!isPasswordLoginTurnedOn) {
      // Turning on password login and disabling biometric login
      setPasswordLogin(true);
      setBiometricLogin(false);
      console.log("Password Login Turned On");
    } else {
      // Turning off password login (but leaving biometric login unchanged)
      setPasswordLogin(false);
      console.log("Password Login Turned Off");
    }
    // Save the updated preferences
    savePreferences(false, !isPasswordLoginTurnedOn);
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
