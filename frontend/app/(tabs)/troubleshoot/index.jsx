import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
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
import getIcon from '../../../utils/icons.js';

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
  isEditable
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
          editable={isEditable}
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
          editable={isEditable}
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
  const [ newFormOpacity, setNewFormOpacity ]  = useState(1);
  const [ showNewFormBtn, setShowNewBtn  ]  = useState(false);
  const [error, setError] = useState('');
  const [formValues, setFormValues] = useState({
    issue: '',
    address: '',
    water_company_id: 1,
    content: '',
  });
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ buttonTitle, setButtonTitle ] = useState(t("buttonSend"));
  const [ isEditable, setIsEditable ] = useState(true);
  const [ isDisabled, setIsDisabled ] = useState(false);

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

  useEffect(() => {
    setButtonTitle(t('buttonSend')); // Update the button title based on the current language
  }, [i18n.language, t]);

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
      addReport(token, formValues)
      .then(res => {
        setButtonTitle(t('buttonSent'))
        setShowNewBtn(true);
        setError('');
        setIsEditable(false);
        setIsDisabled(true);
        setIsLoading(true);
      })
      .catch(e => setError(e));
    }
  };

  const handleNewForm = () => {
    // Reset formValues to their initial state
    setFormValues({
      issue: '',
      address: '',
      water_company_id: 1,
      content: '',
    });
    setValue(''); // Reset the picker select value
    setIsEditable(true); // Let typing in the fields
    setIsDisabled(false);
    setButtonTitle(t("buttonSend")); // Reset the button title
    setShowNewBtn(false); // Hide the New Form button after resetting
    setIsLoading(false);
  };

  return (
      <ScrollView
        style={styles.container}
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
                  source={userInfo?.profile_picture ? { uri: userInfo?.profile_picture } : DefaultAvatar}
                />
                <View style={styles.clientInfo}>
                  <Text
                    style={styles.clientName}
                  >{`${userInfo?.first_name} ${userInfo?.last_name}`}</Text>
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
                  disabled={isDisabled}
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
                isEditable={isEditable}
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
                isEditable={isEditable}
                additionalInputStyles={{ height: 70 }}
              />
              <Text style={styles.errorcontent}>{error}</Text>
              {showNewFormBtn && (
                  <TouchableOpacity
                  style={[styles.button, { newFormOpacity }]}
                  onPressIn={() => setNewFormOpacity(0.5)}
                  onPressOut={() => setNewFormOpacity(1)}
                  onPress={handleNewForm}
                  >
                <Text style={styles.buttonText}>{t('buttonNewFrom')}</Text>
                    <Text style={styles.buttonText}>{getIcon("refresh", "green", 40)}</Text>
                  </TouchableOpacity>
              )}
              <CustomButton
                title={buttonTitle}
                isLoading={isLoading}
                handlePress={onPressHandler}
                additionalStyles={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 64,
                  borderRadius: 20,
                  padding: 0,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.5,
                  shadowRadius: 7.3,
                  elevation: 4,
                }}
                color={"#388FED"}
                secondColor={"#205187"}
                additionalTextStyle={{ fontSize: 18 }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
  );
};

export default Troubleshoot;
