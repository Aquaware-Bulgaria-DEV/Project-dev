import {
  ScrollView,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from './usersStyles.js';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../Context/AuthContext.jsx';
import picture from '../../../assets/defaultAvatar.png';
import { useRouter } from 'expo-router';
import { Header } from '../../globalComponents/header.jsx';
import CustomButton from '../../globalComponents/customButton.jsx';
import { useTranslation } from 'react-i18next';
import * as services from '../../services/fetch.js';
const Users = () => {
  const { t, i18n } = useTranslation();
  const { userInfo, token } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [town, setTown] = useState('');
  const [picture, setPicture] = useState(null);
  const [place, setPlace] = useState(50);
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    const userRank = async () => await services.getUserRank(token);
    console.log(userRank());
    if (userInfo) {
      if (!userInfo.first_name && !userInfo.last_name) {
        setName('');
      } else if (userInfo.last_name == 'undefined') {
        setName(userInfo.first_name);
      } else {
        setName(`${userInfo.first_name} ${userInfo.last_name}`);
      }

      setTown(userInfo.city || '');

      setPicture(userInfo.profile_picture || null);
    }
  }, [userInfo]);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic />
        <View style={styles.text}>
          <Text style={styles.headerTitle}>Моите резултати</Text>
          <Text style={styles.description}>{t('usersRanklist')}</Text>
        </View>

        <View style={styles.credentials}>
          <View style={styles.imageContainer}>
            <Image style={styles.avatar} source={{ uri: picture }} />
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{`${name}`}</Text>

            <Text style={styles.status}>{town}</Text>
            <TouchableOpacity
              onPressIn={() => setOpacity(0.7)}
              onPressOut={() => setOpacity(1)}
              // onPress={handleRemove}
            >
              {/* <Text style={styles.removeBtn}>Remove</Text> */}
              {/* <Text style={[styles.removeBtn, { opacity }]}>Remove</Text> */}
            </TouchableOpacity>
          </View>

          <Text style={styles.numPosition}>{place}</Text>
        </View>

        <View style={styles.credentials}>
          <View style={styles.imageContainer}>
            <Image style={styles.avatar} source={{ uri: picture }} />
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{`${name}`}</Text>

            <Text style={styles.status}>Дружество</Text>
            <TouchableOpacity
              onPressIn={() => setOpacity(0.7)}
              onPressOut={() => setOpacity(1)}
              // onPress={handleRemove}
            >
              {/* <Text style={styles.removeBtn}>Remove</Text> */}
              {/* <Text style={[styles.removeBtn, { opacity }]}>Remove</Text> */}
            </TouchableOpacity>
          </View>

          <Text style={styles.numPosition}>{place}</Text>
        </View>

        <CustomButton
          title={t('usersButtonHowToSave')}
          handlePress={() =>
            router.push({
              pathname: 'tips',
            })
          }
          color={'#388FED'}
          secondColor={'#4C62C7'}
          additionalStyles={styles.tipsButton}
          additionalTextStyle={styles.buttonText}
        ></CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Users;
