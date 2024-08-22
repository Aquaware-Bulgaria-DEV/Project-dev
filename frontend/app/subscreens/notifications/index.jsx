import React, { useContext } from "react";
import { View, Text, ScrollView, Switch, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./notificationsStyles.js";
import { Header } from "../../globalComponents/header.jsx";
import "../../../src/i18n/i18n.config";
import { useTranslation } from "react-i18next";
import { NotificationContext } from "../../../src/context/NotificationsContext.js";

const Notifications = () => {
  const { t } = useTranslation();
  const {
    pushNotifications,
    togglePushNotifications,
    expoPushToken,
    isEmailNotificationsTurnedOn,
    toggleEmailNotifications,
    isScheduledDailyTurnedOn,
    toggleScheduledDailyNotifications,
    isScheduledWeeklyTurnedOn,
    toggleScheduledWeeklyNotifications,
    isScheduledMonthlyTurnedOn,
    toggleScheduledMonthlyNotifications
  } = useContext(NotificationContext);

  const handleTogglePushNotificationsBtn = async () => {
    console.log('Push notifications');

    await togglePushNotifications();
    if (!pushNotifications && expoPushToken) {
      Alert.alert('Push Notifications', `Your push notification token is: ${expoPushToken}`);
    }
  };

  const handleToggleEmailNotificationsBtn = async () => {
    console.log('Email notifications');
    
    await toggleEmailNotifications();
  };

  const handleToggleScheduledDailyBtn = async () => {
    console.log('Daily notifications');

    await toggleScheduledDailyNotifications();
  };

  const handleToggleScheduledWeeklyBtn = async () => {
    console.log('Weekly notifications');

    await toggleScheduledWeeklyNotifications();
  };

  const handleToggleScheduledMonthlyBtn = async () => {
    console.log('Monthly notifications');

    await toggleScheduledMonthlyNotifications();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("settingsNotifications")}</Text>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsPushNotifications")}</Text>
            <Switch
              value={pushNotifications}
              onValueChange={handleTogglePushNotificationsBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsEmailNotifications")}</Text>
            <Switch
              value={isEmailNotificationsTurnedOn}
              onValueChange={handleToggleEmailNotificationsBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsScheduledDaily")}</Text>
            <Switch
              value={isScheduledDailyTurnedOn}
              onValueChange={handleToggleScheduledDailyBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsScheduledWeekly")}</Text>
            <Switch
              value={isScheduledWeeklyTurnedOn}
              onValueChange={handleToggleScheduledWeeklyBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsScheduledMonthly")}</Text>
            <Switch
              value={isScheduledMonthlyTurnedOn}
              onValueChange={handleToggleScheduledMonthlyBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
