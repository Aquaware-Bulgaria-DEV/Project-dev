import React, { createContext, useEffect, useState } from "react";
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

  // Function to update backend notification settings
  const updateNotificationSettings = async () => {
    try { //endpoint change
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
      // Optional: revert the state or notify the user
    }
  };

  // Function to handle push notification toggle
  const togglePushNotifications = async () => {
    const newState = !pushNotifications;
    setPushNotifications(newState);

    if (newState) {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
    } else {
      setExpoPushToken(''); // Reset token if push notifications are turned off
    }
    updateNotificationSettings();
  };

  // Function to handle email notification toggle
  const toggleEmailNotifications = async () => {
    const newState = !isEmailNotificationsTurnedOn;
    setEmailNotificationsTurnedOn(newState);
    updateNotificationSettings();
  };

  // Function to handle daily notification toggle
  const toggleScheduledDailyNotifications = async () => {
    const newState = !isScheduledDailyTurnedOn;
    setScheduledDailyTurnedOn(newState);
    
    if (newState) {
      await scheduleDailyNotification();
    }
    updateNotificationSettings();
  };

  // Function to handle weekly notification toggle
  const toggleScheduledWeeklyNotifications = async () => {
    const newState = !isScheduledWeeklyTurnedOn;
    setScheduledWeeklyTurnedOn(newState);
    
    if (newState) {
      await scheduleWeeklyNotification();
    }
    updateNotificationSettings();
  };

  // Function to handle monthly notification toggle
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
