import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { Header } from '../../globalComponents/header.jsx';
import { styles } from './tipStyle.js';
import * as tipsServices from '../../services/fetch.js';
import AuthContext from '../../Context/AuthContext.jsx';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

const Tip = () => {
  const { token } = React.useContext(AuthContext);

  const [tip, setTip] = useState([]);
  const { tipId } = useLocalSearchParams();

  const getTip = async () => {
    try {
      const response = await tipsServices.getATip(tipId, token);

      setTip(response);
    } catch (error) {
      console.error('error fetching tips:', error);
    }
  };

  useEffect(() => {
    getTip();
  }, []);

  return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.content}>
          <Image source={{ uri: tip['background_image'] }} style={styles.pic} />
          <Text style={styles.title}>{tip.title}</Text>

          <Text style={styles.text}>{tip.content}</Text>
        </View>
      </ScrollView>
  );
};

export default Tip;
