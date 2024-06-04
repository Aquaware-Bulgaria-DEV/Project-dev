import React from "react"

import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context'

import AuthForm from '../../components/authForm'

import {styles} from "./sign-upStyles"

import AquawareLogo from "../../../assets/AquawareLogo.svg"

const SignUp = () => {
  const [formValues, setFormValues] = React.useState({ name: '', email: '', password: '', repeatPassword: ''});

  const handleFormChange = (newValues) => {
    setFormValues(newValues);
    console.log(newValues)
  };

  const handleRegister = () => {

    // Here goes the register by Mario

    console.log('Register with:', formValues);
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
