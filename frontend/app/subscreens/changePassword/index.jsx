import { View, Text, ScrollView, Switch, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./changePasswordStyles.js";
import { Header } from "../../globalComponents/header.jsx";

import "../../../src/i18n/i18n.config";
import { useTranslation } from "react-i18next";
import { NotificationContext } from "../../../src/context/NotificationsContext.js";
import SettingsButton from "../../globalComponents/settingsButton.jsx";

const changePassword = () => {
  const { t, i18n } = useTranslation();
  const { pushNotifications, togglePushNotifications, expoPushToken } =
    useContext(NotificationContext);

  const [isPushNotificationsTurnedOn, turnOnNotifications] =
    useState(pushNotifications);
  const [isEmailNotificationsTurnedOn, setEmailNotificationsTurnedOn] =
    useState(false);
  const [isScheduledDailyTurnedOn, setScheduledDailyTurnedOn] = useState(false);

  const handleTogglePushNotificationsBtn = () => {
    togglePushNotifications();
    turnOnNotifications((prevState) => !prevState);
  };

  const handleToggleEmailNotificationsBtn = () => {
    setEmailNotificationsTurnedOn((prevState) => !prevState);
  };

  const handleToggleScheduledDailyBtn = () => {
    setScheduledDailyTurnedOn((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("settingsApp")}</Text>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>
              {t("appSettingsBiometricDataLogin")}
            </Text>
            <Switch
              value={isPushNotificationsTurnedOn}
              onValueChange={handleTogglePushNotificationsBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>
              {t("appSettingsPasswordLogin")}
            </Text>
            <Switch
              value={isEmailNotificationsTurnedOn}
              onValueChange={handleToggleEmailNotificationsBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default changePassword;
