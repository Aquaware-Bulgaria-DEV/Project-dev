import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  registerForPushNotificationsAsync, 
  scheduleDailyNotification, 
  scheduleWeeklyNotification, 
  scheduleMonthlyNotification 
} from "../../app/subscreens/notifications/notificationsHandler";
import AuthContext from "../../app/Context/AuthContext";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { token, preferences, savePreferences } = useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [isPushNotificationsTurnedOn, setPushNotificationsTurnedOn] = useState(false);
  const [isEmailNotificationsTurnedOn, setEmailNotificationsTurnedOn] = useState(false);
  const [isScheduledDailyTurnedOn, setScheduledDailyTurnedOn] = useState(false);
  const [isScheduledWeeklyTurnedOn, setScheduledWeeklyTurnedOn] = useState(false);
  const [isScheduledMonthlyTurnedOn, setScheduledMonthlyTurnedOn] = useState(false);

  useEffect(() => {
    if (preferences) {
      setPushNotificationsTurnedOn(preferences.push || false);
      setEmailNotificationsTurnedOn(preferences.email_notification || false);
      setScheduledDailyTurnedOn(preferences.daily || false);
      setScheduledWeeklyTurnedOn(preferences.weekly || false);
      setScheduledMonthlyTurnedOn(preferences.monthly || false);
    }
  }, [preferences]);

  const updateNotificationSettings = async (newSettings) => {
    try {
      const response = await fetch(
        'http://ec2-18-234-44-48.compute-1.amazonaws.com/profile/details/', 
        {
          method: 'PATCH',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSettings),
        }
      );
    
      const responseData = await response.json();
      console.log('API response:', responseData);
      
      if (!response.ok) {
        console.error('Failed to update settings:', responseData);
        throw new Error('Failed to update notification settings');
      }
      
      // Server returned success, update preferences
      savePreferences(responseData);
      console.log('Updated preferences:', responseData);
      return true; // Indicate success
    
    } catch (error) {
      console.error('Error updating settings:', error);
      return false; // Indicate failure
    }
  };

  const togglePushNotifications = async () => {
    /**
     * When we start getting real data we must implement the following logic:
     * In the case of a sharp change in the value compared to the last reported period 
     * (if it has been showing 0 up until now and the new value is different) 
     * or the new value is at least 50% greater than the old one (new value > old value * 2).
     **/ 
    const newState = !isPushNotificationsTurnedOn;
    setPushNotificationsTurnedOn(newState);
    
    if (newState) {
      const token = await registerForPushNotificationsAsync();
      if (!token) {
        setPushNotificationsTurnedOn(false); // Revert the state if token is missing
        console.log("Push notification token is missing");
        return;
      } else {
        setExpoPushToken(token);        
      }
    } else {
      setExpoPushToken('');
    }
    
    const success = await updateNotificationSettings({
      push: newState,
      email_notification: isEmailNotificationsTurnedOn,
      daily: isScheduledDailyTurnedOn,
      weekly: isScheduledWeeklyTurnedOn,
      monthly: isScheduledMonthlyTurnedOn,
    });
    
    if (!success) {
      setPushNotificationsTurnedOn(!newState); // Revert the state if server update fails
      console.log("Turning on push notifications NOT successful");
    }
  };

  const toggleEmailNotifications = async () => {
    const newState = !isEmailNotificationsTurnedOn;
    setEmailNotificationsTurnedOn(newState);
  
    const success = await updateNotificationSettings({
      push: isPushNotificationsTurnedOn,
      email_notification: newState,
      daily: isScheduledDailyTurnedOn,
      weekly: isScheduledWeeklyTurnedOn,
      monthly: isScheduledMonthlyTurnedOn,
    });
  
    if (!success) {
      setEmailNotificationsTurnedOn(!newState); // Revert the state if server update fails
      console.log("Turning on email notifications NOT successful");
    }
  };

  const toggleScheduledDailyNotifications = async () => {
    const newState = !isScheduledDailyTurnedOn;
  
    // If daily notifications are turned on, ensure weekly and monthly are turned off
    setScheduledDailyTurnedOn(newState);
    setScheduledWeeklyTurnedOn(false);
    setScheduledMonthlyTurnedOn(false);
  
    if (newState) {
      await scheduleDailyNotification();
    }
  
    const success = await updateNotificationSettings({
      push: isPushNotificationsTurnedOn,
      email_notification: isEmailNotificationsTurnedOn,
      daily: newState,
      weekly: false,
      monthly: false,
    });
  
    if (!success) {
      // Revert the state if server update fails
      setScheduledDailyTurnedOn(!newState);
      setScheduledWeeklyTurnedOn(false);
      setScheduledMonthlyTurnedOn(false);
      console.log("Turning on daily notifications NOT successful");
    }
  };

  const toggleScheduledWeeklyNotifications = async () => {
    const newState = !isScheduledWeeklyTurnedOn;
  
    // If weekly notifications are turned on, ensure daily and monthly are turned off
    setScheduledWeeklyTurnedOn(newState);
    setScheduledDailyTurnedOn(false);
    setScheduledMonthlyTurnedOn(false);
  
    if (newState) {
      await scheduleWeeklyNotification();
    }
  
    const success = await updateNotificationSettings({
      push: isPushNotificationsTurnedOn,
      email_notification: isEmailNotificationsTurnedOn,
      daily: false,
      weekly: newState,
      monthly: false,
    });
  
    if (!success) {
      // Revert the state if server update fails
      setScheduledWeeklyTurnedOn(!newState);
      setScheduledDailyTurnedOn(false);
      setScheduledMonthlyTurnedOn(false);
      console.log("Turning on weekly notifications NOT successful");
    }
  };

  const toggleScheduledMonthlyNotifications = async () => {
    const newState = !isScheduledMonthlyTurnedOn;
  
    // If monthly notifications are turned on, ensure daily and weekly are turned off
    setScheduledMonthlyTurnedOn(newState);
    setScheduledDailyTurnedOn(false);
    setScheduledWeeklyTurnedOn(false);
  
    if (newState) {
      await scheduleMonthlyNotification();
    }
  
    const success = await updateNotificationSettings({
      push: isPushNotificationsTurnedOn,
      email_notification: isEmailNotificationsTurnedOn,
      daily: false,
      weekly: false,
      monthly: newState,
    });
  
    if (!success) {
      // Revert the state if server update fails
      setScheduledMonthlyTurnedOn(!newState);
      setScheduledDailyTurnedOn(false);
      setScheduledWeeklyTurnedOn(false);
      console.log("Turning on monthly notifications NOT successful");
    }
  };

  return (
    <NotificationContext.Provider value={{
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
      toggleScheduledMonthlyNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
