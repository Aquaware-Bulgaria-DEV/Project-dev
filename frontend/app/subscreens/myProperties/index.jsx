import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import { Header } from '../../globalComponents/header.jsx';
import * as services from '../../services/fetch.js';
import React from 'react';
import AuthContext from '../../Context/AuthContext.jsx';
import { styles } from './myPropertiesStyles.js';
import SettingsButton from '../../globalComponents/settingsButton.jsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

const MyProperties = () => {
  const { t, i18n } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = React.useContext(AuthContext);
  const router = useRouter();

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false}></Header>
        <View style={styles.content}>
          <Text style={styles.title}>{t('myProperties')}</Text>

          <SettingsButton
            style={styles.settingsButton}
            title={t('myPropertiesAdd')}
            screen={'subscreens/addProperty'}
            icon={'plus'}
            iconColor={'#131313'}
            onIconPress={() =>
              router.push({
                pathname: 'subscreens/addProperty',
              })
            }
            isInnerPressable={false}
          ></SettingsButton>

          {properties.map((property) => (
            <SettingsButton
              key={property.value}
              style={styles.settingsButton}
              title={property.label}
              screen={`subscreens/manageProperty`}
              icon={'pencil'}
              iconColor={'#3F9FF4'}
              params={{ propertyId: property.value }}
              onIconPress={() =>
                router.push({
                  pathname: 'subscreens/editProperty',
                  params: property,
                })
              }
            ></SettingsButton>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProperties;
