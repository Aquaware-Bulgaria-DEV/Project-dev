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
import { useTranslation } from 'react-i18next';

const AddProperty = () => {
  const { t, i18n } = useTranslation();
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
    { id: '1', label: `${t('addPropertyType1')}` },
    { id: '2', label: `${t('addPropertyType2')}` },
    { id: '3', label: `${t('addPropertyType3')}` },
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
    if (!numberPeople) newErrors.numberPeople = `${t('addPropertyErrorNumOfPeople')}`;
    if (!property) newErrors.property = `${t('addPropertyErrorProperty')}`;
    if (!companyName) newErrors.companyName = `${t('addPropertyErrorCompanyName')}`;
    if (!clientNumber) newErrors.clientNumber = `${t('addPropertyErrorClientNum')}`;
    if (!waterMeterNum)
      newErrors.waterMeterNum = `${t('addPropertyErrorWaterMeterNum')}`;
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
          <Text style={styles.title}>{t('addProperty')}</Text>
          <View style={styles.form}>
            <View style={styles.numPeople}>
              <Text style={styles.text}>{t('addPropertyNumOfPeople')}</Text>
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
              <View>
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
            <Text style={styles.plusText}>{t('addPropertyAddNewWaterMeter')}</Text>
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
    </SafeAreaView>
  );
};

export default AddProperty;
