import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { styles } from './addPropertyStyles.js';
import { Header } from '../../globalComponents/header.jsx';
import React, { useState } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';

const AddProperty = () => {
  const [numberPeople, setNumberPeople] = useState('');
  const [property, setProperty] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientNumber, setClientNumber] = useState('');
  const [waterMeterNum, setWaterMeterNum] = useState([{ id: 1, value: '' }]);

  const [errors, setErrors] = useState({});
  const handlePropertySelectedChange = (value) => {
    setProperty(value);
    console.log(property);
  };
  const handleCompanySelectedChange = (value) => {
    setCompanyName(value);
  };

  const options = [
    { id: '1', label: 'Софийска вода' },
    { id: '2', label: 'Тест' },
    { id: '3', label: 'Дружество' },
  ];
  const propTypes = [
    { id: '1', label: 'тип 1' },
    { id: '2', label: 'тип 2' },
    { id: '3', label: 'тип 3' },
  ];
  const companyOptions = options.map((key) => ({
    label: key.label,
    value: key.label,
  }));

  const propertyOptions = propTypes.map((key) => ({
    label: key.label,
    value: key.label,
  }));

  const addWaterMeterField = () => {
    if (waterMeterNum.length >= 5) {
      return;
    }
    setWaterMeterNum([
      ...waterMeterNum,
      { id: waterMeterNum.length + 1, value: '' },
    ]);
  };

  const handleInputChange = (id, value) => {
    setWaterMeterNum(
      waterMeterNum.map((field) =>
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const validateData = () => {
    const newErrors = {};
    if (!numberPeople) newErrors.numberPeople = 'Моля, въведети брой хора';
    if (!property) newErrors.property = 'Моля, въведете имот';
    if (!companyName) newErrors.companyName = 'Моля, изберете дружество';
    if (!clientNumber) newErrors.clientNumber = 'Моля, въведет клиентски номер';
    if (!waterMeterNum)
      newErrors.waterMeterNum = 'Моля, въведете номер на водомер';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log(numberPeople);
    console.log(property);
    console.log(companyName);
    console.log(clientNumber);
    console.log(waterMeterNum);

    // POST method to be added
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false}></Header>
        <View style={styles.content}>
          <Text style={styles.title}>Добавяне на имот</Text>
          <View style={styles.form}>
            <View style={styles.numPeople}>
              <Text style={styles.text}>Брой хора в жилището</Text>
              <TextInput
                style={styles.inputNumPeople}
                onChangeText={setNumberPeople}
                value={numberPeople}
                keyboardType='numeric'
              />
            </View>
            {errors.numberPeople && (
              <Text style={styles.errorText}>{errors.numberPeople}</Text>
            )}

            <Text style={styles.text}>
              Имот
              <Text style={{ color: 'red', alignSelf: 'flex-start' }}>*</Text>
            </Text>
            <View>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={handlePropertySelectedChange}
                  items={propertyOptions}
                  style={{
                    inputIOS: styles.pickerItem,
                    inputAndroid: styles.pickerItem,
                  }}
                  placeholder={{
                    label: 'Избери имот',
                    value: '',
                  }}
                  value={property}
                />
              </View>
            </View>
            {errors.property && (
              <Text style={styles.errorText}>{errors.property}</Text>
            )}

            <Text style={styles.text}>
              Дружество
              <Text style={{ color: 'red', alignSelf: 'flex-start' }}>*</Text>
            </Text>
            <View>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={handleCompanySelectedChange}
                  items={companyOptions}
                  style={{
                    inputIOS: styles.pickerItem,
                    inputAndroid: styles.pickerItem,
                  }}
                  placeholder={{
                    label: 'Избери дружество',
                    value: '',
                  }}
                  value={companyName}
                />
              </View>
            </View>

            <Text style={styles.text}>
              Клиентски номер{' '}
              <Text style={{ color: 'red', alignSelf: 'flex-start' }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputField}
              onChangeText={setClientNumber}
              value={clientNumber}
            />
            {errors.clientNumber && (
              <Text style={styles.errorText}>{errors.clientNumber}</Text>
            )}

            {waterMeterNum.map((field) => (
              <View>
                <Text style={styles.text}>
                  Номер на водомер
                  {field.id === 1 ? (
                    <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                      *
                    </Text>
                  ) : null}
                </Text>
                <TextInput
                  key={field.id}
                  style={styles.inputField}
                  value={field.value}
                  onChangeText={(text) => handleInputChange(field.id, text)}
                />
              </View>
            ))}
            {errors.waterMeterNum && (
              <Text style={styles.errorText}>{errors.waterMeterNum}</Text>
            )}
          </View>
          <Pressable onPress={addWaterMeterField}>
            <Text style={styles.plusText}> + Добави водомер</Text>
          </Pressable>
        </View>

        <Pressable onPress={handleSubmit}>
          <LinearGradient
            style={styles.addButton}
            colors={['#388FED', '#205187']}
          >
            <Text style={styles.addText}>Добави</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProperty;
