import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import { styles } from '../addProperty/addPropertyStyles.js';
import { Header } from '../../globalComponents/header.jsx';
import React, { useContext, useEffect, useState } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import { useLocalSearchParams } from 'expo-router';
import * as services from '../../services/fetch.js';
import AuthContext from '../../Context/AuthContext.jsx';

const EditProperty = () => {
  const params = useLocalSearchParams();
  const id = params.value;
  const { token } = useContext(AuthContext);
  const [numberPeople, setNumberPeople] = useState('');
  const [property, setProperty] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientNumber, setClientNumber] = useState('');
  const [waterMeterNum, setWaterMeterNum] = useState([]);

  const [allCompanies, setAllCompanies] = useState([]);

  const fetchDetails = async (id) => {
    try {
      const response = await services.getAllPropertyDetails(id, token);

      setNumberPeople(response.num_people.toString());
      setProperty(response.type.type);
      setCompanyName(response.client_number.water_company);
      setClientNumber(response.client_number.client_number);
      setWaterMeterNum(response.water_meters);
      console.log(waterMeterNum);
    } catch (error) {
      console.error('Error fetching property details:', error);
    }
  };

  const fetchAllCompanies = async () => {
    try {
      const response = await services.getAllCompanies(token);
      setAllCompanies(response);
    } catch (error) {
      console.log('Error fetching all available companies:', error);
    }
  };
  useEffect(() => {
    fetchDetails(id);
    fetchAllCompanies();
    console.log(waterMeterNum);
  }, []);

  const companyNames = allCompanies.map((obj) => ({
    label: obj.name,
    value: obj.name,
    key: obj.id,
  }));

  const waterMeters = waterMeterNum.map((obj) => ({
    label: obj.meter_number,
    value: obj.meter_number,
    id: obj.meter_number,
  }));

  const [errors, setErrors] = useState({});

  const handlePropertySelectedChange = (value) => {
    setProperty(value);
  };
  const handleCompanySelectedChange = (value) => {
    setCompanyName(value);
  };

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
          <Text style={styles.title}>Редактиране на имот</Text>
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
                  items={{}}
                  style={{
                    inputIOS: styles.pickerItem,
                    inputAndroid: styles.pickerItem,
                  }}
                  placeholder={{
                    label: property,
                    value: property,
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
                  items={companyNames}
                  style={{
                    inputIOS: styles.pickerItem,
                    inputAndroid: styles.pickerItem,
                  }}
                  placeholder={{
                    label: companyName,
                    value: companyName,
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

            {waterMeters.map((field) => (
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
                  value={waterMeters.value}
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

export default EditProperty;
