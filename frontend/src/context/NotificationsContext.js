import React, { createContext, useEffect, useState } from "react";
import { registerForPushNotificationsAsync, scheduleDailyNotification, scheduleWeeklyNotification, scheduleMonthlyNotification } from "../../app/subscreens/notifications/notificationsHandler";
import axios from 'axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [isEmailNotificationsTurnedOn, setEmailNotificationsTurnedOn] = useState(false);
  const [isScheduledDailyTurnedOn, setScheduledDailyTurnedOn] = useState(false);
  const [isScheduledWeeklyTurnedOn, setScheduledWeeklyTurnedOn] = useState(false);
  const [isScheduledMonthlyTurnedOn, setScheduledMonthlyTurnedOn] = useState(false);

  const togglePushNotifications = async () => {
    const newState = !pushNotifications;
    setPushNotifications(newState);
    if (newState) {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
    }
    updateNotificationSettings();
  };

  const toggleEmailNotifications = () => {
    setEmailNotificationsTurnedOn(prevState => !prevState);
    updateNotificationSettings();
  };

  const toggleScheduledDailyNotifications = () => {
    const newState = !isScheduledDailyTurnedOn;
    setScheduledDailyTurnedOn(newState);
    if (newState) scheduleDailyNotification();
    updateNotificationSettings();
  };

  const toggleScheduledWeeklyNotifications = () => {
    const newState = !isScheduledWeeklyTurnedOn;
    setScheduledWeeklyTurnedOn(newState);
    if (newState) scheduleWeeklyNotification();
    updateNotificationSettings();
  };

  const toggleScheduledMonthlyNotifications = () => {
    const newState = !isScheduledMonthlyTurnedOn;
    setScheduledMonthlyTurnedOn(newState);
    if (newState) scheduleMonthlyNotification();
    updateNotificationSettings();
  };

  const updateNotificationSettings = async () => {
    try { //change the url with an actual backend url
      const response = await axios.post('http://192.168.1.2:8000/update-settings', {
        expoPushToken,
        emailNotifications: isEmailNotificationsTurnedOn,
        scheduledDaily: isScheduledDailyTurnedOn,
        scheduledWeekly: isScheduledWeeklyTurnedOn,
        scheduledMonthly: isScheduledMonthlyTurnedOn
      });
      console.log('Settings updated:', response.data);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{
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
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
