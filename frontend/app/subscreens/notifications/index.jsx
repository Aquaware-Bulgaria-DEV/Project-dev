import React, { useContext } from "react";
import { View, Text, ScrollView, Switch, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./notificationsStyles.js";
import { Header } from "../../globalComponents/header.jsx";
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
    await togglePushNotifications();
    if (!pushNotifications && expoPushToken) {
      Alert.alert('Push Notifications', `Your push notification token is: ${expoPushToken}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
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
              onValueChange={toggleEmailNotifications}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>

          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsScheduledDaily")}</Text>
            <Switch
              value={isScheduledDailyTurnedOn}
              onValueChange={toggleScheduledDailyNotifications}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>

          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsScheduledWeekly")}</Text>
            <Switch
              value={isScheduledWeeklyTurnedOn}
              onValueChange={toggleScheduledWeeklyNotifications}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>

          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsScheduledMonthly")}</Text>
            <Switch
              value={isScheduledMonthlyTurnedOn}
              onValueChange={toggleScheduledMonthlyNotifications}
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
