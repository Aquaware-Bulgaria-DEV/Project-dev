
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';
import {Link , Redirect, Stack} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthProvider } from './Context/AuthContext'; 
import AuthContext from './Context/AuthContext';
import { LanguageProvider } from '../src/context/LanguageContext';
import { NotificationProvider } from '../src/context/NotificationsContext';

// const MyStack = () => {

//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{headerShown: false}} />
//       <Stack.Screen name="(tabs)" options={{headerShown: false}} />
//       <Stack.Screen name="(auth)" options={{headerShown: false}} />
//     </Stack>
//   );
// }

const RootLayout = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <AuthProvider>
        <LanguageProvider>
        <NotificationProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </NotificationProvider>
        </LanguageProvider>
      </AuthProvider>
    </SafeAreaView>
  );
};

export default RootLayout;
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
// });
