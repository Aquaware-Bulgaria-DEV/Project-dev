import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./selfReportStyles.js";
import SettingsButton from "../../globalComponents/settingsButton";
import { Header } from "../../globalComponents/header.jsx";

import "../../../src/i18n/i18n.config";
import { useTranslation } from "react-i18next";

import getIcon from "../../../utils/icons.js";
import { getSelfReports } from "../../services/fetch.js";
import AuthContext from "../../Context/AuthContext.jsx";

const DataComponent = ({ date }) => {
  const IconsComp = () => {
    const [penOpacity, setPenOpacity] = React.useState(1);
    const [trashBinOpacity, setTrashBinOpacity] = React.useState(1);

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Pressable
          onPressIn={() => setPenOpacity(0.5)}
          onPressOut={() => setPenOpacity(1)}
          style={{
            /* width: 35, height: 35, borderRadius: 35/2, */ alignItems:
              "center",
            justifyContent: "center",
            opacity: penOpacity,
          }}
        >
          {getIcon("pencil", "#131313")}
        </Pressable>
        <Pressable
          onPressIn={() => setTrashBinOpacity(0.5)}
          onPressOut={() => setTrashBinOpacity(1)}
          style={{
            /* width: 35, height: 35, borderRadius: 35/2, */ alignItems:
              "center",
            justifyContent: "center",
            opacity: trashBinOpacity,
          }}
        >
          {getIcon("trash", "#131313")}
        </Pressable>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.settingsBtn,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <Text style={{ color: "#999999", fontSize: 20 }}>{date}</Text>
      <IconsComp />
    </View>
  );
};

const selfReport = () => {
  const { t, i18n } = useTranslation();
  const { token } = useContext(AuthContext);
  const [ data, setData ] = useState([])

  useEffect(() => {
    getSelfReports(token)
    .then(res => setData(res))
    .catch(e => console.log(e.message))
  }, [])

  // const { width, height } = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flexGrow: 1 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("subscreenSelfReport")}</Text>
          <SettingsButton
            title={t("subscreenAddData")}
            style={[styles.settingsBtn, { marginBottom: 20 }]}
            screen={"subscreens/formSelfReport"}
            icon={"plus"}
            iconColor={"#131313"}
          />
          <View
            style={{
              borderBottomColor: "#131313",
              borderBottomWidth: 1,
              opacity: 0.1,
              marginBottom: 20,
            }}
          />
            {data.map((report) => {
              const date = new Date(report.date).toLocaleString('de-DE');
              const dateString = date.substring(0, 8);
              return <DataComponent key={data.id} date={dateString} />
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default selfReport;
