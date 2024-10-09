import React from 'react';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import AuthForm from '../../globalComponents/authForm.jsx';
import AuthContext from '../../Context/AuthContext.jsx';

import { styles } from './sign-upStyles';

import AquawareLogo from '../../../assets/AquawareLogo.svg';
import { login, register } from '../../services/fetch';
import LanguageToggleButton from '../../globalComponents/LanguageToggleButton.jsx';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { t } = useTranslation();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [formValues, setFormValues] = React.useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const { saveToken, saveUserInfo } = React.useContext(AuthContext);

  const [error, setError] = React.useState('');
  const router = useRouter();

  const handleFormChange = (newValues) => {
    setFormValues(newValues);
    console.log(newValues);
  };

  
  const handleRegister = async () => {
    console.log(`in handle register: ${formValues}`);
    if (
      !formValues.email ||
      !formValues.password ||
      !formValues.repeatPassword
    ) {
      setError(`${t('fillAllFields')}`);
    }

    if(!validateEmail(formValues.email)) {
      setError(`${t('signUpEmailError')}`);
      return;
    }

    if (formValues.password !== formValues.repeatPassword) {
      setError(`${t('appSettingsChangePasswordMismatchError')}`);
      return;
    }

    try {
      const user = await register(formValues.email, formValues.password);
      const userInfo = await login(formValues);
      const token = userInfo.token;
      saveToken(token);

      const response = await fetch(
        'http://ec2-18-234-44-48.compute-1.amazonaws.com/profile/details/',
        {
          method: 'GET',
          headers: {
            Authorization: `Token ${token}`,
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
      // console.log(profileData);
      router.push('subscreens/myProfile');
    } catch (error) {
      setError(error.message);
    }
  };

  function validateEmail(email) {
    return emailRegex.test(email);
  }

  const googleHandler = () => {
    console.log('Google reg');
  };

  const facebookHandler = () => {
    console.log('Facebook reg');
  };

  // TODO: When Google & Facebook authentication is ready to implement, pass the handler trough props
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={AquawareLogo} style={styles.image} contentFit='cover' />
        <AuthForm
          title='Login' //Possible to make its fields and functionality on submit depending on the title, whether is Login or Register
          onFormChange={handleFormChange}
          // keyboardType="email-address"
          onRegister={handleRegister}
          facebookAuth={facebookHandler}
          googleAuth={googleHandler}
          isReg={true}
          errorMessage={error}
        />
        <LanguageToggleButton />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
