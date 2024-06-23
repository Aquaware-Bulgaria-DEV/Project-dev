import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../globalComponents/header.jsx';
import { styles } from './myProfileStyles.js';

const MyProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false}></Header>
        <View style={styles.content}>
          <Text>My Profile screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;
