import React, { useEffect } from 'react';

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
import * as Facebook from 'expo-auth-session/providers/facebook'; // Facebook provider

const SignUp = () => {
  const { t } = useTranslation();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [formValues, setFormValues] = React.useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const { saveToken, saveUserInfo, preferences } = React.useContext(AuthContext);
  
  const [error, setError] = React.useState('');
  const router = useRouter();
  
      // Facebook login setup
      const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: '1052805583190115',
      });

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;

      // Use the access token to fetch user details from Facebook's API
      fetch(`https://graph.facebook.com/me?access_token=${access_token}`)
        .then(res => res.json())
        .then(async userData => {
          // Handle Facebook user authentication (e.g., send to your backend for verification)
          await saveToken(access_token);
          // Assuming saveUserInfo will store the profile details fetched from Facebook
          saveUserInfo(userData);
          router.push("/home");
        })
        .catch(err => {
          console.error(err);          
          setError(`${t('errorFacebookLogin')}`);
        });
    }
  }, [response]);

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

    const language = preferences?.language || 'en';

    try {
      const user = await register(formValues.email, formValues.password, language);
      const userInfo = await login(formValues, language);
      const token = userInfo.token;
      saveToken(token);

      const response = await fetch(
        'http://ec2-13-60-188-34.eu-north-1.compute.amazonaws.com/profile/details/',
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

  const handleFacebookLogin = () => {
    promptAsync();
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
          facebookAuth={handleFacebookLogin}
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
