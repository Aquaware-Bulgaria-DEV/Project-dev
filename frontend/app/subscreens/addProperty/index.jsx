import {
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { styles } from './addPropertyStyles.js';
import { Header } from '../../globalComponents/header.jsx';
import React, { useEffect, useState, useContext } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';

import * as services from '../../services/fetch.js';
import AuthContext from '../../Context/AuthContext.jsx';
import { useRouter } from 'expo-router';

const AddProperty = () => {
  const { t, i18n } = useTranslation();
  const [numberPeople, setNumberPeople] = useState();
  const [property, setProperty] = useState();
  const [companyName, setCompanyName] = useState();
  const [clientNumber, setClientNumber] = useState('');
  const [waterMeterNum, setWaterMeterNum] = useState([{ id: 1, value: '' }]);

  const [options, setOptions] = useState([]);
  const [propTypes, setPropTypes] = useState([]);
  const { token, userInfo } = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const router = useRouter();
  const handlePropertySelectedChange = (value) => {
    setProperty(value);
    console.log(property);
  };
  const handleCompanySelectedChange = (value) => {
    setCompanyName(value);
  };

  const fetchAllCompanies = async () => {
    try {
      const response = await services.getAllCompanies(token);
      setOptions(response);
    } catch (error) {
      console.log('Error fetching all available companies:', error);
    }
  };

  const fetchAllPropTypes = async () => {
    try {
      const response = await services.getAllPropertyTypes(token);
      setPropTypes(response);
    } catch (error) {
      console.log('Error fetching prop types:', error);
    }
  };

  useEffect(() => {
    fetchAllCompanies();
    fetchAllPropTypes();
  }, []);

  const companyOptions = options.map((option) => ({
    label: option.name,
    value: option.id,
  }));

  const propertyOptions = propTypes.map((type) => ({
    label: type.type,
    value: type.id,
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

    if (!numberPeople) {
      newErrors.numberPeople = `${t('addPropertyErrorNumOfPeople')}`;
    } else if (numberPeople < 1 || numberPeople > 20) {
      newErrors.numberPeople = 'Стойността може да бъде между 1 и 20';
    }

    if (!property) {
      newErrors.property = `${t('addPropertyErrorProperty')}`;
    }

    if (!companyName) {
      newErrors.companyName = `${t('addPropertyErrorCompanyName')}`;
    }

    if (!clientNumber) {
      newErrors.clientNumber = `${t('addPropertyErrorClientNum')}`;
    }
    const emptyWaterMeters = waterMeterNum.some((field) => !field.value.trim());
    if (emptyWaterMeters) {
      newErrors.waterMeterNum = `${t('addPropertyErrorWaterMeterNum')}`;
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateData();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const waterMeterValues = waterMeterNum.map((field) => field.value.trim());
      console.log(waterMeterNum);
      const data = {
        type: {
          id: property,
        },
        water_company: {
          id: companyName,
        },
        client_number: {
          client_number: clientNumber,
        },
        property: {
          num_people: Number(numberPeople),
        },
        water_meters: waterMeterValues,
      };
      console.log('dadta', data);
      const response = await services.createProperty(token, data);
      console.log('Property created successfully:', response);
      Alert.alert(`${t('addPropertySuccessful')}`);
      router.push('subscreens/myProperties');
    } catch (error) {
      console.log('Error creating property:', error);
    }
  };

  return (
    <ScrollView style={styles.scrollViewContent}>
      <Header showProfilePic={false} resetRouter={true}></Header>
      <View style={styles.content}>
        <Text style={styles.title}>{t('addProperty')}</Text>
        <View style={styles.form}>
          <View style={styles.numPeople}>
            <Text style={styles.text}>{t('addPropertyNumOfPeople')}</Text>
            <TextInput
              style={styles.inputNumPeople}
              onChangeText={(value) => {
                const formattedValue = value.replace(/[^0-9]/g, '');
                if (
                  formattedValue === '' ||
                  (parseInt(formattedValue, 10) >= 1 &&
                    parseInt(formattedValue, 10) <= 20)
                ) {
                  setNumberPeople(formattedValue);
                }
              }}
              value={numberPeople}
              keyboardType='numeric'
            />
          </View>
          {errors.numberPeople && (
            <Text style={styles.errorText}>{errors.numberPeople}</Text>
          )}

          <Text style={styles.text}>
            {t('addPropertyProp')}
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
                  label: `${t('addPropertyChoose')}`,
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
            {t('addPropertyCompany')}
            <Text style={{ color: 'red', alignSelf: 'flex-start' }}>*</Text>
          </Text>
          <View>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                key={options.id}
                onValueChange={handleCompanySelectedChange}
                items={companyOptions}
                style={{
                  inputIOS: styles.pickerItem,
                  inputAndroid: styles.pickerItem,
                }}
                placeholder={{
                  label: `${t('addPropertyChooseCompany')}`,
                  value: '',
                }}
                value={companyName}
              />
            </View>
          </View>

          <Text style={styles.text}>
            {t('addPropertyClientNum')}{' '}
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
            <View key={field.id}>
              <Text style={styles.text}>
                {t('addPropertyWaterMeterNum')}
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
          <Text style={styles.plusText}>
            {t('addPropertyAddNewWaterMeter')}
          </Text>
        </Pressable>
      </View>

      <Pressable onPress={handleSubmit}>
        <LinearGradient
          style={styles.addButton}
          colors={['#388FED', '#205187']}
        >
          <Text style={styles.addText}>{t('addPropertyButton')}</Text>
        </LinearGradient>
      </Pressable>
    </ScrollView>
  );
};

export default AddProperty;
