import React, { useContext, useEffect, useState } from 'react';
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
import RNPickerSelect from 'react-native-picker-select';
import '../../../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';
import LanguageContext from '../../../src/context/LanguageContext.js';
import * as services from '../../services/fetch.js';
import KITCHEN_SOURCE from '../../../assets/kitchen-pic.jpg';

import AuthContext from '../../Context/AuthContext.jsx';
import { router } from 'expo-router';
const Home = () => {
  const { t, i18n } = useTranslation();
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { userInfo, token } = useContext(AuthContext);
  const [selectedProp, setSelectedProperty] = useState('');
  const [properties, setProperties] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await services.getAllProperties(token);
      const remoteProperties = response.map((obj) => ({
        label: obj['type']['type'],
        value: obj['id'],
      }));
      setProperties(remoteProperties);
      if (remoteProperties.length > 0) {
        const defaultProperty = remoteProperties[0].value;
        setSelectedProperty(defaultProperty);
        await fetchPropertyRooms(defaultProperty);
      }
    } catch (error) {
      router.push('/')
      console.error('Error fetching properties:', error);
    }
  };

  const fetchPropertyRooms = async (value) => {
    try {
      const response = await services.getPropertyRooms(value, token);
      const rooms = response.map((obj) => ({
        label: obj['name'],
        value: obj['id'],
      }));
      setRooms(rooms);
    } catch (error) {
      console.error('Error fetching property rooms:', error);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);

  const handlePropertyChange = (value) => {
    if (value === null || value === 'null') {
      setSelectedProperty('');
      setRooms([]);
      return;
    }
    setSelectedProperty(value);

    if (value) {
      fetchPropertyRooms(value);
    } else {
      setRooms([]);
    }
  };
  // const changeLanguage = () => {
  //   if (i18n.language === 'bg') {
  //     i18n.changeLanguage('en');
  //   } else {
  //     i18n.changeLanguage('bg');
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic />
        <View style={styles.text}>
          <Text style={styles.headerTitle}>
            {t('welcome')}, {userInfo?.first_name}!
          </Text>
          <Text style={styles.description}>{t('welcomeQuestion')}</Text>
        </View>
        {properties.length > 1 ? (
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={handlePropertyChange}
              items={properties}
              style={{
                inputIOS: styles.pickerItem,
                inputAndroid: styles.pickerItem,
              }}
              value={selectedProp}
            />
          </View>
        ) : null}

        {rooms.map((room) => (
          <Pressable
            key={room.value}
            style={styles.paddingZero}
            onPress={() => router.push({pathname: 'singleRoom', params: { propertyId: selectedProp, roomId: room.value}})}
          >
            <ImageBackground style={styles.rooms} source={KITCHEN_SOURCE}>
              <Text style={styles.roomText}>{room.label}</Text>
            </ImageBackground>
          </Pressable>
        ))}

        {/* Change language button - for removal after successful translation implementation */}
        <TouchableOpacity onPress={toggleLanguage}>
          <Text>{t('changeLanguage')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
