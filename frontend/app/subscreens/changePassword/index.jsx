import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./changePasswordStyles.js";
import { Header } from "../../globalComponents/header.jsx";
import { useTranslation } from "react-i18next";
import axios from "axios";
import AuthContext from "../../Context/AuthContext.jsx";

const ChangePassword = () => {
  const { t } = useTranslation();
  const { token } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  // const validateData = () => {
  //   const newErrors = {};
  //   if (!oldPassword) newErrors.oldPassword = t("appSettingsChangePasswordOldPassError");
  //   if (!newPassword) newErrors.newPassword = t("appSettingsChangePasswordNewPassError");
  //   if (newPassword.length < 6) newErrors.newPassword = t("appSettingsChangePasswordLengthError");
  //   if (!confirmNewPassword) newErrors.confirmNewPassword = t("appSettingsChangePasswordConfirmError");
  //   if (newPassword !== confirmNewPassword) newErrors.confirmNewPassword = t("appSettingsChangePasswordMismatchError");
  //   return newErrors;
  // };

  const handleChangePassword = async () => {
    // const validationErrors = validateData();
    // console.log(validationErrors);
    // if (Object.keys(validationErrors).length > 0) {
      
    //   setErrors(validationErrors);
    //   return;
    // }

    try {
      console.log("trying to change the password");
      const response = await fetch(
        "http://ec2-18-234-44-48.compute-1.amazonaws.com/profile/change-password/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`, // Use the token retrieved from context
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error Response Data:", errorData);
        throw new Error(errorData.error || t("appSettingsChangePasswordErrorTitle"));
      }

      const data = await response.json();
      Alert.alert(t("appSettingsChangePasswordSuccessTitle"), t("appSettingsChangePasswordSuccessMessage"));
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert(t("appSettingsChangePasswordErrorTitle"), error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false} />
        <View style={styles.content}>
          <Text style={styles.title}>{t("appSettingsChangePassword")}</Text>

          <View style={styles.form}>
            <Text style={styles.text}>
              {t("appSettingsChangePasswordOldPass")}{" "}
              <Text style={{ color: "red", alignSelf: "flex-start" }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputField}
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder=""
            />
            {errors.oldPassword && (
              <Text style={styles.errorText}>{errors.oldPassword}</Text>
            )}

            <Text style={styles.text}>
              {t("appSettingsChangePasswordNewPass")}{" "}
              <Text style={{ color: "red", alignSelf: "flex-start" }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputField}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder=""
            />
            {errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}

            <Text style={styles.text}>
              {t("appSettingsChangePasswordNewPassRetype")}{" "}
              <Text style={{ color: "red", alignSelf: "flex-start" }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputField}
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              placeholder=""
            />
            {errors.confirmNewPassword && (
              <Text style={styles.errorText}>{errors.confirmNewPassword}</Text>
            )}
          </View>

          <Pressable onPress={handleChangePassword}>
            <LinearGradient
              style={styles.addButton}
              colors={["#388FED", "#205187"]}
            >
              <Text style={styles.addText}>{t("appSettingsChangePassword")}</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
