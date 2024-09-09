import { ScrollView, Text, View, SafeAreaView, TextInput } from 'react-native';
import { Header } from '../../globalComponents/header.jsx';
import { styles } from './addRoomStyles.js';
import { useState, useContext } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import AuthContext from '../../Context/AuthContext.jsx';
import CustomButton from '../../globalComponents/customButton.jsx';
import * as services from '../../services/fetch.js';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

const AddRoom = () => {
  const { t } = useTranslation();
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const params = useLocalSearchParams();
  const propId = params[0];

  const router = useRouter();

  const { token } = useContext(AuthContext);

  const roomTypes = [
    { id: 1, label: t('addRoomTypeKitchen'), value: 'KITCHEN' },
    { id: 2, label: t('addRoomTypeBathroom'), value: 'BATHROOM' },
    { id: 3, label: t('addRoomTypeToilet'), value: 'TOILET' },
    { id: 4, label: t('addRoomTypeLaundry'), value: 'LAUNDRY' },
    { id: 5, label: t('addRoomTypeGarden'), value: 'GARDER' },
    { id: 6, label: t('addRoomTypeGarage'), value: 'GARAGE' },
  ];
  const roomOptions = roomTypes.map((key) => ({
    label: key.label,
    value: key.value,
    id: key.id,
  }));

  const handleRoomSelection = (value) => {
    setRoom(value);
    console.log(value, 'room type');
  };

  const validateData = () => {
    const newErrors = {};
    if (!room) newErrors.room = `${t('addRoomChooseRoomError')}`;
    if (!name) newErrors.name = `${t('addRoomRoomNameError')}`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (token, propId, { name, room_type: room }) => {
    console.log('Room to be submitted:', room);
    if (!validateData()) return;
    try {
      const response = await services.createARoom(token, propId, {
        name,
        room_type: room,
      });
      console.log(response);

      if (response) {
        router.push({
          pathname: 'subscreens/manageProperty',
          params: { propertyId: propId },
        });
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false}></Header>
        <View style={styles.content}>
          <Text style={styles.title}>{t('addRoom')}</Text>
          <View style={styles.form}>
            <Text style={styles.text}>
              {t('addRoomType')}
              <Text style={{ color: 'red', alignSelf: 'flex-start' }}>*</Text>
            </Text>
            <View style={{ marginVertical: 5 }}>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={(room) => handleRoomSelection(room)} //to check if needed
                  items={roomOptions}
                  style={{
                    inputIOS: styles.pickerItem,
                    inputAndroid: styles.pickerItem,
                  }}
                  placeholder={{
                    label: `${t('addRoomPickARoom')}`,
                    value: '',
                  }}
                  value={room}
                />
              </View>
            </View>
            <Text style={styles.text}>{t('addRoomName')}</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={setName}
              value={name}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
        </View>
        <CustomButton
          handlePress={() =>
            handleSubmit(token, propId, { name, room_type: room })
          }
          title={t('customButtonSave')}
          color={'#388FED'}
          secondColor={'#4C62C7'}
          additionalStyles={styles.saveButton}
          additionalTextStyle={styles.buttonText}
        ></CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddRoom;
