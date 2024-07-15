import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Header } from '../../globalComponents/header.jsx'

import { styles } from './singleRoomStyles'

const SingleRoom = () => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <Header showProfilePic={false} />
    </ScrollView>
  </SafeAreaView>
  );
};

export default SingleRoom;