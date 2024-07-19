import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [pushNotifications, setPushNotifications] = useState(false);

  const togglePushNotifications = () => {
    setPushNotifications(prevState => !prevState);
  };

  return (
    <NotificationContext.Provider value={{ pushNotifications, togglePushNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};