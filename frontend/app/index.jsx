import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "./components/customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";

import {
  useFonts,
  Muli_400Regular,
  Muli_600SemiBold,
  Muli_700Bold,
} from "@expo-google-fonts/muli";

import globalStyles from "./globalStyles";

import AuthContext from "./Context/AuthContext";

import AquawareLogo from "../assets/AquawareLogo.svg";
import { CustomText } from "./components/CustomText/customText.jsx";

const AuthLayout = () => {
  //Load custon font on app start
  const [fontsLoaded] = useFonts({
    Muli_400Regular,
    Muli_700Bold,
  });

  const { token } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (token !== null) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [token]);

  const isAuthenticated = token !== null;
  // console.log(loading)
  return loading || !fontsLoaded ? null : isAuthenticated ? (
    <Redirect href="/home" />
  ) : (
    <SafeAreaView style={styles.container}>
      <Image source={AquawareLogo} style={styles.image} contentFit="cover" />
      <CustomText style={styles.logo}>Aquaware</CustomText>
      <CustomText style={styles.welcomeMessage}>
        Добре дошли в Aquaware, вашият незаменим партнъор в следенето и
        пестенето на вода!
      </CustomText>
      <CustomButton
        title={"Влезте в профила си"}
        handlePress={() => router.push("signIn")}
      />
      <CustomButton title={"Начало"} handlePress={() => router.push("/home")} />
      {/* <CustomButton title={'Начало'} handlePress={() => console.log("Mario Auth") }/> */}
    </SafeAreaView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
    paddingTop: 40,
  },
  logo: {
    fontSize: 25,
    fontWeight: "bold",
    color: globalStyles.primaryColor,
  },
  welcomeMessage: {
    fontSize: 18,
    textAlign: "center",
  },
  image: {
    width: 160,
    height: 150,
  },
});
