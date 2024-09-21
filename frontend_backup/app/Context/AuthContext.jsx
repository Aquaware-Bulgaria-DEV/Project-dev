import React, { createContext, useState, useEffect, useContext } from 'react';
import { storeData, getData, removeData } from '../../utils/storage';
import { useRouter } from 'expo-router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

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
  console.log(newToken);

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

  const logout = async () => {
    await removeToken();
    await removeUserInfo();
    router.dismissAll();
    router.push("(auth)/signIn");
  }

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
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
