import React from "react";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { Header } from "../../components/header.jsx";
import { styles } from "./tipsStyles.js";
import { CustomText } from "../../components/CustomText/customText.jsx";
import HANDS_PIC from "../../../assets/hands.jpeg";
import { List } from "./subcomponents/list.jsx";

const Tips = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <CustomText fontType="bold" style={styles.title}>
          Съвети за пестене на вода за теб
        </CustomText>

        <Image style={styles.headerPic} source={HANDS_PIC}></Image>

        <List />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tips;
