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
  Modal,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { parseISO, format } from 'date-fns';
import RNPickerSelect from 'react-native-picker-select';
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
  const [city, setCity] = useState('');
  const [validData, setValidData] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  const cities = [
    { id: 1, town: 'Sofia', label: 'Sofia' },
    { id: 2, town: 'Plovdiv', label: 'Plovdiv' },
    { id: 3, town: 'Blagoevgrad', label: 'Blagoevgrad' },
    { id: 4, town: 'Burgas', label: 'Burgas' },
    { id: 5, town: 'Varna', label: 'Varna' },
    { id: 6, town: 'Stara Zagora', label: 'Stara Zagora' },
  ];

  const cityOptions = cities.map((city) => ({
    label: city.label,
    value: city.town,
    id: city.id,
  }));

  const router = useRouter();
  const { userInfo, token, saveUserInfo } = useContext(AuthContext);
  const { control } = useForm();

  // useEffect(() => {
  //   if (userInfo) {
  //     const firstName = userInfo.first_name || '';
  //     const lastName = userInfo.last_name || '';
  //     setName(`${firstName} ${lastName}`.trim());
  //     setCity(userInfo.city || '');
  //     setPhone(userInfo.phone_number || '');
  //     setEmail(userInfo.email || '');
  //     setPicture(userInfo.profile_picture || null);
  //     if (userInfo.date_joined) {
  //       setDate(format(parseISO(userInfo.date_joined), 'dd.MM.yyyy'));
  //     }
  //   }
  // }, [userInfo]);
  useEffect(() => {
    if (userInfo) {
      if (!userInfo.first_name && !userInfo.last_name) {
        setName('');
      } else if (userInfo.last_name == 'undefined') {
        setName(userInfo.first_name || '');
      } else if (userInfo.first_name && userInfo.last_name) {
        setName(`${userInfo.first_name} ${userInfo.last_name ?? ''}`);
      }
      setCity(userInfo.city || '');
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
    }
  }, [userInfo]);

  const handleDeleteProf = async (password) => {
    const response = await service.confirmPass(token, password);
    if (response) {
      router.push({ pathname: 'signUp' });
    }
    setIsModalVisible(false);
  };

  const handleRemove = () => {
    Alert.alert(t('alertDeleteProfile'), t('alertDeleteProfileAssert'), [
      {
        text: t('alertDeleteProfileNo'),
        onPress: () => console.log('Deletion Canceled'),
        style: 'cancel',
      },
      {
        text: t('alertDeleteProfileYes'),
        onPress: () => setIsModalVisible(true),
      },
    ]);
  };

  const dataSubmissionHandler = async () => {
    if (!name) {
      Alert.alert('Моля, въведете име');
      return;
    } else if (!phone) {
      Alert.alert('Моля, въведете телефонен номер');
      return;
    } else if (!city) {
      Alert.alert('Моля, изберете град');
      return;
    } else {
      setValidData(true);
    }
    if (validData) {
      const profileData = {
        first_name: name.split(' ')[0],
        last_name: name.split(' ')[1],
        phone_number: phone,
        email: email,
        city: city,
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
        }
        //  else {

        //   Alert.alert('Неуспешна промяна. Моля, опитайте отново.');
        // }
      } catch (error) {
        console.error('Error updating profile:', error);
        Alert.alert('Неуспешна промяна. Моля, опитайте отново.');
      }
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
      setPicture(localUri);
    }
  };

  const handleTownSelection = (value) => {
    setCity(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={height}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Header showProfilePic={false} />

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
                    <Text>{getIcon('pencil', 'white', 13)}</Text>
                  </Pressable>
                </View>

                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{name || ''}</Text>
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

                <Text style={styles.inputFieldName}>Град</Text>
                <View style={{ marginVertical: 5 }}>
                  <View style={styles.pickerContainer}>
                    <RNPickerSelect
                      onValueChange={handleTownSelection}
                      items={cityOptions}
                      style={{
                        inputIOS: styles.pickerItem,
                        inputAndroid: styles.pickerItem,
                      }}
                      placeholder={{
                        label: city.label || 'Изберете град',
                        value: city.label || '',
                        id: city.id || '',
                      }}
                      value={city}
                    />
                  </View>
                </View>

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
                  color='#388FED'
                  secondColor='#4C62C7'
                  additionalStyles={styles.saveButton}
                  additionalTextStyle={styles.buttonText}
                />
              </View>
            </View>
          </View>

          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType='slide'
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{t('alertDeleteProfile')}</Text>
                <Text style={styles.modalMessage}>
                  {t('alertDeleteProfileTypeYourPasswordForConfirmation')}
                </Text>
                <TextInput
                  style={styles.modalInput}
                  secureTextEntry={true}
                  placeholder={t('alertDeleteProfileTypeYourPassword')}
                  value={password}
                  onChangeText={setPassword}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>
                      {t('alertDeleteProfileCancel')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => handleDeleteProf(password)}
                  >
                    <Text style={styles.modalButtonText}>
                      {t('alertDeleteProfileConfirm')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;
