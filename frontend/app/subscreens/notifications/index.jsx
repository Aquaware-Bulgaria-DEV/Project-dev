import {
  View,
  Text,
  ScrollView,
  Switch,
  Alert,
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
  const { pushNotifications, togglePushNotifications, expoPushToken } = useContext(NotificationContext);
  
  const [isPushNotificationsTurnedOn, turnOnNotifications] = useState(pushNotifications);
  const [isEmailNotificationsTurnedOn, setEmailNotificationsTurnedOn] = useState(false);
  const [isScheduledDailyTurnedOn, setScheduledDailyTurnedOn] = useState(false);
  const [isScheduledWeeklyTurnedOn, setScheduledWeeklyTurnedOn] = useState(false);
  const [isScheduledMonthlyTurnedOn, setScheduledMonthlyTurnedOn] = useState(false);

  const handleTogglePushNotificationsBtn = () => {
    togglePushNotifications();
    turnOnNotifications(prevState => !prevState);
    if (!isPushNotificationsTurnedOn) {
      Alert.alert('Push Notifications', `Your push notification token is: ${expoPushToken}`);
    }
  };

  const handleToggleEmailNotificationsBtn = () => {
    setEmailNotificationsTurnedOn(prevState => !prevState);

    // if (!isEmailNotificationsTurnedOn) {
    //   sendEmailNotification();
    // }
  };

  //! Email notifications - set it after getting the API from BE for sending email
  // const sendEmailNotification = async () => {
  //   try {
  //     const response = await axios.post('http://your-backend-url/send-email', {
  //       email: 'user-email@example.com', // Replace with the user's email
  //       subject: 'Email Notification',
  //       message: 'This is a test email notification.',
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleToggleScheduledDailyBtn = () => {
    setScheduledDailyTurnedOn(prevState => !prevState);
  };

  const handleToggleScheduledWeeklyBtn = () => {
    setScheduledWeeklyTurnedOn(prevState => !prevState);
  };

  const handleToggleScheduledMonthlyBtn = () => {
    setScheduledMonthlyTurnedOn(prevState => !prevState);
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

export default notifications;
