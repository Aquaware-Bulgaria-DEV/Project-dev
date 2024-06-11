import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {Image} from 'expo-image';

import {Header} from '../../components/header';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import globalStyles from '../../globalStyles'

import Avatar from '../../../assets/CatyProfile.png';
import CustomButton from '../../components/customButton';

const FormField = ({
  inputName,
  additionalStyles
}) => {

  // const [formValue, setFormValue] = useState('');

  // const handleChange = (name, value) => {
  //   const updatedValues = { ...formValue, [name]: value };
  //   setFormValue(updatedValues);
  //   onFormChange(updatedValues);
  // };

  return (
    <View style={[{flex: 1, gap:10,}, additionalStyles]}>
      <Text style={{fontSize: 14, paddingLeft:20, opacity: 0.3}}>{inputName}</Text>
      <TextInput onChangeText={(text) => handleChange(type, text)} placeholder='...' 
      style={{justifyContent: 'center', height: 50, fontSize: 14, paddingLeft:20, paddingRight:20, opacity: 0.75, backgroundColor: '#F9F9F9',  borderBottomWidth: 1, borderBottomColor: '#DADADA', borderRadius: 5}}></TextInput>
    </View>
  );
}

const Troubleshoot = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  React.useEffect(() => {
    const tabBarVisible = isFocused ? 'none' : 'flex';
    navigation.setOptions({
      tabBarStyle: { display: tabBarVisible },
    });
  }, [isFocused, navigation]);

  
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.reqContainer}>
        <Text style={styles.screenLabel}>Заявки</Text>
        <View style={styles.innerContainer}>
          <View style={styles.credentials}>
            <Image style={styles.avatar} source={Avatar} />
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>Кети Петрова</Text>
                <Text style={styles.clientNumber}>Клиентски номер: 119862</Text>
                <Text style={styles.removeBtn}>Remove</Text>
              </View>
          </View>
          <FormField inputName={'Докладвай теч'} additionalStyles={{marginTop: 10,}} />
          <FormField inputName={'Докладвай авария'} additionalStyles={{marginTop: 10,}} />
          <FormField inputName={'Докладвай кражба на вода'} additionalStyles={{marginTop: 10,}} />
          <CustomButton title={'Изпрати'} additionalStyles={{width: '90%', alignSelf: 'center', height: 64, borderRadius: 10,}} additionalTextStyle={{fontSize: 18,}}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reqContainer: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  screenLabel: {
    fontSize: 24,
  },
  innerContainer: {
    backgroundColor: '#FFFFFF', 
    height: '87%',
    // alignItems: 'center',
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    gap: 30,
  },
  credentials: {
    flexDirection: 'row',
    gap: 20,
    borderBottomWidth: 1,
    borderBlockColor: '#E8E8E8',
    paddingBottom: 25, 
  },
  avatar: {
    width: 95, 
    height: 95, 
    borderRadius: 25
  },
  clientInfo: {
    paddingTop: 10,
    gap: 7,

  },
  clientName: {
    // fontFamily: globalStyles.primaryFont,
    fontSize: 14,
    fontWeight: 'bold'
  },
  clientNumber: {
    fontSize: 12,
    opacity: 0.3
  },
  removeBtn: {
    fontSize: 12,
    color: '#F67280'
  },
});

export default Troubleshoot;