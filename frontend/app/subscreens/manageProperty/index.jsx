import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Header } from '../../globalComponents/header.jsx';
import { styles } from './managePropertyStyles.js';
import * as services from '../../services/fetch.js';
import SettingsButton from '../../globalComponents/settingsButton.jsx';
import React, { useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext.jsx';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ManageProperty = () => {
  const [rooms, setRooms] = useState([]);

  const params = useLocalSearchParams();

  const propId = params['propertyId'];

  const router = useRouter();

  const { token } = React.useContext(AuthContext);

  const fetchPropertyRooms = async (propId) => {
    try {
      const response = await services.getPropertyRooms(propId, token);
      setRooms(
        response.map((obj) => ({
          key: obj['id'],
          label: obj['name'],
          value: obj['room_type'],
        }))
      );
    } catch (error) {
      console.error('Error fetching property rooms:', error);
    }
  };

  const handleDelete = async (token, roomId, propId) => {
    console.log(roomId, propId);
    const response = await services.deleteRoom(token, roomId, propId);
    setRooms((rooms) => rooms.filter((room) => room.key !== roomId));
  };

  useEffect(() => {
    console.log(propId);
    fetchPropertyRooms(propId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false}></Header>
        <View style={styles.content}>
          <Text style={styles.title}>Управление на апартамент</Text>

          <SettingsButton
            style={styles.settingsButton}
            title={'Добавяне на помещение'}
            screen={'subscreens/addRoom'}
            icon={'plus'}
            iconColor={'black'}
            params={propId}
          ></SettingsButton>
          {rooms.map((room) => (
            <SettingsButton
              key={room.key}
              style={styles.settingsButton}
              title={room.label}
              icon={'pencil'}
              iconColor={'#3F9FF4'}
              secondIcon={'trash'}
              secondIconColor={'black'}
              params={{ roomId: room.key }}
              onIconPress={() =>
                router.push({
                  pathname: 'subscreens/editRoom',
                  params: {
                    propertyId: params['propertyId'],
                    roomId: room.key,
                  },
                })
              }
              onSecondIconPress={() => handleDelete(token, room.key, propId)}
            ></SettingsButton>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageProperty;
