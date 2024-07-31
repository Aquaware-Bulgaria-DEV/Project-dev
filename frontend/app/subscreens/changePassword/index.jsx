import React, { useState } from "react";
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

const ChangePassword = () => {
  const { t } = useTranslation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateData = () => {
    const newErrors = {};
    if (!oldPassword) newErrors.oldPassword = "Моля, въведете стара парола";
    if (!newPassword) newErrors.newPassword = "Моля, въведете нова парола";
    if (!confirmNewPassword)
      newErrors.confirmNewPassword = "Моля, потвърдете новата парола";
    if (newPassword !== confirmNewPassword)
      newErrors.confirmNewPassword = "Паролите не съвпадат";
    return newErrors;
  };

  const handleChangePassword = () => {
    const validationErrors = validateData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Handle password change logic here
    Alert.alert("Success", "Password changed successfully.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <Header showProfilePic={false} />
        <View style={styles.content}>
          <Text style={styles.title}>{t("appSettingsChangePassword")}</Text>

          <View style={styles.form}>
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
