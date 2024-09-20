import React from "react";
import { Text, ScrollView, Image } from "react-native";
import { Header } from "../../globalComponents/header.jsx";
import { styles } from "./tipsStyles.js";

import HANDS_PIC from "../../../assets/hands.jpeg";
import { List } from "./subcomponents/list.jsx";

import "../../../src/i18n/i18n.config";
import { useTranslation } from "react-i18next";

const Tips = () => {
  const { t, i18n } = useTranslation();

  return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <Text style={styles.title}>{t("generalTips")}</Text>

        <Image style={styles.headerPic} source={HANDS_PIC}></Image>

        <List />
      </ScrollView>
  );
};

export default Tips;
