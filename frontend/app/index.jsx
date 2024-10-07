import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "./globalComponents/customButton.jsx";
import { Image } from "expo-image";
import { useNavigation } from '@react-navigation/native';
import "../src/i18n/i18n.config";
import { useTranslation } from "react-i18next";
import AuthContext from "./Context/AuthContext.jsx";
import AquawareLogo from "../assets/AquawareLogo.svg";
import {
  useFonts,
  Muli_400Regular,
  Muli_700Bold
} from "@expo-google-fonts/muli";
import globalStyles from "./globalStyles";

const AuthLayout = () => {
  const [fontsLoaded] = useFonts({
    Muli_400Regular,
    Muli_700Bold
  });

  const { t } = useTranslation();
  const result = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);

  const navigation = useNavigation();

  React.useEffect(() => {
    if (fontsLoaded) {
      setLoading(false);
    }
  }, [fontsLoaded]);

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
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
        handlePress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
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