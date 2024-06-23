import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import { Header } from '../../globalComponents/header.jsx';
import { styles } from './tipsStyles.js';

import HANDS_PIC from '../../../assets/hands.jpeg';
import { List } from './subcomponents/list.jsx';

const Tips = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <Text style={styles.title}>Съвети за пестене на вода за теб</Text>

        <Image style={styles.headerPic} source={HANDS_PIC}></Image>

        <List />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tips;
