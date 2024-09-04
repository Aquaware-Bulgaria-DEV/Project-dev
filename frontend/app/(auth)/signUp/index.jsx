import React from 'react';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import AuthForm from '../../globalComponents/authForm.jsx';
import AuthContext from '../../Context/AuthContext';

import { styles } from './sign-upStyles';

import AquawareLogo from '../../../assets/AquawareLogo.svg';
import { login, register } from '../../services/fetch';
import LanguageToggleButton from '../../globalComponents/LanguageToggleButton.jsx';

const SignUp = () => {
  const [formValues, setFormValues] = React.useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const {
    saveToken,
    saveUserInfo
  } = React.useContext(AuthContext);

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
      setError('Моля, попълнете всички полета');
    }

    if (formValues.password !== formValues.repeatPassword) {
      setError('Паролите не съвпадат');
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
      router.push("/home");
    } catch (error) {
      setError(error.message);
    }
  };

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
        <LanguageToggleButton />
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
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
