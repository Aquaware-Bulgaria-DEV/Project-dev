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
import AuthContext from "../../Context/AuthContext.jsx";
import { router } from "expo-router";

const ChangePassword = () => {
  const { t } = useTranslation();
  const { token } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field) => {
    const newErrors = { ...errors };

    switch (field) {
      case "oldPassword":
        newErrors.oldPassword = !oldPassword
          ? t("appSettingsChangePasswordOldPassError")
          : null;
        break;

      case "newPassword":
        newErrors.newPassword = !newPassword
          ? t("appSettingsChangePasswordNewPassError")
          : newPassword.length < 8 || !/[a-zA-Z]/.test(newPassword) || !/\d/.test(newPassword)
          ? t("appSettingsChangePasswordSymbolsError")
          : oldPassword === newPassword
          ? t("appSettingsChangePasswordDifferentPass")
          : null;
        break;

      case "confirmNewPassword":
        newErrors.confirmNewPassword = !confirmNewPassword
          ? t("appSettingsChangePasswordConfirmError")
          : newPassword !== confirmNewPassword
          ? t("appSettingsChangePasswordMismatchError")
          : null;
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChangePassword = async () => {
    validateField("oldPassword");
    validateField("newPassword");
    validateField("confirmNewPassword");

    if (Object.values(errors).some((error) => error !== null)) return;

    setIsLoading(true); // Start loading state

    try {
      const response = await fetch(
        "http://ec2-18-234-44-48.compute-1.amazonaws.com/profile/change-password/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
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
        throw new Error(
          errorData.error || t("appSettingsChangePasswordErrorTitle")
        );
      }

      Alert.alert(
        t("appSettingsChangePasswordSuccessTitle"),
        t("appSettingsChangePasswordSuccessMessage")
      );
      router.push("/settings");
    } catch (error) {
      Alert.alert(t("appSettingsChangePasswordErrorTitle"), error.message);
    } finally {
      setIsLoading(false); // End loading state
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
              onBlur={() => validateField("oldPassword")}
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
              onChangeText={(text) => {
                setNewPassword(text);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  newPassword:
                    text.length < 8
                      ? t("appSettingsChangePasswordSymbolsError")
                      : null,
                  confirmNewPassword:
                    confirmNewPassword === text
                      ? null
                      : t("appSettingsChangePasswordMismatchError"),
                }));
              }}
              onBlur={() => validateField("newPassword")}
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
              onChangeText={(text) => {
                setConfirmNewPassword(text);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  confirmNewPassword:
                    text === newPassword
                      ? null
                      : t("appSettingsChangePasswordMismatchError"),
                }));
              }}
              placeholder=""
            />
            {errors.confirmNewPassword && (
              <Text style={styles.errorText}>{errors.confirmNewPassword}</Text>
            )}
          </View>

          <Pressable onPress={handleChangePassword} disabled={isLoading}>
            <LinearGradient
              style={styles.addButton}
              colors={["#388FED", "#205187"]}
            >
              <Text style={styles.addText}>
                {isLoading ? t("appSettingsChangePasswordLoading") : t("appSettingsChangePassword")}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
