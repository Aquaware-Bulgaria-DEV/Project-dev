import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { styles } from "./notificationsStyles.js";
import { Header } from "../../globalComponents/header.jsx";
import { useTranslation } from "react-i18next";
import { NotificationContext } from "../../../src/context/NotificationsContext.js";
import RNPickerSelect from "react-native-picker-select";
import AuthContext from "../../Context/AuthContext.jsx";

const Notifications = () => {
  const { t } = useTranslation();
  const {
    isPushNotificationsTurnedOn,
    togglePushNotifications,
    expoPushToken,
    isEmailNotificationsTurnedOn,
    toggleEmailNotifications,
    toggleScheduledDailyNotifications,
    toggleScheduledWeeklyNotifications,
    toggleScheduledMonthlyNotifications,
    notificationFrequency, 
    setNotificationFrequency,
    updateNotificationSettings, // Destructure this for final API call
  } = useContext(NotificationContext);
  const { preferences } = React.useContext(AuthContext);

  const [loading, setLoading] = useState(false); // Added a loading state to handle multiple clicks

  const handleTogglePushNotificationsBtn = async () => {
    if (loading) return; // Prevent duplicate calls during loading

    setLoading(true);
    await togglePushNotifications(t);
    setLoading(false);

    if (!isPushNotificationsTurnedOn && expoPushToken) {
      Alert.alert(
        "Push Notifications",
        `Your push notification token is: ${expoPushToken}`
      );
    }
  };

  const handleFrequencyChange = async (value) => {
    if (loading) return; // Prevent duplicate changes while loading
    setLoading(true);

    setNotificationFrequency(value);

    // Reset all other frequencies and toggle the selected one
    const newSettings = {
      daily: value === "daily",
      weekly: value === "weekly",
      monthly: value === "monthly",
      push: isPushNotificationsTurnedOn,
      email_notification: isEmailNotificationsTurnedOn,
      language: preferences.language,
    };

    // Update the settings after changing frequency
    await updateNotificationSettings(newSettings);
    
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

    setLoading(false);
  };

  const frequencyOptions = [
    { id: '1', label: t("notificationsScheduledDaily"), value: 'daily' },
    { id: '2', label: t("notificationsScheduledWeekly"), value: 'weekly' },
    { id: '3', label: t("notificationsScheduledMonthly"), value: 'monthly' }
  ];

  return (
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

          {/* <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>
              {t("notificationsEmailNotifications")}
            </Text>
            <Switch
              value={isEmailNotificationsTurnedOn}
              onValueChange={toggleEmailNotifications}
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View> */}

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
  );
};

export default Notifications;
