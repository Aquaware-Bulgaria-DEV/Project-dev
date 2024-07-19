import {
  View,
  Text,
  ScrollView,
  Switch,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./notificationsStyles.js";
import { Header } from "../../globalComponents/header.jsx";

import "../../../src/i18n/i18n.config";
import { useTranslation } from "react-i18next";
import { NotificationContext } from "../../../src/context/NotificationsContext.js";


const notifications = () => {
  const { t, i18n } = useTranslation();
  const { pushNotifications, togglePushNotifications } = useContext(NotificationContext);
  const [isPushNotificationsTurnedOn, turnOnNotifications] = useState(pushNotifications !== true);

  const handleTogglePushNotificationsBtn = () => {
    togglePushNotifications();
    turnOnNotifications(prevState => !prevState);
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
          <Text style={styles.title}>{t("settingsNotifications")}</Text>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsPushNotifications")}</Text>
            <Switch
              value={isPushNotificationsTurnedOn}
              onValueChange={handleTogglePushNotificationsBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsEmailNotifications")}</Text>
            <Switch
              value={isPushNotificationsTurnedOn}
              onValueChange={handleTogglePushNotificationsBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsScheduledDaily")}</Text>
            <Switch
              value={isPushNotificationsTurnedOn}
              onValueChange={handleTogglePushNotificationsBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsScheduledWeekly")}</Text>
            <Switch
              value={isPushNotificationsTurnedOn}
              onValueChange={handleTogglePushNotificationsBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>{t("notificationsScheduledMonthly")}</Text>
            <Switch
              value={isPushNotificationsTurnedOn}
              onValueChange={handleTogglePushNotificationsBtn}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default notifications;
