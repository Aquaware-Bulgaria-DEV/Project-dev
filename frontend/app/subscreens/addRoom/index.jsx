import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import { Header } from '../../globalComponents/header.jsx';
import { styles } from './addRoomStyles.js';
import { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../globalComponents/customButton.jsx';
const AddRoom = () => {
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const roomTypes = [
    { id: '1', label: 'тип 1' },
    { id: '2', label: 'тип 2' },
    { id: '3', label: 'тип 3' },
  ];
  const roomOptions = roomTypes.map((key) => ({
    label: key.label,
    value: key.label,
  }));

  const handleRoomChange = (value) => {
    setRoom(value);
  };

  const validateData = () => {
    const newErrors = {};
    if (!room) newErrors.room = 'Моля, изберете помещение';
    if (!name) newErrors.name = 'Моля, въведете име';
  };

  const handleSubmit = () => {
    console.log(name);
    console.log(room);
    // POST method to be added
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false}></Header>
        <View style={styles.content}>
          <Text style={styles.title}>Добавяне на помещение</Text>
          <View style={styles.form}>
            <Text style={styles.text}>Вид помещение</Text>
            <View style={{ marginVertical: 5 }}>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={handleRoomChange}
                  items={roomOptions}
                  style={{
                    inputIOS: styles.pickerItem,
                    inputAndroid: styles.pickerItem,
                  }}
                  placeholder={{
                    label: 'Избери вид помещение',
                    value: '',
                  }}
                  value={room}
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

export default AddRoom;
