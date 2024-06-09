import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { Header } from "../components/header.jsx";
import { styles } from "./tipStyle.js";
import * as tipsServices from "../services/tipsServices.js";

import { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

const Tip = () => {
  const [tip, setTip] = useState([]);
  const { tipId } = useLocalSearchParams();

  const getTip = async () => {
    try {
      const response = await tipsServices.getATip(tipId);

      setTip(response);
    } catch (error) {
      console.error("error fetching tips:", error);
    }
  };

  useEffect(() => {
    getTip();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.content}>
          <Image source={{ uri: tip["background_image"] }} style={styles.pic} />
          <Text style={styles.title}>{tip.title}</Text>

          <Text style={styles.text}>{tip.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tip;
