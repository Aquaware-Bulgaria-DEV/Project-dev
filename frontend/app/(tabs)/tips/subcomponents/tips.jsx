import {
  ScrollView,
  Text,
  Pressable,
  ImageBackground,
  View,
  ActivityIndicator,
} from "react-native";
import { styles } from "./subcompStyles.js";
import { useState, useEffect } from "react";
import * as tipsServices from "../../../services/tipsServices.js";
import { useRouter } from "expo-router";

export const TipsByCategory = () => {
  const router = useRouter();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTips = async () => {
    try {
      const response = await tipsServices.getTips();

      setTips(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tips:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTips();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.categories}>Категории</Text>

      {tips.map((tip) => (
        <View key={tip.id}>
          <Pressable
            onPress={() =>
              router.push({ pathname: "tip", params: { tipId: tip.id } })
            }
          >
            <ImageBackground
              style={styles.background}
              source={{ uri: tip.background_image }}
            >
              <Text style={styles.tipText}>{tip.title}</Text>
            </ImageBackground>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};
