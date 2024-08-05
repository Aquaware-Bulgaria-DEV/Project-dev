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
import { Header } from '../../globalComponents/header.jsx';
import CustomButton from '../../globalComponents/customButton.jsx';
const Users = () => {
  // const { userInfo } = useContext(AuthContext);
  // const [picture, setPicture] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic />
        <View style={styles.text}>
          <Text style={styles.headerTitle}>Всички потребители</Text>
          <Text style={styles.description}>
            На кое място по потребление си в квартала?
          </Text>
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
          title={'Как да спестиш'}
          handlePress={() => console.log('redirect to tips screen')}
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
