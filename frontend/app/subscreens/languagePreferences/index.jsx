import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./languagePreferencesStyles.js";
import SettingsButton from "../../globalComponents/settingsButton";
import { Header } from "../../globalComponents/header.jsx";

import "../../../src/i18n/i18n.config";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../src/context/LanguageContext.js";

const languagePreferences = () => {
  const { t, i18n } = useTranslation();
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [isLanguageEnglish, setEnglishLanguage] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("settingsLanguage")}</Text>
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>
              {t("settingsChangeLanguageEN")}
            </Text>
            <Switch
              value={isLanguageEnglish}
              onValueChange={() =>
                setEnglishLanguage((previousState) => !previousState)
              }
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
          {/* Change language button - for removal after successful translation implementation */}
          <View style={[styles.settingsBtn, styles.switchContainer]}>
            <Text style={styles.buttonText}>
              {t("settingsChangeLanguageBG")}
            </Text>
            <Switch
              value={!isLanguageEnglish}
              onValueChange={() =>
                setEnglishLanguage((previousState) => !previousState)
              }
              trackColor={{ false: "#999999", true: "#388FED" }}
              thumbColor={"#F9F9F9"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default languagePreferences;
