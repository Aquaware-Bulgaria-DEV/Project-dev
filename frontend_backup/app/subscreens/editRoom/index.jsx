import { useEffect, useState, useContext } from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { styles } from '../addRoom/addRoomStyles.js';
import { Header } from '../../globalComponents/header.jsx';
import CustomButton from '../../globalComponents/customButton.jsx';
import * as services from '../../services/fetch.js';
import AuthContext from '../../Context/AuthContext.jsx';
import { useTranslation } from 'react-i18next';

const EditRoom = () => {
  const { t } = useTranslation();
  const [roomType, setRoomType] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const router = useRouter();

  const propertyId = params.propertyId;
  const roomId = params.roomId;
  const { token } = useContext(AuthContext);

  const fetchRoomDetails = async (propertyId, roomId) => {
    try {
      const response = await services.getRoomDetails(propertyId, roomId, token);
      setRoomType(response.room_type);
      setName(response.name);
      console.log(roomType);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching property rooms:', error);
      setLoading(false);
    }
  };

  const roomTypes = [
    { id: 1, label: t('addRoomTypeKitchen'), value: 'KITCHEN' },
    { id: 2, label: t('addRoomTypeBathroom'), value: 'KITCHEN' },
    { id: 3, label: t('addRoomTypeToilet'), value: 'TOILET' },
    { id: 4, label: t('addRoomTypeLaundry'), value: 'LAUNDRY' },
    { id: 5, label: t('addRoomTypeGarden'), value: 'GARDEN' },
    { id: 6, label: t('addRoomTypeGarage'), value: 'GARAGE' },
  ];

  const roomOptions = roomTypes.map((key) => ({
    label: key.label,
    value: key.value,
  }));

  const handleRoomTypeChange = (value) => {
    setRoomType(value);
  };

  const validateData = () => {
    const newErrors = {};
    if (!roomType) newErrors.roomType = `${t('addRoomChooseRoomError')}`;
    if (!name) newErrors.name = `${t('addRoomRoomNameError')}`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    fetchRoomDetails(propertyId, roomId);
  }, [propertyId, roomId]);

  const handleSubmit = async () => {
    if (!validateData()) return;

    try {
      await services.updateRoomDetails(propertyId, roomId, token, {
        name: name,
        room_type: roomType,
      });
      router.push({
        pathname: 'subscreens/manageProperty',
        params: { propertyId: propertyId },
      });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
        <ActivityIndicator size='large' color='#0000ff' />
    );
  }

  return (
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false} resetRouter={true}></Header>
        <View style={styles.content}>
          <Text style={styles.title}>{t('editRoom')}</Text>
          <View style={styles.form}>
            <Text style={styles.text}>{t('addRoomType')}</Text>
            <View style={{ marginVertical: 5 }}>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={handleRoomTypeChange}
                  items={roomOptions}
                  style={{
                    inputIOS: styles.pickerItem,
                    inputAndroid: styles.pickerItem,
                  }}
                  value={roomType}
                />
              </View>
            </View>
            {errors.roomType && (
              <Text style={styles.errorText}>{errors.roomType}</Text>
            )}
            <Text style={styles.text}>
              {t('addRoomName')}
              <Text style={{ color: 'red', alignSelf: 'flex-start' }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputField}
              onChangeText={setName}
              value={name}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
        </View>
        <CustomButton
          handlePress={handleSubmit}
          title={t('customButtonSave')}
          color={'#388FED'}
          secondColor={'#4C62C7'}
          additionalStyles={styles.saveButton}
          additionalTextStyle={styles.buttonText}
        />
      </ScrollView>
  );
};

export default EditRoom;
