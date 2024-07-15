import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Header } from '../../globalComponents/header.jsx'

import { getRoomData } from '../../services/fetch.js'

import { styles } from './singleRoomStyles'

import AuthContext from '../../Context/AuthContext.jsx';

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
      <Text>{propertyId}</Text>
    </ScrollView>
  </SafeAreaView>
  );
};

export default SingleRoom;