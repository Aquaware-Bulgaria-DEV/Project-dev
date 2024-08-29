import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
// Import RNPickerSelect
import RNPickerSelect from 'react-native-picker-select';

import { Header } from '../../globalComponents/header.jsx';
import AuthContext from '../../Context/AuthContext';

import CustomButton from '../../globalComponents/customButton.jsx';

import { styles } from './troubleshootStyles.js'
import { addReport } from '../../services/fetch.js';

import DefaultAvatar from "../../../assets/defaultAvatar.png"
import { useTranslation } from 'react-i18next';

const FormField = ({
  inputName,
  additionalStyles,
  additionalInputStyles,
  value,
  type,
  onFormChange,
  formValues,
  setFormValues,
  multiline,
}) => {
  const handleChange = (name, value) => {
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
    onFormChange(updatedValues);
  };

  return (
    <View style={[{ flex: 1, gap: 10 }, additionalStyles]}>
      <Text style={{ fontSize: 14, paddingLeft: 20, opacity: 0.3 }}>
        {inputName}
      </Text>
      {multiline ? (
        <TextInput
          onChangeText={(text) => handleChange(type, text)}
          value={formValues[type]}
          placeholder='...'
          multiline
          style={[
            {
              justifyContent: 'center',
              height: 50,
              fontSize: 16,
              paddingLeft: 20,
              paddingRight: 20,
              opacity: 0.75,
              backgroundColor: '#F9F9F9',
              borderBottomWidth: 1,
              borderBottomColor: '#DADADA',
              borderRadius: 5,
            },
            additionalInputStyles,
          ]}
        />
      ) : (
        <TextInput
          onChangeText={(text) => handleChange(type, text)}
          value={formValues[type]}
          placeholder='...'
          style={[
            {
              justifyContent: 'center',
              height: 50,
              fontSize: 16,
              paddingLeft: 20,
              paddingRight: 20,
              opacity: 0.75,
              backgroundColor: '#F9F9F9',
              borderBottomWidth: 1,
              borderBottomColor: '#DADADA',
              borderRadius: 5,
            },
            additionalInputStyles,
          ]}
        />
      )}
    </View>
  );
};

const Troubleshoot = () => {
  const { t, i18n } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const timeoutRef = useRef(null);
  const { width, height } = Dimensions.get('window');
  const [opacity, setOpacity] = useState(1);
  const [error, setError] = useState('');
  const [formValues, setFormValues] = useState({
    issue: '',
    address: '',
    water_company_id: 1,
    content: '',
  });
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { token, userInfo, } = React.useContext(AuthContext);

  React.useEffect(() => {
    const tabBarVisible = isFocused ? 'none' : 'flex';
    navigation.setOptions({
      tabBarStyle: { display: tabBarVisible },
    });
  }, [isFocused, navigation]);

  React.useEffect(() => {
    if (error !== '') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [error]);

  const handleFormChange = (newValues) => {
    if (
      formValues.address !== '' &&
      formValues.address !== '' &&
      formValues.issue !== ''
    ) {
      setError('');
    }

    setFormValues(newValues);
  };

  const onPressHandler = async () => {
    if (
      value === '' ||
      formValues.address === '' ||
      formValues.content === ''
    ) {
      setError(`${t('errorFieldNotFilled')}`);
    } else {
      await addReport(setError, token, formValues)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ minHeight: height }}
        alwaysBounceVertical={false}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={height}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Header />
          <View style={styles.reqContainer}>
            <Text style={styles.screenLabel}>{t('troubleshoot')}</Text>
            <View style={styles.innerContainer}>
              <View style={styles.credentials}>
                <Image
                  style={styles.avatar}
                  source={userInfo.profile_picture ? { uri: userInfo.profile_picture } : DefaultAvatar}
                />
                <View style={styles.clientInfo}>
                  <Text
                    style={styles.clientName}
                  >{`${userInfo.first_name} ${userInfo.last_name}`}</Text>
                  <Text style={styles.clientNumber}>
                    {t('myProfileClientNumber')} 119862
                  </Text>
                </View>
              </View>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={(itemValue) => {
                    formValues.issue = itemValue;
                    setValue(itemValue);

                    if (
                      formValues.issue !== '' &&
                      formValues.address !== '' &&
                      formValues.content !== ''
                    ) {
                      setError('');
                    }
                  }}
                  value={value}
                  items={[
                    { label: t('pickTroubleshootTypeLeakage'), value: 'leakage' },
                    { label: t('pickTroubleshootTypeBreakdown'), value: 'breakdown' },
                    { label: t('pickTroubleshootTypeWaterTheft'), value: 'theft' },
                  ]}
                  placeholder={{ label: t('pickTroubleshootType'), value: '' }}
                  style={styles.picker}
                />
              </View>
              <FormField
                inputName={t('address')}
                type={'address'}
                additionalStyles={{ marginTop: 10 }}
                onFormChange={handleFormChange}
                formValues={formValues}
                setFormValues={setFormValues}
              />
              <FormField
                inputName={t('message')}
                type={'content'}
                additionalStyles={{ marginTop: 10 }}
                onFormChange={handleFormChange}
                formValues={formValues}
                setFormValues={setFormValues}
                multiline={true}
                additionalInputStyles={{ height: 70 }}
              />
              <Text style={styles.errorcontent}>{error}</Text>
              <CustomButton
                title={t('buttonSend')}
                isLoading={isLoading}
                handlePress={onPressHandler}
                additionalStyles={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 64,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.5,
                  shadowRadius: 7.3,
                  elevation: 4,
                }}
                additionalTextStyle={{ fontSize: 18 }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Troubleshoot;
