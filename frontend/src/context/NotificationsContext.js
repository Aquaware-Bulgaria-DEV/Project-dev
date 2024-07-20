import React, { createContext, useEffect, useState } from "react";
import { registerForPushNotificationsAsync } from "../../app/subscreens/notifications/notificationsHandler";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [pushNotifications, setPushNotifications] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');

  const togglePushNotifications = () => {
    setPushNotifications(prevState => !prevState);
    };
    
    useEffect(() => {
        if (pushNotifications) {
          registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        }
      }, [pushNotifications]);

  return (
    <NotificationContext.Provider value={{ pushNotifications, togglePushNotifications, expoPushToken }}>
      {children}
    </NotificationContext.Provider>
  );
};

