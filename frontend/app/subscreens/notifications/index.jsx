import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Switch,
  SafeAreaView,
} from "react-native";
import { styles } from "./notificationsStyles.js";
import { Header } from "../../globalComponents/header.jsx";
import { useTranslation } from "react-i18next";
import { NotificationContext } from "../../../src/context/NotificationsContext.js";
import RNPickerSelect from "react-native-picker-select";

const Notifications = () => {
  const { t } = useTranslation();
  const {
    isPushNotificationsTurnedOn,
    togglePushNotifications,
    expoPushToken,
    isEmailNotificationsTurnedOn,
    toggleEmailNotifications,
    isScheduledDailyTurnedOn,
    toggleScheduledDailyNotifications,
    isScheduledWeeklyTurnedOn,
    toggleScheduledWeeklyNotifications,
    isScheduledMonthlyTurnedOn,
    toggleScheduledMonthlyNotifications,
  } = useContext(NotificationContext);

  const [notificationFrequency, setNotificationFrequency] = useState(null);

  const handleTogglePushNotificationsBtn = async () => {
    await togglePushNotifications();
    if (!isPushNotificationsTurnedOn && expoPushToken) {
      Alert.alert(
        "Push Notifications",
        `Your push notification token is: ${expoPushToken}`
      );
    }
  };

  const handleFrequencyChange = (value) => {
    setNotificationFrequency(value);

    switch (value) {
      case "daily":
        toggleScheduledDailyNotifications();
        break;
      case "weekly":
        toggleScheduledWeeklyNotifications();
        break;
      case "monthly":
        toggleScheduledMonthlyNotifications();
        break;
      default:
        break;
    }
  };

  // Dropdown options
  const frequencyOptions = [
    { id: '1', label: t("notificationsScheduledDaily"), value: 'daily' },
    { id: '2', label: t("notificationsScheduledWeekly"), value: 'weekly' },
    { id: '3', label: t("notificationsScheduledMonthly"), value: 'monthly' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("settingsNotifications")}</Text>

          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>
              {t("notificationsPushNotifications")}
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
              {t("notificationsEmailNotifications")}
            </Text>
            <Switch
              value={isEmailNotificationsTurnedOn}
              onValueChange={toggleEmailNotifications}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>

          <Text style={styles.text}>
            {t("notificationsScheduleFrequency")}
          </Text>
          <View>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={handleFrequencyChange}
                items={frequencyOptions}
                value={notificationFrequency}
                style={{
                  inputIOS: styles.pickerItem,
                  inputAndroid: styles.pickerItem,
                }}
                placeholder={{
                  label: `${t("notificationsSelectFrequency")}`,
                  value: null,
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
