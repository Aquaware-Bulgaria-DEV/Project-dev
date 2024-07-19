import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';

import AuthContext from '../../Context/AuthContext';

const SignOut = () => {
  const { removeToken, removeUserInfo } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    removeToken();
    removeUserInfo();
    router.dismissAll();
    router.push("(auth)/signIn");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Signing out...</Text>
    </View>
  );
};

export default SignOut;
