import React from 'react';
import { styles } from './homeStyles.js';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import { Header } from '../../globalComponents/header.jsx';

import '../../../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';

import KITCHEN_SOURCE from '../../../assets/kitchen-pic.jpg';
import BATHROOM_SOURCE from '../../../assets/bathroom.jpg';
import TOILET_SOURCE from '../../../assets/toilet.png';

const Home = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    if (i18n.language === 'bg') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('bg');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={true} />
        <View style={styles.text}>
          <Text style={styles.headerTitle}>{t('welcome')}, username!</Text>
          <Text style={styles.description}>
          {t('welcomeQuestion')}
          </Text>
        </View>
        <Pressable
          style={styles.paddingZero}
          onPress={() => console.log('TODO: redirect')}
        >
          <ImageBackground style={styles.rooms} source={KITCHEN_SOURCE}>
            <Text style={styles.roomText}>{t('kitchen')}</Text>
            {/* <Text style={styles.devices}>5 уреда</Text> */}
          </ImageBackground>
        </Pressable>
        <Pressable
          style={styles.paddingZero}
          onPress={() => console.log('TODO: redirect')}
        >
          <ImageBackground style={styles.rooms} source={BATHROOM_SOURCE}>
            <Text style={styles.roomText}>{t('bathroom')}</Text>
            {/* <Text style={styles.devices}>4 уреда</Text> */}
          </ImageBackground>
        </Pressable>
        
        {/* Change language button - for removal after successful translation implementation */}
        <TouchableOpacity onPress={changeLanguage}>
        <Text>{t('changeLanguage')}</Text>
        </TouchableOpacity>
        
        <Pressable
          style={styles.paddingZero}
          onPress={() => console.log('TODO: redirect')}
        >
          <ImageBackground style={styles.rooms} source={TOILET_SOURCE}>
            <Text style={styles.roomText}>Тоалетна</Text>
            {/* <Text style={styles.devices}>2 уреда</Text> */}
          </ImageBackground>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
