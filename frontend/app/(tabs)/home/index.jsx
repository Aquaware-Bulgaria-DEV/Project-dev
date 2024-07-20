import React, { useContext, useEffect, useState } from 'react';
import { styles } from './homeStyles.js';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Pressable,
} from 'react-native';

import { Header } from '../../globalComponents/header.jsx';
import RNPickerSelect from 'react-native-picker-select';
import '../../../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';
import * as services from '../../services/fetch.js';
import KITCHEN_SOURCE from '../../../assets/kitchen-pic.jpg';

import AuthContext from '../../Context/AuthContext.jsx';
const Home = () => {
  const { t, i18n } = useTranslation();
  const { userInfo, token } = useContext(AuthContext);
  const [selectedProp, setSelectedProperty] = useState('');
  const [properties, setProperties] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [hideDropdown, setHideDropdown] = useState(true);

  const fetchProperties = async () => {
    try {
      const response = await services.getAllProperties(token);

      setProperties(
        response.map((obj) => ({
          label: obj['type']['type'],
          value: obj['id'],
        }))
      );
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchPropertyRooms = async (value) => {
    try {
      const response = await services.getPropertyRooms(value, token);

      setRooms(
        response.map((obj) => ({
          label: obj['name'],
          value: obj['id'],
        }))
      );
    } catch (error) {
      console.error('Error fetching property rooms:', error);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (properties.length > 0) {
      const defaultProperty = properties[0].value;
      setSelectedProperty(defaultProperty);
      fetchPropertyRooms(defaultProperty);
    }
    if (properties.length > 1) {
      setHideDropdown(false);
    }
  }, [properties]);

  const handlePropertyChange = (value) => {
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
        <Header showProfilePic={true} />
        <View style={styles.text}>
          <Text style={styles.headerTitle}>
            {t('welcome')}, {userInfo.first_name}!
          </Text>
          <Text style={styles.description}>{t('welcomeQuestion')}</Text>
        </View>
        {!hideDropdown ? (
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
            onPress={() => console.log('TODO: redirect')}
          >
            <ImageBackground style={styles.rooms} source={KITCHEN_SOURCE}>
              <Text style={styles.roomText}>{room.label}</Text>
            </ImageBackground>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
