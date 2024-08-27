import React, { createContext, useState } from "react";
import axios from 'axios';
import { 
  registerForPushNotificationsAsync, 
  scheduleDailyNotification, 
  scheduleWeeklyNotification, 
  scheduleMonthlyNotification 
} from "../../app/subscreens/notifications/notificationsHandler";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [isEmailNotificationsTurnedOn, setEmailNotificationsTurnedOn] = useState(false);
  const [isScheduledDailyTurnedOn, setScheduledDailyTurnedOn] = useState(false);
  const [isScheduledWeeklyTurnedOn, setScheduledWeeklyTurnedOn] = useState(false);
  const [isScheduledMonthlyTurnedOn, setScheduledMonthlyTurnedOn] = useState(false);

  const updateNotificationSettings = async () => {
    try { //! Create endpoint
      await axios.post('http://192.168.1.2:8000/update-settings', {
        expoPushToken,
        emailNotifications: isEmailNotificationsTurnedOn,
        scheduledDaily: isScheduledDailyTurnedOn,
        scheduledWeekly: isScheduledWeeklyTurnedOn,
        scheduledMonthly: isScheduledMonthlyTurnedOn
      });
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const togglePushNotifications = async () => {
    const newState = !pushNotifications;
    setPushNotifications(newState);

    if (newState) {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
    } else {
      setExpoPushToken('');
    }
    updateNotificationSettings();
  };

  const toggleEmailNotifications = () => {
    setEmailNotificationsTurnedOn(!isEmailNotificationsTurnedOn);
    updateNotificationSettings();
  };

  const toggleScheduledDailyNotifications = async () => {
    const newState = !isScheduledDailyTurnedOn;
    setScheduledDailyTurnedOn(newState);

    if (newState) {
      await scheduleDailyNotification();
    }
    updateNotificationSettings();
  };

  const toggleScheduledWeeklyNotifications = async () => {
    const newState = !isScheduledWeeklyTurnedOn;
    setScheduledWeeklyTurnedOn(newState);

    if (newState) {
      await scheduleWeeklyNotification();
    }
    updateNotificationSettings();
  };

  const toggleScheduledMonthlyNotifications = async () => {
    const newState = !isScheduledMonthlyTurnedOn;
    setScheduledMonthlyTurnedOn(newState);

    if (newState) {
      await scheduleMonthlyNotification();
    }
    updateNotificationSettings();
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
