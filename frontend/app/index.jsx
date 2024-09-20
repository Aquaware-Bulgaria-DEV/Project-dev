// AuthLayout.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomButton from "./globalComponents/customButton";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";

import "../src/i18n/i18n.config";
import { useTranslation } from "react-i18next";
import AuthContext from "./Context/AuthContext";
import AquawareLogo from "../assets/AquawareLogo.svg";
import {
  useFonts,
  Muli_400Regular,
  Muli_700Bold
} from "@expo-google-fonts/muli";
import globalStyles from "./globalStyles";
import LanguageToggleButton from "./globalComponents/LanguageToggleButton";

const AuthLayout = () => {
  const [fontsLoaded] = useFonts({
    Muli_400Regular,
    Muli_700Bold
  });

  const { t } = useTranslation();
  const { token } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(
    () => {
      if (fontsLoaded) {
        setLoading(false);
      }
    },
    [fontsLoaded]
  );

  const isAuthenticated = token !== null;

  return loading
    ? null
    : isAuthenticated
      ? <Redirect href="/home" />
      : <View style={styles.container}>
          <Image
            source={AquawareLogo}
            style={styles.image}
            contentFit="cover"
          />
          <Text style={styles.logo}>Aquaware</Text>
          <Text style={styles.welcomeMessage}>
            {t("welcomeMessage")}
          </Text>
          <CustomButton
            title={t("loginButton")}
            handlePress={() => router.push("signIn")}
          />
          <LanguageToggleButton />
        </View>;
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
    paddingTop: 40
  },
  logo: {
    fontSize: 25,
    fontWeight: "bold",
    color: globalStyles.primaryColor
  },
  welcomeMessage: {
    fontSize: 18,
    textAlign: "center"
  },
  image: {
    width: 160,
    height: 150
  }
});
