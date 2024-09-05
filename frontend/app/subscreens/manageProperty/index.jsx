import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Header } from '../../globalComponents/header.jsx';
import { styles } from './managePropertyStyles.js';
import * as services from '../../services/fetch.js';
import SettingsButton from '../../globalComponents/settingsButton.jsx';
import React, { useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext.jsx';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomModal from '../../globalComponents/CustomModal.jsx';
import { useTranslation } from 'react-i18next';

const ManageProperty = () => {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

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

  const confirmDeleteRoom = async () => {
    if (roomToDelete) {
      try {
        const response = await services.deleteRoom(token, roomToDelete, propId);
        setRooms((rooms) => rooms.filter((room) => room.key !== roomToDelete));
        setRoomToDelete(null);
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
    setModalVisible(false);
  };

  useEffect(() => {
    fetchPropertyRooms(propId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false} />
        <View style={styles.content}>
          <Text style={styles.title}>{t("propertyManagement")}</Text>

          <SettingsButton
            style={styles.settingsButton}
            title={t("addRoom")}
            screen={'subscreens/addRoom'}
            icon={'plus'}
            iconColor={'black'}
            params={propId}
            onIconPress={() =>
              router.push({
                pathname: 'subscreens/addRoom',
              })
            }
            isInnerPressable={false}
          />
          {rooms.map((room) => (
            <SettingsButton
              key={room.key}
              style={styles.settingsButton}
              title={room.label}
              screen={'subscreens/editRoom'}
              icon={'pencil'}
              iconColor={'#3F9FF4'}
              secondIcon={'trash'}
              secondIconColor={'black'}
              params={{ propertyId: params['propertyId'], roomId: room.key }}
              onIconPress={() =>
                router.push({
                  pathname: 'subscreens/editRoom',
                  params: {
                    propertyId: params['propertyId'],
                    roomId: room.key,
                  },
                })
              }
              isInnerPressable={false}
              onSecondIconPress={() => {
                setRoomToDelete(room.key);
                setModalVisible(true);
              }}
            />
          ))}
        </View>
        <CustomModal
          isVisible={modalVisible}
          setIsVisible={setModalVisible}
          questionTxt={t("propertyManagementDeletionAssertion")}
          actionHandler={confirmDeleteRoom}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageProperty;
