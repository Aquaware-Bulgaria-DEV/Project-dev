import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Header } from '../../globalComponents/header.jsx'

import { getRoomData } from '../../services/fetch.js'

import { styles } from './singleRoomStyles'

import AuthContext from '../../Context/AuthContext.jsx';
import ProgressBar from '../../globalComponents/progressBar.jsx';

import ProgressBarImage from '../../../assets/CatyProfile.png'
import CustomButton from '../../globalComponents/customButton.jsx';

const SingleRoom = () => {
  const [roomData, setRoomData] = React.useState('')

  const { propertyId, roomId } = useLocalSearchParams();
  const {token} = React.useContext(AuthContext)

  React.useEffect(() => {
    getRoomData(token, propertyId, roomId)
    .then(data => setRoomData(data))
    .catch(e => console.error(e));
  }, [roomId])



  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <Header showProfilePic={false} />
      <View style={styles.dataContainer}>
        <View style={styles.wrapper}>
          <View style={styles.roomInfo}>
            <Text style={styles.roomName}>{roomData.name}</Text>
            <Text style={styles.activeDevices}>4 активни уреда</Text>
          </View>
          <View style={styles.progressContainer}>
            <ProgressBar progress={75} size={300} /* imageSource={ProgressBarImage} */ />
          </View>
            <CustomButton title={"Разбери какво значи"} 
            color={"#388FED"}
            secondColor={"#205187"}
            additionalStyles={{ width: "80%", height: 68, borderRadius: 20, padding: 0, alignSelf: 'center' }}
            additionalTextStyle={{ fontSize: 20, textAlign: "center" }} />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

export default SingleRoom;