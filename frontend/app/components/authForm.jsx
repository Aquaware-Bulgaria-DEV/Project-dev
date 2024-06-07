import {styles} from "./authFormStyles"

import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

import { useTranslation } from "react-i18next";

import  globalStyles  from '../globalStyles';
import CustomButton from './customButton';


import GooglePath from '../../assets/authSvg/google.png'
import FacebookPath from '../../assets/authSvg/facebook.png'

const FormField = ({title, value, placeholder, onFormChange, formValues, setFormValues, type, ...props}) => {
  const handleChange = (name, value) => {
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
    onFormChange(updatedValues);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputName}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputField} value={formValues[type]} onChangeText={(text) => handleChange(type, text)}
        secureTextEntry={title === "Парола" ? true : false}></TextInput>
      </View>
    </View>
  )
}

const AuthForm = ({title, value, placeholder, onFormChange, onLogin, googleAuth, facebookAuth,  ...props}) => {
  const { t } = useTranslation();
  let errorMsg = '';
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  })
  const handleChangeText = (e) => {
    console.log(e.value)
  }

  return (
    <>
      <FormField title={t('email')} type={'email'} onFormChange={onFormChange} formValues={formValues} setFormValues={setFormValues} />
      <FormField title={t('password')} type={'password'} onFormChange={onFormChange} formValues={formValues} setFormValues={setFormValues} />
      <Text style={styles.errorMsg}>{errorMsg}</Text>
      <CustomButton title={t('login')} additionalStyles={{marginTop: 15,}} handlePress={onLogin}/>
      <Text style={{fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase'}}>{t("or")}</Text>
      <View style={styles.thirdPartyAuthBox}>
        <CustomButton 
        title={t('loginWithGoogle')} 
        handlePress={googleAuth}
        additionalStyles={{ 
          width: '35%',
          padding: 5,
          // borderRadius: 30, 
          backgroundColor: '#FFF',
          borderColor: globalStyles.primaryColor,
          borderWidth: 1, 
        }}
        imagePath={GooglePath}
          />
        <CustomButton 
        title={t('loginWithFacebook')} 
        handlePress={facebookAuth}
        additionalStyles={{
          width: '35%',
          padding: 5,
          // borderRadius: 30, 
          backgroundColor: '#FFF',
          borderColor: globalStyles.primaryColor,
          borderWidth: 1, 
        }}
        imagePath={FacebookPath}
            />
      </View>
      <View>
      <TouchableOpacity >
        <Text style={styles.link}>
        {t('forgotPassword')} <Text onPress={() => console.log('click')} style={styles.linkBold}>{t('resetPassword')}</Text>
        </Text>
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity >
        <Text style={styles.link}>
        {t('noAccount')} <Text onPress={() => console.log('click')} style={styles.linkBold}>{t('createAccount')}</Text>
        </Text>
      </TouchableOpacity>
      </View>
    </>
  )
}

export default AuthForm

