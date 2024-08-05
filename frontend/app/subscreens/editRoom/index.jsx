import { useEffect, useState, useContext } from 'react';
import { ScrollView, Text, View, SafeAreaView, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useLocalSearchParams } from 'expo-router';

import { styles } from '../addRoom/addRoomStyles.js';
import { Header } from '../../globalComponents/header.jsx';
import CustomButton from '../../globalComponents/customButton.jsx';
import * as services from '../../services/fetch.js';
import AuthContext from '../../Context/AuthContext.jsx';

const EditRoom = () => {
  const [roomType, setRoomType] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();

  const propertyId = params.propertyId;
  const roomId = params.roomId;
  const { token } = useContext(AuthContext);

  const fetchRoomDetails = async (propertyId, roomId) => {
    try {
      const response = await services.getRoomDetails(propertyId, roomId, token);
      setRoomType(response.room_type);
      setName(response.name);
      //end loader
    } catch (error) {
      //end loader
      console.error('Error fetching property rooms:', error);
    }
  };
  const roomTypes = [
    { id: 1, label: 'KITCHEN' },
    { id: 2, label: 'BATHROOM' },
    { id: 3, label: 'TOILET' },
    { id: 4, label: 'LAUNDRY' },
    { id: 5, label: 'GARDEN' },
    { id: 6, label: 'GARAGE' },
  ];
  const roomOptions = roomTypes.map((key) => ({
    label: key.label,
    value: key.label,
  }));

  const handleRoomTypeChange = (value) => {
    setRoomType(value);
  };

  const validateData = () => {
    const newErrors = {};
    if (!roomType) newErrors.room = 'Моля, изберете помещение';
    if (!name) newErrors.name = 'Моля, въведете име';
  };

  useEffect(() => {
    fetchRoomDetails(propertyId, roomId);
  }, [propertyId, roomId]);

  const handleSubmit = () => {
    console.log(name);
    console.log(roomType);
    // POST method to be added
  };

  /**
   * if(loading){
   * return Loader
   * }
   *
   */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false}></Header>
        <View style={styles.content}>
          <Text style={styles.title}>Редактиране на помещение</Text>
          <View style={styles.form}>
            <Text style={styles.text}>Вид помещение</Text>
            <View style={{ marginVertical: 5 }}>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={handleRoomTypeChange}
                  items={roomOptions}
                  style={{
                    inputIOS: styles.pickerItem,
                    inputAndroid: styles.pickerItem,
                  }}
                  itemKey={roomId}
                  value={roomType} //this should be fixed because it does not work
                />
              </View>
            </View>
            <Text style={styles.text}>
              Име
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
          title='Запази'
          color={'#388FED'}
          secondColor={'#4C62C7'}
          additionalStyles={styles.saveButton}
          additionalTextStyle={styles.buttonText}
        ></CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditRoom;
