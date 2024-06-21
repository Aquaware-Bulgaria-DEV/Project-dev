import React from "react"

import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context'

import AuthForm from '../../components/authForm';
import AuthContext from "../../Context/AuthContext";

import {styles} from "./sign-inStyles"

import AquawareLogo from "../../../assets/AquawareLogo.svg"
import { login } from "../../services/fetch";

const SignIn = () => {
  const { token, saveToken, saveUserInfo, removeUserInfo } = React.useContext(AuthContext)

  const [formValues, setFormValues] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');

  const handleFormChange = (newValues) => {
    setFormValues(newValues);
    console.log(newValues)
  };
  

  const handleLogin = async () => {
    if(formValues.email ==='' || formValues.password ==='' ){
      setError('Всички полета са задължителни');
    }if (formValues.password.length<5) {
      setError('Паролата трябва да съдържа минимум 6 символа');
    } 

    try {
      const loginResponse = await login(formValues);
      await saveToken(loginResponse.token);

      console.log(`Fetched token: ${loginResponse.token}`);

      const response = await fetch('http://ec2-18-234-44-48.compute-1.amazonaws.com/profile/details/', {
        method: "GET",
        headers: {
          'Authorization': `Token ${loginResponse.token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error Response Data:', errorData);
        throw new Error('Failed to fetch profile details');
      }

      const profileData = await response.json();
      console.log(profileData);
      saveUserInfo(profileData); // Assuming you have a function to save user info
      setError(""); // Clear the error message on successful profile fetch

    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  };

  const googleHandler = () => {
    console.log('Google login')
  }

  const facebookHandler = () => {
    console.log('Facebook login')
  }

  // TODO: When Google & Facebook authentication is ready to implement, pass the handler trough props
  return (
   <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={AquawareLogo}
          style={styles.image}
          contentFit="cover"
        />
        <AuthForm 
        title="Login" //Possible to make its fields and functionality on submit depending on the title, whether is Login or Register 
        onFormChange = {handleFormChange}
        // keyboardType="email-address"
        onLogin={handleLogin}
        facebookAuth = {facebookHandler}
        googleAuth = {googleHandler}
        errorMessage={error}
        />
      </View>
   </SafeAreaView>
  );
}

export default SignIn
