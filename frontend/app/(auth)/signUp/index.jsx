import React from "react"

import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context'

import AuthForm from '../../components/authForm'
import AuthContext from '../../Context/AuthContext';

import {styles} from "./sign-upStyles"

import AquawareLogo from "../../../assets/AquawareLogo.svg"
import { login, register } from "../../services/fetch";

const SignUp = () => {
  const [formValues, setFormValues] = React.useState({ name: '', email: '', password: '', repeatPassword: ''});
  const {
    token,
    preferences,
    getToken,
    saveToken,
    removeToken,
    savePreferences,
    removePreferences,
  } = React.useContext(AuthContext);
  
  const handleFormChange = (newValues) => {
    setFormValues(newValues);
    console.log(newValues)
  };
  
  const handleRegister = async() => {
    console.log(`in handle register: ${formValues}`)
    if (!formValues.email || !formValues.password || !formValues.repeatPassword) {
      throw new Error( 'Моля, попълнете всички полета');
      return;
  }

  if (formValues.password !== formValues.repeatPassword) {
      throw new Error('Паролите не съвпадат');
      return;
  }
  const user = await register(formValues.email,formValues.password);
  console.log(`user is : ${JSON.stringify(user)}`)
  const userInfo =await login(formValues)
  console.log(userInfo)
  const token =userInfo.token;
  console.log(`Token is ${token}`)
    //let newToken = {email: 'notebook', password: 'b', repeatPassword: 'b'};
    saveToken(token)
    console.log(`Authorization token is ${JSON.stringify(token)}`)
    console.log(`Preferences token is ${preferences}`)
    // removeToken()
  };

  const googleHandler = () => {
    console.log('Google reg')
  }

  const facebookHandler = () => {
    console.log('Facebook reg')
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
        onRegister={handleRegister}
        facebookAuth = {facebookHandler}
        googleAuth = {googleHandler}
        isReg={true}
        />
      </View>
   </SafeAreaView>
  );
}

export default SignUp
