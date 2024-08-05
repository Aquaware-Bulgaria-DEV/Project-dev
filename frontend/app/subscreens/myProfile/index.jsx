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

const { height } = Dimensions.get('window');

const MyProfile = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [picture, setPicture] = useState(null);
  const [opacity, setOpacity] = useState(1);

  const { userInfo } = useContext(AuthContext);
  const { control } = useForm();

  const pencil = getIcon('pencil', 'white', 13);
  const formattedDate = format(parseISO(userInfo.date_joined), 'dd.MM.yyyy');

  useEffect(() => {
    setName(userInfo.first_name + ' ' + userInfo.last_name);
    setPhone(userInfo.phone_number);
    setEmail(userInfo.email);
    setPicture(userInfo.profile_picture);
    setDate(formattedDate);
  }, [userInfo]);

  const handleRemove = () => {
    Alert.alert(
      'Изтриване на профил',
      'Сигурни ли сте, че искате да изтриете профила си?',
      [
        {
          text: 'Не, не съм',
          onPress: () => console.log('Премахване'),
          style: 'cancel',
        },
        {
          text: 'Да, искам да го изтрия',
          onPress: () => {
            Alert.prompt(
              'Въведете парола',
              'Моля, въведете паролата си за потвърждение на изтриването:',
              [
                {
                  text: 'Отказ',
                  onPress: () => console.log('Изтриване отказано'),
                  style: 'cancel',
                },
                {
                  text: 'Потвърди',
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

  const changePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result.assets[0].uri);
    if (result.canceled === false) {
      setPicture(result.assets[0].uri);
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
            <Text style={styles.screenLabel}>Моят профил</Text>
            <Text style={styles.otherDetails}>Активен от {date}</Text>
            <Text style={styles.otherDetails}>Клиент на Софийска вода</Text>
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
                  <Text
                    style={styles.clientName}
                  >{`${userInfo.first_name} ${userInfo.last_name}`}</Text>
                  <Text style={styles.clientNumber}>
                    Клиентски номер: 119862
                  </Text>
                  <TouchableOpacity
                    onPressIn={() => setOpacity(0.7)}
                    onPressOut={() => setOpacity(1)}
                    onPress={handleRemove}
                  >
                    <Text style={[styles.removeBtn, { opacity }]}>
                      Изтриване на профил
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.form}>
                <Text style={styles.inputFieldName}>Име</Text>

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

                <Text style={styles.inputFieldName}>Телефон</Text>

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
                <Text style={styles.inputFieldName}>Имейл</Text>

                <TextInput
                  name='email'
                  style={styles.inputField}
                  value={email}
                  readOnly
                  keyboardType='email-address'
                />

                <CustomButton
                  handlePress={() => console.log(name, email, phone, picture)}
                  title='Запази'
                  color={'#388FED'}
                  secondColor={'#4C62C7'}
                  additionalStyles={styles.saveButton}
                  additionalTextStyle={styles.buttonText}
                ></CustomButton>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;
