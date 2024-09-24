import React, { createContext, useContext, useEffect, useState } from "react";
import {
  registerForPushNotificationsAsync,
  scheduleDailyNotification,
  scheduleWeeklyNotification,
  scheduleMonthlyNotification,
  cancelAllNotifications,
  sendEmailNotification,
} from "../../app/subscreens/notifications/notificationsHandler";
import AuthContext from "../../app/Context/AuthContext";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationFrequency, setNotificationFrequency] = useState(null);
  const { token, preferences, savePreferences } = useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [isPushNotificationsTurnedOn, setPushNotificationsTurnedOn] =
    useState(false);
  const [isEmailNotificationsTurnedOn, setEmailNotificationsTurnedOn] =
    useState(false);
  const [isScheduledDailyTurnedOn, setScheduledDailyTurnedOn] = useState(false);
  const [isScheduledWeeklyTurnedOn, setScheduledWeeklyTurnedOn] =
    useState(false);
  const [isScheduledMonthlyTurnedOn, setScheduledMonthlyTurnedOn] =
    useState(false);

  useEffect(() => {
    if (preferences) {
      console.log("Loaded preferences on login: ", preferences);
      setPushNotificationsTurnedOn(preferences.push || false);
      setEmailNotificationsTurnedOn(preferences.email_notification || false);
      setScheduledDailyTurnedOn(preferences.daily || false);
      setScheduledWeeklyTurnedOn(preferences.weekly || false);
      setScheduledMonthlyTurnedOn(preferences.monthly || false);

      // Update notification frequency based on user's saved preferences
      if (preferences.daily) {
        setNotificationFrequency("daily");
      } else if (preferences.weekly) {
        setNotificationFrequency("weekly");
      } else if (preferences.monthly) {
        setNotificationFrequency("monthly");
      } else {
        setNotificationFrequency(null); // No preference set
      }
    }

    // // Set default notification type if push notifications are enabled
    // if (preferences?.push) {
    //   setScheduledMonthlyTurnedOn(preferences.monthly || true);
    //   setScheduledDailyTurnedOn(false);
    //   setScheduledWeeklyTurnedOn(false);
    // }
  }, [preferences]);

  const updateNotificationSettings = async (newSettings) => {
    try {
      console.log("1. Request Payload on updating settings: ", newSettings);
      const response = await fetch(
        "http://ec2-18-234-44-48.compute-1.amazonaws.com/profile/details/",
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSettings),
        }
      );

      const responseData = await response.json();
      console.log("2. API response after updating settings: ", responseData);

      if (!response.ok) {
        console.error("Failed to update settings: ", responseData);
        throw new Error("Failed to update notification settings");
      }

      savePreferences(responseData);
      console.log("3. Updated preferences after API response: ", responseData);
      return true;
    } catch (error) {
      console.error("Error updating settings: ", error);
      return false;
    }
  };

  const togglePushNotifications = async (t) => {
    const newState = !isPushNotificationsTurnedOn;
    setPushNotificationsTurnedOn(newState);

    if (newState) {
      const token = await registerForPushNotificationsAsync(t);
      if (!token) {
        setPushNotificationsTurnedOn(false); // Revert the state if token is missing
        console.log("Push notification token is missing");
        return;
      } else {
        setExpoPushToken(token);
      }

      // Automatically enable monthly notifications
      setScheduledMonthlyTurnedOn(true);
      setScheduledDailyTurnedOn(false);
      setScheduledWeeklyTurnedOn(false);
      await scheduleMonthlyNotification();
    } else {
      setExpoPushToken("");
      setScheduledMonthlyTurnedOn(false);
      setScheduledDailyTurnedOn(false);
      setScheduledWeeklyTurnedOn(false);
      await cancelAllNotifications();
    }

    const success = await updateNotificationSettings({
      push: newState,
      email_notification: isEmailNotificationsTurnedOn,
      daily: isScheduledDailyTurnedOn,
      weekly: isScheduledWeeklyTurnedOn,
      monthly: isScheduledMonthlyTurnedOn,
      language: preferences.language,
    });

    if (!success) {
      setPushNotificationsTurnedOn(!newState); // Revert the state if server update fails
      console.log("Turning on push notifications NOT successful");
    }
  };

  const toggleEmailNotifications = async () => {
    const newState = !isEmailNotificationsTurnedOn;
    setEmailNotificationsTurnedOn(newState);

    if (newState) {
      await sendEmailNotification(token, preferences.email);
    }

    const success = await updateNotificationSettings({
      push: isPushNotificationsTurnedOn,
      email_notification: newState,
      daily: isScheduledDailyTurnedOn,
      weekly: isScheduledWeeklyTurnedOn,
      monthly: isScheduledMonthlyTurnedOn,
      language: preferences.language,
    });

    if (!success) {
      setEmailNotificationsTurnedOn(!newState); // Revert the state if server update fails
      console.log("Turning on email notifications NOT successful");
    }
  };

  const toggleScheduledDailyNotifications = async () => {
    const newState = !isScheduledDailyTurnedOn;

    // Batch state updates and handle conflicts
    setScheduledDailyTurnedOn(newState);
    setScheduledWeeklyTurnedOn(false);
    setScheduledMonthlyTurnedOn(false);

    // if (newState) {
    //   await scheduleDailyNotification();
    // } else {
    //   await cancelAllNotifications();  // Cancel notifications when toggled off
    // }

    const success = await updateNotificationSettings({
      push: isPushNotificationsTurnedOn,
      email_notification: isEmailNotificationsTurnedOn,
      daily: newState,
      weekly: false,
      monthly: false,
      language: preferences.language,
    });

    if (!success) {
      setScheduledDailyTurnedOn(!newState); // Revert state if update fails
      setScheduledWeeklyTurnedOn(false);
      setScheduledMonthlyTurnedOn(false);
      console.log("Turning on daily notifications NOT successful");
    }
  };

  const toggleScheduledWeeklyNotifications = async () => {
    const newState = !isScheduledWeeklyTurnedOn;

    setScheduledWeeklyTurnedOn(newState);
    setScheduledDailyTurnedOn(false);
    setScheduledMonthlyTurnedOn(false);

    // if (newState) {
    //   await scheduleWeeklyNotification();
    // } else {
    //   await cancelAllNotifications();
    // }

    const success = await updateNotificationSettings({
      push: isPushNotificationsTurnedOn,
      email_notification: isEmailNotificationsTurnedOn,
      daily: false,
      weekly: newState,
      monthly: false,
      language: preferences.language,
    });

    if (!success) {
      setScheduledWeeklyTurnedOn(!newState);
      setScheduledDailyTurnedOn(false);
      setScheduledMonthlyTurnedOn(false);
      console.log("Turning on weekly notifications NOT successful");
    }
  };

  const toggleScheduledMonthlyNotifications = async () => {
    const newState = !isScheduledMonthlyTurnedOn;

    setScheduledMonthlyTurnedOn(newState);
    setScheduledDailyTurnedOn(false);
    setScheduledWeeklyTurnedOn(false);

    // if (newState) {
    //   await scheduleMonthlyNotification();
    // } else {
    //   await cancelAllNotifications();
    // }

    const success = await updateNotificationSettings({
      push: isPushNotificationsTurnedOn,
      email_notification: isEmailNotificationsTurnedOn,
      daily: false,
      weekly: false,
      monthly: newState,
      language: preferences.language,
    });

    if (!success) {
      setScheduledMonthlyTurnedOn(!newState);
      setScheduledDailyTurnedOn(false);
      setScheduledWeeklyTurnedOn(false);
      console.log("Turning on monthly notifications NOT successful");
    }
  };

  return (
    <NotificationContext.Provider
      value={{
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
        notificationFrequency,
        setNotificationFrequency,
        updateNotificationSettings
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
