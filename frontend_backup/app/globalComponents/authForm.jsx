import {styles} from "./authFormStyles"
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import  globalStyles  from '../globalStyles';
import CustomButton from './customButton';
import FacebookPath from '../../assets/authSvg/facebook.png';
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const FormField = ({ title, value, placeholder, onFormChange, formValues, setFormValues, type, isSecure, ...props }) => {
  const { t } = useTranslation();
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
        secureTextEntry={isSecure}></TextInput>
      </View>
    </View>
  );
};

const AuthForm = ({
  title, 
  value, 
  placeholder, 
  onFormChange, 
  onLogin, 
  facebookAuth, 
  isReg, 
  onRegister,  
  errorMessage,
  ...props
}) => {
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
    repeatPassword: ''
  });

  useEffect(() => {
    isReg ? null : setFormValues(prev => prev = { email: '', password: '' });
  }, []);

  return (
    <>
      <FormField title={t("email")} type={'email'} isSecure={false} onFormChange={onFormChange} formValues={formValues} setFormValues={setFormValues} />
      <FormField title={t("password")} type={'password'} isSecure={true} onFormChange={onFormChange} formValues={formValues} setFormValues={setFormValues} />
      {isReg && <FormField title={t("passwordRepeat")} isSecure={true} type={'repeatPassword'} onFormChange={onFormChange} formValues={formValues} setFormValues={setFormValues} />}
      <Text style={styles.errorMsg}>{errorMessage}</Text>
      {
        isReg 
        ? <CustomButton title={t("create")} additionalStyles={{marginTop: 15}} handlePress={onRegister}/> 
        : <CustomButton title={t("login")} additionalStyles={{marginTop: 15}} handlePress={onLogin}/>
      }
      <Text style={{fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase'}}>{t("or")}</Text>
      <View style={styles.thirdPartyAuthBox}>
        <CustomButton 
          title={t("loginWithFacebook")} 
          handlePress={facebookAuth}
          additionalStyles={{
            width: '35%',
            padding: 5,
            backgroundColor: '#FFF',
            borderColor: globalStyles.primaryColor,
            borderWidth: 1,
          }}
          imagePath={FacebookPath}
        />
      </View>
      {!isReg && 
        <View>
          <TouchableOpacity>
            <Text style={styles.link}>
              {t("noAccount")} <Text onPress={() => router.push('signUp')} style={styles.linkBold}>{t("createAccount")}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      }
    </>
  );
};

export default AuthForm;
