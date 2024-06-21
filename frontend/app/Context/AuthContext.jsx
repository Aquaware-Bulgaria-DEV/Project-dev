import React, { createContext, useState, useEffect } from 'react';
import { storeData, getData, removeData } from '../../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = await getData('@auth_token');
      const storedPreferences = await getData('@user_preferences');
      const storedUserInfo = await getData('@user_info');
      setToken(storedToken);
      setPreferences(storedPreferences);
      setUserInfo(storedUserInfo);
    };

    fetchData();
  }, []);

  const saveToken = async (newToken) => {
    await storeData('@auth_token', newToken);
    setToken(newToken);
  };

  const removeToken = async () => {
    await removeData('@auth_token');
    setToken(null);
  };

  const savePreferences = async (newPreferences) => {
    await storeData('@user_preferences', newPreferences);
    setPreferences(newPreferences);
  };

  const removePreferences = async () => {
    await removeData('@user_preferences');
    setPreferences(null);
  };

  const saveUserInfo = async (newUserInfo) => {
    await storeData('@user_info', newUserInfo);
    setUserInfo(newUserInfo);
  };

  const removeUserInfo = async () => {
    await removeData('@user_info');
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        preferences,
        userInfo,
        saveToken,
        removeToken,
        savePreferences,
        removePreferences,
        saveUserInfo,
        removeUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
