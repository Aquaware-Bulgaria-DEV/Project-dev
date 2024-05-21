import React from "react";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";

import { Header } from "../components/header.jsx";

import KITCHEN_SOURCE from "../../assets/kitchen-pic.jpg";
import BATHROOM_SOURCE from "../../assets/bathroom.jpg";
import TOILET_SOURCE from "../../assets/toilet.png";

const CARD_HEIGHT = 170;

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <View style={styles.text}>
          <Text style={styles.headerTitle}>Здравей, username!</Text>
          <Text style={styles.description}>
            За коя част от дома искаш да провериш потреблението си?
          </Text>
        </View>
        <Pressable style={styles.paddingZero}>
          <ImageBackground style={styles.rooms} source={KITCHEN_SOURCE}>
            <Text style={styles.roomText}>Кухня</Text>
            <Text style={styles.devices}>5 уреда</Text>
          </ImageBackground>
        </Pressable>
        <Pressable style={styles.paddingZero}>
          <ImageBackground style={styles.rooms} source={BATHROOM_SOURCE}>
            <Text style={styles.roomText}>Баня</Text>
            <Text style={styles.devices}>4 уреда</Text>
          </ImageBackground>
        </Pressable>
        <Pressable style={styles.paddingZero}>
          <ImageBackground style={styles.rooms} source={TOILET_SOURCE}>
            <Text style={styles.roomText}>Тоалетна</Text>
            <Text style={styles.devices}>2 уреда</Text>
          </ImageBackground>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "88%",
    flex: 1,
    flexDirection: "column",
    gap: 3,
    marginHorizontal: 24,
    marginVertical: 35,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 25,
    paddingBottom: 15,
  },
  description: {
    fontSize: 15,
    color: "grey",
    letterSpacing: 0.1,
    lineHeight: 25,
  },
  paddingZero: {
    padding: 0,
  },
  text: {
    marginVertical: 35,
    fontStyle: "normal",
  },
  rooms: {
    height: CARD_HEIGHT,
    justifyContent: "flex-end",
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 10,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  roomText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
    fontStyle: "bolder",
  },
  devices: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",

    fontStyle: "bolder",
  },
});
