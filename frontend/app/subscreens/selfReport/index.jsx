import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  RefreshControl
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./selfReportStyles.js";
import SettingsButton from "../../globalComponents/settingsButton";
import { Header } from "../../globalComponents/header.jsx";
import "../../../src/i18n/i18n.config";
import { useTranslation } from "react-i18next";
import getIcon from "../../../utils/icons.js";
import { deleteSelfReport, getSelfReports } from "../../services/fetch.js";
import AuthContext from "../../Context/AuthContext.jsx";
import { router, useFocusEffect } from "expo-router";

import CustomModal from "../../globalComponents/CustomModal.jsx";

const DataComponent = ({ date, id, isLast, onRefresh, token }) => {
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [containerOpacity, setContainerOpacity] = useState(1); 

  const IconsComp = () => {
    const [penOpacity, setPenOpacity] = React.useState(1);
    const [trashBinOpacity, setTrashBinOpacity] = React.useState(1);

    const handleDelete = () => {
      deleteSelfReport(token, id)
        .then(() => {
          onRefresh();
          setModalVisible(false); 
        })
        .catch(err => console.log(err));
    };

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10
        }}
      >
        {isLast && (
          <Pressable
            onPressIn={() => setPenOpacity(0.5)}
            onPressOut={() => setPenOpacity(1)}
            onPress={() =>
              router.push({
                pathname: "subscreens/editSelfReport",
                params: { id: id }
              })
            }
            style={{
              alignItems: "center",
              justifyContent: "center",
              opacity: penOpacity
            }}
          >
            {getIcon("pencil", "#3F9FF4")}
          </Pressable>
        )}
        {isLast && (<Pressable
          onPressIn={() => setTrashBinOpacity(0.5)}
          onPressOut={() => setTrashBinOpacity(1)}
          onPress={() => setModalVisible(true)} 
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: trashBinOpacity
          }}
        >
          {getIcon("trash", "#131313")}
        </Pressable>)}
        <CustomModal 
          isVisible={modalVisible}
          setIsVisible={setModalVisible}
          questionTxt={"Сигурен ли сте че искате да изтриете самоотчетът?"}
          actionHandler={handleDelete}
        />
      </View>
    );
  };

  return (
    <Pressable
    onPressIn={() => setContainerOpacity(0.5)}
    onPressOut={() => setContainerOpacity(1)}
    onPress={() =>
      router.push({
        pathname: "subscreens/selfReportDetails",
        params: { id: id }
      })
    }
      style={[
        styles.settingsBtn,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: containerOpacity,
        }
      ]}
    >
      <Text style={{ color: "#999999", fontSize: 20 }}>{date}</Text>
      <IconsComp />
    </Pressable>
  );
};

const selfReport = () => {
  const { t, i18n } = useTranslation();
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getSelfReports(token)
      .then(res => setData(res))
      .catch(e => console.log(e.message));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getSelfReports(token)
      .then(res => setData(res))
      .catch(e => console.log(e.message))
      .finally(() => setRefreshing(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      onRefresh(); 
    }, [])
    );

  function transformDate(dateString) {
    const dateObj = new Date(dateString);

    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const year = dateObj.getUTCFullYear();

    return `${day}.${month}.${year}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flexGrow: 1 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
            isInnerPressable={false}
          />
          <View
            style={{
              borderBottomColor: "#131313",
              borderBottomWidth: 1,
              opacity: 0.1,
              marginBottom: 20
            }}
          />
          {data.length !== 0 ? data.map((report, index) => {
            const isLast = index === 0;
            const dateString = transformDate(report.date);
            return (
              <DataComponent
                key={report.id}
                id={report.id}
                date={dateString}
                isLast={isLast}
                onRefresh={onRefresh}
                token={token}
              />
            );
          }) : <Text style={styles.noData}>{"Няма налични данни за самоотчет."}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default selfReport;
