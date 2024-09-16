import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
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
  const [property, setProperty] = useState({ id: '', type: '', image: '' });
  const [clientNumber, setClientNumber] = useState('');
  const [waterMeterNum, setWaterMeterNum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [company, setCompany] = useState('');
  const [allCompanies, setAllCompanies] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [errors, setErrors] = useState({});

  const fetchDetails = async (id) => {
    try {
      const response = await services.getAllPropertyDetails(id, token);
      setNumberPeople(response.num_people.toString());
      setProperty({
        id: response.type.id,
        type: response.type.type,
        image: response.type.image,
      });
      setSelectedCompanyId(response.client_number.water_company);
      setClientNumber(response.client_number.client_number);
      setWaterMeterNum(response.water_meters);
      setLoading(false);
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

  const fetchAllPropTypes = async () => {
    try {
      const response = await services.getAllPropertyTypes(token);
      const data = response.map((obj) => ({
        label: obj.type,
        value: obj.id,
        id: obj.id,
        image: obj.image,
      }));
      setPropertyTypes(data);
    } catch (error) {
      console.log('Error fetching property types:', error);
    }
  };

  const initializeData = async () => {
    await Promise.all([
      fetchDetails(id),
      fetchAllCompanies(),
      fetchAllPropTypes(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    if (selectedCompanyId && allCompanies.length > 0) {
      const selectedCompany = allCompanies.find(
        (company) => company.id === selectedCompanyId
      );
      if (selectedCompany) {
        setCompany(selectedCompany.name);
      }
    }
  }, [selectedCompanyId, allCompanies]);

  const companyNames = allCompanies.map((obj) => ({
    label: obj.name ?? '',
    value: obj.id ?? '',
    key: obj.id ?? '',
  }));

  const waterMeters = waterMeterNum.map((obj) => ({
    label: obj.meter_number,
    value: obj.meter_number,
    id: obj.meter_number,
  }));

  const handlePropertySelectedChange = (value) => {
    const selectedProperty = propertyTypes.find((prop) => prop.id === value);
    if (selectedProperty) {
      setProperty({
        id: selectedProperty.id,
        type: selectedProperty.label,
        image: selectedProperty.image,
      });
    }
  };

  const handleCompanySelectedChange = (value) => {
    setSelectedCompanyId(value);
  };

  const addWaterMeterField = () => {
    if (waterMeterNum.length >= 5) {
      return;
    }
    setWaterMeterNum([
      ...waterMeterNum,
      {
        id: waterMeterNum.length + 1,
        value: '',
      },
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
    if (!property.id) newErrors.property = 'Моля, изберете имот';
    if (!selectedCompanyId) newErrors.companyName = 'Моля, изберете дружество';
    if (!clientNumber)
      newErrors.clientNumber = 'Моля, въведете клиентски номер';
    if (!waterMeterNum.length)
      newErrors.waterMeterNum = 'Моля, въведете номер на водомер';
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      num_people: parseInt(numberPeople),
      type: {
        id: property.id,
        type: property.type,
        image: property.image,
      },
      client_number: {
        client_number: clientNumber,
        water_company: selectedCompanyId,
        users: [],
      },
      water_meters: [waterMeterNum],
    };
    console.log('DATA', data);

    try {
      const response = await services.editProperty(token, id, data);
      if (response.ok) {
        Alert.alert('Успешна актуализация', 'Имотът беше успешно обновен.');
      }
    } catch (error) {
      console.error('Error updating property:', error);
      Alert.alert('Грешка', 'Възникна грешка. Моля, опитайте отново.');
    }
  };

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false} resetRouter={true}></Header>
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
                  key={property.id}
                  onValueChange={handlePropertySelectedChange}
                  items={propertyTypes.map((item) => ({
                    label: item.label,
                    value: item.id,
                  }))}
                  placeholder={{
                    label: 'Изберете имот',
                    value: null,
                  }}
                  value={property.id}
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
                  key={selectedCompanyId}
                  onValueChange={handleCompanySelectedChange}
                  items={companyNames}
                  placeholder={{
                    label: 'Изберете дружество',
                    value: null,
                  }}
                  value={selectedCompanyId}
                />
              </View>
            </View>
            {errors.companyName && (
              <Text style={styles.errorText}>{errors.companyName}</Text>
            )}

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

            {waterMeters.map((obj) => (
              <View key={obj.id}>
                <Text style={styles.text}>
                  Номер на водомер
                  <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                    *
                  </Text>
                </Text>
                <TextInput
                  style={styles.inputField}
                  value={obj.value}
                  onChangeText={(text) => handleInputChange(obj.id, text)}
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
