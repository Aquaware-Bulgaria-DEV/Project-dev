import React, { useContext, useEffect, useRef, useState } from 'react';
import { styles } from './homeStyles.js';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Pressable,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { Header } from '../../globalComponents/header.jsx';
import RNPickerSelect from 'react-native-picker-select';
import '../../../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';
import * as services from '../../services/fetch.js';
import KITCHEN from '../../../assets/kitchen.png';
import BATHROOM from '../../../assets/bathroom.png';
import TOILET from '../../../assets/toilet.png';
import LAUNDRY from '../../../assets/laundry.png';
import GARDEN from '../../../assets/garden.png';
import GARAGE from '../../../assets/garage.png';

import AuthContext from '../../Context/AuthContext.jsx';
import { router } from 'expo-router';

const Home = () => {
  const { t } = useTranslation();
  const { userInfo, token } = useContext(AuthContext);
  const [selectedProp, setSelectedProperty] = useState('');
  const [properties, setProperties] = useState([]);
  const [rooms, setRooms] = useState([]);
  const focused = useIsFocused();
  const [fetching, setFetching] = useState(false);

  const hasMountedRef = useRef(false);

  const roomImages = {
    KITCHEN,
    BATHROOM,
    TOILET,
    LAUNDRY,
    GARDEN,
    GARAGE,
  };

  const fetchProperties = async () => {
    setFetching(true);
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
      setFetching(false);
    } catch (error) {
      setFetching(false);
      router.push('/');
      console.error('Error fetching properties:', error);
    }
  };

  const fetchPropertyRooms = async (value) => {
    try {
      const response = await services.getPropertyRooms(value, token);
      const rooms = response.map((obj) => ({
        label: obj['name'],
        value: obj['id'],
        type: obj['room_type'],
      }));
      setRooms(rooms);
    } catch (error) {
      console.error('Error fetching property rooms:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (hasMountedRef.current) {
      if (focused && !fetching) {
        fetchProperties();
        console.log('fetching');
      }
    } else {
      hasMountedRef.current = true;
    }
  }, [focused]);

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
              key={selectedProp}
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
            onPress={() =>
              router.push({
                pathname: 'singleRoom',
                params: { propertyId: selectedProp, roomId: room.value },
              })
            }
          >
            <ImageBackground
              style={styles.rooms}
              source={roomImages[room.type]}
            >
              <Text style={styles.roomText}>{room.label}</Text>
            </ImageBackground>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
