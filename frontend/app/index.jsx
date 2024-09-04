import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from './globalComponents/customButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Redirect, router } from 'expo-router';

import '../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';

import AuthContext from './Context/AuthContext';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from './services/fetch';

import AquawareLogo from '../assets/AquawareLogo.svg';
import {
  useFonts,
  Muli_400Regular,
  Muli_700Bold,
} from '@expo-google-fonts/muli';
import globalStyles from './globalStyles';

const AuthLayout = () => {
  // Load custom font on app start
  const [fontsLoaded] = useFonts({
    Muli_400Regular,
    Muli_700Bold,
  });

  const { t, i18n } = useTranslation();
  const { token } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
  const [biometricLoginEnabled, setBiometricLoginEnabled] = useState(false);
  const [biometricConfigured, setBiometricConfigured] = useState(false);

  useEffect(() => {
    const checkBiometricLogin = async () => {
      try {
        // Check if biometric login is enabled
        const value = await AsyncStorage.getItem('biometricLogin');
        const isEnabled = value ? JSON.parse(value) : false;
        setBiometricLoginEnabled(isEnabled);

        if (isEnabled) {
          // Check if biometrics are configured
          const hasHardware = await LocalAuthentication.hasHardwareAsync();
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();
          setBiometricConfigured(hasHardware && isEnrolled);

          // Attempt biometric login if configured
          if (hasHardware && isEnrolled) {
            const authResult = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Authenticate to login',
              fallbackLabel: 'Use Password',
            });

            if (authResult.success) {
              // Handle successful biometric authentication
              const loginResponse = await login({ email: '', password: '' }); // Use empty credentials for biometric login
              await saveToken(loginResponse.token);

              const response = await fetch(
                'http://ec2-18-234-44-48.compute-1.amazonaws.com/profile/details/',
                {
                  method: 'GET',
                  headers: {
                    Authorization: `Token ${loginResponse.token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              if (!response.ok) {
                const errorData = await response.json();
                console.log('Error Response Data:', errorData);
                throw new Error('Failed to fetch profile details');
              }

              const profileData = await response.json();
              saveUserInfo(profileData); 
              router.push('/home');
            } else {
              Alert.alert('Authentication failed', 'Please log in manually.');
            }
          } else {
            Alert.alert('Biometric Login Not Configured', 'Please configure biometric login preferences.');
          }
        }
      } catch (error) {
        console.error('Error attempting biometric login:', error);
      } finally {
        setLoading(false);
      }
    };

    if (fontsLoaded) {
      checkBiometricLogin();
    }
  }, [fontsLoaded]);

  const isAuthenticated = token !== null;

  return loading ? null : isAuthenticated ? (
    <Redirect href='/home' />
  ) : (
    <SafeAreaView style={styles.container}>
      <Image source={AquawareLogo} style={styles.image} contentFit='cover' />
      <Text style={styles.logo}>Aquaware</Text>
      <Text style={styles.welcomeMessage}>{t('welcomeMessage')}</Text>
      <CustomButton
        title={t('loginButton')}
        handlePress={() => router.push('signIn')}
      />
    </SafeAreaView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    paddingTop: 40,
  },
  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: globalStyles.primaryColor,
  },
  welcomeMessage: {
    fontSize: 18,
    textAlign: 'center',
  },
  image: {
    width: 160,
    height: 150,
  },
});
