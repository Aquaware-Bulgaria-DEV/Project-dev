import React from "react";
import { styles } from "./homeStyles.js";
import {
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";

import { Header } from "../../components/header.jsx";

import KITCHEN_SOURCE from "../../../assets/kitchen-pic.jpg";
import BATHROOM_SOURCE from "../../../assets/bathroom.jpg";
import TOILET_SOURCE from "../../../assets/toilet.png";
import { CustomText } from "../../components/CustomText/customText.jsx";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={true} />
        <View style={styles.text}>
          <CustomText style={styles.headerTitle}>Здравей, username!</CustomText>
          <CustomText style={styles.description}>
            За коя част от дома искаш да провериш потреблението си?
          </CustomText>
        </View>
        <Pressable
          style={styles.paddingZero}
          onPress={() => console.log("TODO: redirect")}
        >
          <ImageBackground style={styles.rooms} source={KITCHEN_SOURCE}>
            <CustomText fontType="bold" style={styles.roomText}>
              Кухня
            </CustomText>
            {/* <CustomText style={styles.devices}>5 уреда</CustomText> */}
          </ImageBackground>
        </Pressable>
        <Pressable
          style={styles.paddingZero}
          onPress={() => console.log("TODO: redirect")}
        >
          <ImageBackground style={styles.rooms} source={BATHROOM_SOURCE}>
            <CustomText fontType="bold" style={styles.roomText}>
              Баня
            </CustomText>
            {/* <CustomText style={styles.devices}>4 уреда</CustomText> */}
          </ImageBackground>
        </Pressable>
        <Pressable
          style={styles.paddingZero}
          onPress={() => console.log("TODO: redirect")}
        >
          <ImageBackground style={styles.rooms} source={TOILET_SOURCE}>
            <CustomText fontType="bold" style={styles.roomText}>
              Тоалетна
            </CustomText>
            {/* <CustomText style={styles.devices}>2 уреда</CustomText> */}
          </ImageBackground>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
