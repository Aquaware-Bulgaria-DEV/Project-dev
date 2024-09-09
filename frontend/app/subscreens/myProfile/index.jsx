import { useState, useEffect, useContext } from 'react';

import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { parseISO, format } from 'date-fns';

import AuthContext from '../../Context/AuthContext.jsx';
import CustomButton from '../../globalComponents/customButton.jsx';
import { Header } from '../../globalComponents/header.jsx';
import getIcon from '../../../utils/icons.js';
import { styles } from './myProfileStyles.js';
import { useTranslation } from 'react-i18next';
import * as service from '../../services/fetch.js';
import { useRouter } from 'expo-router';

const { height } = Dimensions.get('window');

const MyProfile = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [picture, setPicture] = useState(null);
  const [opacity, setOpacity] = useState(1);

  const router = useRouter();
  const { userInfo, token, saveUserInfo } = useContext(AuthContext);
  const { control } = useForm();

  const pencil = getIcon('pencil', 'white', 13);

  useEffect(() => {
    if (!userInfo.first_name && !userInfo.last_name) {
      setName('');
    } else if (userInfo.last_name === 'undefined') {
      setName(userInfo.first_name);
    } else {
      setName(`${userInfo.first_name} ${userInfo.last_name}`);
    }
    console.log(userInfo);
    setPhone(userInfo.phone_number || '');
    setEmail(userInfo.email || '');
    setPicture(userInfo.profile_picture || null);
    if (userInfo.date_joined) {
      const formattedDate = format(
        parseISO(userInfo.date_joined),
        'dd.MM.yyyy'
      );
      setDate(formattedDate);
    }
  }, [userInfo]);

  const handleRemove = () => {
    Alert.alert(
      `${t('alertDeleteProfile')}`,
      `${t('alertDeleteProfileAssert')}`,
      [
        {
          text: `${t('alertDeleteProfileNo')}`,
          onPress: () => console.log('Премахване'),
          style: 'cancel',
        },
        {
          text: `${t('alertDeleteProfileYes')}`,
          onPress: () => {
            Alert.prompt(
              `${t('alertDeleteProfileTypeYourPassword')}`,
              `${t('alertDeleteProfileTypeYourPasswordForConfirmation')}`,
              [
                {
                  text: `${t('alertDeleteProfileCancel')}`,
                  onPress: () => console.log('Изтриване отказано'),
                  style: 'cancel',
                },
                {
                  text: `${t('alertDeleteProfileConfirm')}`,
                  onPress: (password) => {
                    console.log('Изтриване с парола:', password);
                    //TODO: add verification logic
                  },
                },
              ],
              'secure-text'
            );
          },
        },
      ]
    );
  };

  const dataSubmissionHandler = async () => {
    const profileData = {
      first_name: name.split(' ')[0],
      last_name: name.split(' ')[1],
      phone_number: phone,
      email: email,
    };

    try {
      const { data, response } = await service.updateProfile(
        profileData,
        picture,
        token
      );

      if (response.ok) {
        console.log('Profile updated successfully:', data);
        saveUserInfo(data);
        Alert.alert('Профилът Ви бе успешно променен.');

        router.push('home');
      } else {
        Alert.alert('Неуспешна промяна. Моля, опитайте отново.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Неуспешна промяна. Моля, опитайте отново.');
    }
  };

  const changePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      setPicture(localUri); // Update the picture state
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={height}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Header showProfilePic={false}></Header>
          <View style={styles.content}>
            <Text style={styles.screenLabel}>{t('myProfile')}</Text>
            <Text style={styles.otherDetails}>
              {t('myProfileActiveFrom')} {date}
            </Text>
            <Text style={styles.otherDetails}>
              {t('myProfileClientOf')} Софийска вода
            </Text>
          </View>

          <View style={styles.reqContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.credentials}>
                <View style={styles.imageContainer}>
                  <Image style={styles.avatar} source={{ uri: picture }} />
                  <Pressable style={styles.editIcon} onPress={changePicture}>
                    <Text>{pencil}</Text>
                  </Pressable>
                </View>
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>
                    {name === undefined ? `` : `${name}`}
                  </Text>
                  <Text style={styles.clientNumber}>
                    {t('myProfileClientNumber')} 119862
                  </Text>
                  <TouchableOpacity
                    onPressIn={() => setOpacity(0.7)}
                    onPressOut={() => setOpacity(1)}
                    onPress={handleRemove}
                  >
                    <Text style={[styles.removeBtn, { opacity }]}>
                      {t('myProfileRemove')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.form}>
                <Text style={styles.inputFieldName}>{t('myProfileName')}</Text>

                <Controller
                  control={control}
                  name='name'
                  render={({ field: { onChange } }) => (
                    <TextInput
                      style={styles.inputField}
                      onChangeText={(text) => {
                        onChange(text);
                        setName(text);
                      }}
                      value={name}
                    />
                  )}
                />

                <Text style={styles.inputFieldName}>{t('myProfilePhone')}</Text>

                <Controller
                  control={control}
                  name='phone'
                  render={({ field: { onChange } }) => (
                    <TextInput
                      style={styles.inputField}
                      onChangeText={(text) => {
                        onChange(text);
                        setPhone(text);
                      }}
                      keyboardType='phone-pad'
                      value={phone}
                    />
                  )}
                />
                <Text style={styles.inputFieldName}>{t('myProfileEmail')}</Text>

                <TextInput
                  name='email'
                  style={styles.inputField}
                  value={email}
                  readOnly
                  keyboardType='email-address'
                />

                <CustomButton
                  handlePress={dataSubmissionHandler}
                  title={t('customButtonSave')}
                  color={'#388FED'}
                  secondColor={'#4C62C7'}
                  additionalStyles={styles.saveButton}
                  additionalTextStyle={styles.buttonText}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;
