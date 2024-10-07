import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';

import AuthContext, {useAuth} from '../../Context/AuthContext.jsx';

const SignOut = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Signing out...</Text>
    </View>
  );
};

export default SignOut;
