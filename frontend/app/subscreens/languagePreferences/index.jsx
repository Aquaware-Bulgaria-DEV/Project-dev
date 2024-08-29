import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Pressable } from "react-native";
import { styles } from "./languagePreferencesStyles.js";
import { Header } from "../../globalComponents/header.jsx";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../src/context/LanguageContext.js";
import { LinearGradient } from 'expo-linear-gradient';

const LanguagePreferences = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [isLanguageEnglish, setEnglishLanguage] = useState(language === 'en');

  useEffect(() => {
    setEnglishLanguage(language === 'en');
  }, [language]);

  const handleSetLanguage = (lang) => {
    if ((lang === 'en' && !isLanguageEnglish) || (lang === 'bg' && isLanguageEnglish)) {
      toggleLanguage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("settingsLanguage")}</Text>

          {/* Button for English Language */}
          <Pressable
            style={styles.settingsBtn}
            onPress={() => handleSetLanguage('en')}
          >
            {isLanguageEnglish ? (
              <LinearGradient
                colors={['#388FED', '#4C62C7']}
                style={styles.gradientButton}
              >
                <Text style={styles.textGradient}>
                  {t("settingsChangeLanguageEN")}
                </Text>
              </LinearGradient>
            ) : (
              <Text style={styles.buttonText}>
                {t("settingsChangeLanguageEN")}
              </Text>
            )}
          </Pressable>

          {/* Button for Bulgarian Language */}
          <Pressable
            style={styles.settingsBtn}
            onPress={() => handleSetLanguage('bg')}
          >
            {!isLanguageEnglish ? (
              <LinearGradient
                colors={['#388FED', '#4C62C7']}
                style={styles.gradientButton}
              >
                <Text style={styles.textGradient}>
                  {t("settingsChangeLanguageBG")}
                </Text>
              </LinearGradient>
            ) : (
              <Text style={styles.buttonText}>
                {t("settingsChangeLanguageBG")}
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LanguagePreferences;
