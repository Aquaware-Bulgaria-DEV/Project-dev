import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { Header } from "../components/header.jsx";
import { styles } from "./tipStyle.js";
import * as tipsServices from "../services/tipsServices.js";

import { CustomText } from "../components/CustomText/customText.jsx";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

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
          <CustomText fontType="bold" style={styles.title}>
            {tip.title}
          </CustomText>

          <CustomText style={styles.text}>{tip.content}</CustomText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tip;
