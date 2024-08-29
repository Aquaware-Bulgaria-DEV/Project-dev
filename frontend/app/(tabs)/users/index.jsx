import {
  ScrollView,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from './usersStyles.js';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext.jsx';
import picture from '../../../assets/defaultAvatar.png';
import { useRouter } from 'expo-router';
import { Header } from '../../globalComponents/header.jsx';
import CustomButton from '../../globalComponents/customButton.jsx';
import { useTranslation } from 'react-i18next';
const Users = () => {
  const { t, i18n } = useTranslation();
  // const { userInfo } = useContext(AuthContext);
  // const [picture, setPicture] = useState(null);

  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic />
        <View style={styles.text}>
          <Text style={styles.headerTitle}>{t('usersAll')}</Text>
          <Text style={styles.description}>{t('usersRanklist')}</Text>
        </View>

        <View style={styles.credentials}>
          <View style={styles.imageContainer}>
            {/* <Image style={styles.avatar} source={{ uri: picture }} /> */}
            <Image style={styles.avatar} source={picture} />
          </View>
          <View style={styles.clientInfo}>
            <Text
              style={styles.clientName}
              // >{`${userInfo.first_name} ${userInfo.last_name}`}</Text>
            >
              Кати Стоянова
            </Text>
            <Text style={styles.status}>Status</Text>
            <TouchableOpacity
              onPressIn={() => setOpacity(0.7)}
              onPressOut={() => setOpacity(1)}
              // onPress={handleRemove}
            >
              <Text style={styles.removeBtn}>Remove</Text>
              {/* <Text style={[styles.removeBtn, { opacity }]}>Remove</Text> */}
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.numPosition}>1</Text>
          </View>
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
          additionalStyles={styles.saveButton}
          additionalTextStyle={styles.buttonText}
        ></CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Users;
