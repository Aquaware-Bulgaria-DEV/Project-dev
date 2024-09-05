import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, Button } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

import AuthForm from '../../globalComponents/authForm.jsx';
import AuthContext from '../../Context/AuthContext';
import { styles } from './sign-inStyles';
import AquawareLogo from '../../../assets/AquawareLogo.svg';
import { login } from '../../services/fetch';
import LanguageToggleButton from '../../globalComponents/LanguageToggleButton.jsx'; 
import * as SecureStore from 'expo-secure-store';
import LanguageToggleButton from "../../globalComponents/LanguageToggleButton.jsx";

const SignIn = () => {
  const { saveToken, saveUserInfo } = React.useContext(AuthContext);
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState('');
  const [biometricLoginEnabled, setBiometricLoginEnabled] = useState(false);
  const [biometricConfigured, setBiometricConfigured] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadBiometricPreference = async () => {
       try {
          const value = await AsyncStorage.getItem('biometricLogin');
          const isEnabled = value ? JSON.parse(value) : false;
          console.log('Biometric Login Preference:', isEnabled);
          setBiometricLoginEnabled(isEnabled);
          
          if (isEnabled) {
             const hasHardware = await LocalAuthentication.hasHardwareAsync();
             const isEnrolled = await LocalAuthentication.isEnrolledAsync();
             console.log('Hardware:', hasHardware, 'Enrolled:', isEnrolled);
             setBiometricConfigured(hasHardware && isEnrolled);
          }
       } catch (error) {
          console.error('Error getting biometric preference:', error);
       }
    };
 
    loadBiometricPreference();
 }, []);

  const handleFormChange = (newValues) => {
    setFormValues(newValues);
    console.log(newValues);
  };

  const handleLogin = async () => {
    if (formValues.email === '' || formValues.password === '') {
      setError('All fields are required');
      return;
    }
    if (formValues.password.length < 5) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const loginResponse = await login(formValues);
      console.log(loginResponse.token);
      
      await saveToken(loginResponse.token);

      if (biometricLoginEnabled) {
        await SecureStore.setItemAsync('userEmail', formValues.email);
        await SecureStore.setItemAsync('userPassword', formValues.password);
      }

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
      setError(''); 
      router.push("/home");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleBiometricAuth = async () => {
    try {
       const result = await LocalAuthentication.authenticateAsync();
       if (result.success) {
          console.log('Biometric authentication successful');
          await sendCredentials();  // Attempt login after successful biometric authentication
       } else {
          console.log('Biometric authentication failed');
          Alert.alert('Authentication failed', 'Biometric authentication was not successful');
       }
    } catch (error) {
       console.error('Biometric authentication error:', error);
       Alert.alert('Error', 'An error occurred during biometric authentication');
    }
 };

 const sendCredentials = async () => {
  try {
     const email = await SecureStore.getItemAsync('userEmail');
     const password = await SecureStore.getItemAsync('userPassword');
     
     if (email && password) {
        console.log('Credentials retrieved:', email, password);

        const loginResponse = await login({ email, password });
        console.log('Login successful:', loginResponse);

        await saveToken(loginResponse.token);
        router.push("/home"); // Navigate to the home screen upon successful login
     } else {
        console.error('No credentials found');
        setError('No credentials found. Please log in manually first.');
     }
  } catch (error) {
     console.error('Error during login:', error);
     setError('Login failed');
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={AquawareLogo} style={styles.image} contentFit='cover' />
        <LanguageToggleButton />
        {biometricLoginEnabled && biometricConfigured && (
          <Button title="Login with Biometrics" onPress={handleBiometricAuth} />
        )}
        <AuthForm
          title='Login'
          onFormChange={handleFormChange}
          onLogin={handleLogin}
          errorMessage={error}
        />
        <LanguageToggleButton />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
