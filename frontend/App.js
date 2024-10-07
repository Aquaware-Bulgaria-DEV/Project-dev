import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './app/Context/AuthContext.jsx';
import { LanguageProvider } from './src/context/LanguageContext';
import { NotificationProvider } from './src/context/NotificationsContext';

import AuthLayout from './app/index.jsx';
import SignInScreen from './app/(auth)/signIn/index.jsx';
import SignUpScreen from './app/(auth)/signUp/index.jsx';
import SignOutScreen from './app/(auth)/signOut/index.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LanguageProvider>
          <NotificationProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={AuthLayout} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="SignOut" component={SignOutScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </NotificationProvider>
        </LanguageProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );  
}
