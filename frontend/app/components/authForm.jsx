import { styles } from './authFormStyles';

import { View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { CustomText } from './CustomText/customText.jsx';
import globalStyles from '../globalStyles';
import CustomButton from './customButton';

import GooglePath from '../../assets/authSvg/google.png';
import FacebookPath from '../../assets/authSvg/facebook.png';

const FormField = ({
  title,
  value,
  placeholder,
  onFormChange,
  formValues,
  setFormValues,
  type,
  ...props
}) => {
  const handleChange = (name, value) => {
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
    onFormChange(updatedValues);
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.inputName}>{title}</CustomText>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          value={formValues[type]}
          onChangeText={(text) => handleChange(type, text)}
          secureTextEntry={title === 'Парола' || 'Password' ? true : false}
        ></TextInput>
      </View>
    </View>
  );
};

const AuthForm = ({
  title,
  value,
  placeholder,
  onFormChange,
  onLogin,
  googleAuth,
  facebookAuth,
  isReg,
  onRegister,
  errorMessage,
  ...props
}) => {
  // let errorMsg = 'Error Message Example';
  const [formValues, setFormValues] = React.useState({
    // name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  useEffect(() => {
    isReg
      ? null
      : setFormValues((prev) => (prev = { email: '', password: '' }));
  }, []);

  return (
    <>
      {/* {isReg && <FormField title={"Име"} type={'name'} onFormChange={onFormChange} formValues={formValues} setFormValues={setFormValues} />} */}
      <FormField
        title={'Е-Поща'}
        type={'email'}
        onFormChange={onFormChange}
        formValues={formValues}
        setFormValues={setFormValues}
      />
      <FormField
        title={'Парола'}
        type={'password'}
        onFormChange={onFormChange}
        formValues={formValues}
        setFormValues={setFormValues}
      />
      {isReg && (
        <FormField
          title={'Повтори парола'}
          type={'repeatPassword'}
          onFormChange={onFormChange}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      )}
      <CustomText style={styles.errorMsg}>{errorMessage}</CustomText>
      {isReg ? (
        <CustomButton
          title={'Създай'}
          additionalStyles={{ marginTop: 15 }}
          handlePress={onRegister}
        />
      ) : (
        <CustomButton
          title={'Влез'}
          additionalStyles={{ marginTop: 15 }}
          handlePress={onLogin}
        />
      )}
      <CustomText
        style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' }}
      >
        или
      </CustomText>
      <View style={styles.thirdPartyAuthBox}>
        <CustomButton
          title={'Влез с Google'}
          handlePress={googleAuth}
          additionalStyles={{
            width: '35%',
            padding: 5,
            // borderRadius: 30,
            backgroundColor: '#FFF',
            borderColor: globalStyles.primaryColor,
            borderWidth: 1,
          }}
          imagePath={GooglePath}
        />
        <CustomButton
          title={'Влез с Facebook'}
          handlePress={facebookAuth}
          additionalStyles={{
            width: '35%',
            padding: 5,
            // borderRadius: 30,
            backgroundColor: '#FFF',
            borderColor: globalStyles.primaryColor,
            borderWidth: 1,
          }}
          imagePath={FacebookPath}
        />
      </View>
      {!isReg && (
        <>
          <View>
            <TouchableOpacity>
              <CustomText style={styles.link}>
                Забравихте си паролата?{' '}
                <CustomText
                  onPress={() => console.log('Change Password')}
                  style={styles.linkBold}
                >
                  Смени парола.
                </CustomText>
              </CustomText>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <CustomText style={styles.link}>
                Нямате профил?{' '}
                <CustomText
                  onPress={() => router.push('signUp')}
                  style={styles.linkBold}
                >
                  Създай профил.
                </CustomText>
              </CustomText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default AuthForm;
