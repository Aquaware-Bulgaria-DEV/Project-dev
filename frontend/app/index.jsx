import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import CustomButton from './components/customButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Redirect, router } from 'expo-router';

import '../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';

import AuthContext from './Context/AuthContext';

import AquawareLogo from '../assets/AquawareLogo.svg';
import {
  useFonts,
  Muli_400Regular,
  Muli_700Bold,
} from '@expo-google-fonts/muli';

const AuthLayout = () => {
  // Load custon font on app start
  const [fontsLoaded] = useFonts({
    Muli_400Regular,
    Muli_700Bold,
  });

  useEffect(() => {
    // console.log('changee', fontsLoaded);
    if (fontsLoaded) {
      if (Text.defaultProps == null) Text.defaultProps = {};
      Text.defaultProps.style = {
        fontFamily: 'Muli_400Regular',
        color: 'blue',
      };
    }
  }, [fontsLoaded]);

  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    if (i18n.language === 'bg') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('bg');
    }
  };

  const { token } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (token !== null) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [token]);

  const isAuthenticated = token !== null;
  // console.log(loading)
  return loading ? null : isAuthenticated ? (
    <Redirect href='/home' />
  ) : (
    <SafeAreaView style={styles.container}>
      <Image source={AquawareLogo} style={styles.image} contentFit='cover' />
      <Text style={styles.logo}>Aquaware</Text>
      <Text style={styles.welcomeMessage}>{t('welcomeMessage')} </Text>
      <CustomButton
        title={t('loginButton')}
        handlePress={() => router.push('signIn')}
      />
      <CustomButton
        title={t('home')}
        handlePress={() => router.push('/home')}
      />
      <TouchableOpacity onPress={changeLanguage}>
        <Text>{t('changeLanguage')}</Text>
      </TouchableOpacity>
      {/* <CustomButton title={'Начало'} handlePress={() => console.log("Mario Auth") }/> */}
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
