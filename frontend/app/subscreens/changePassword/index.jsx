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

  const validate = () => {
    const newErrors = {};

    // Rule: New password is required
    if (!newPassword) {
      newErrors.newPassword = t("appSettingsChangePasswordOldPassError");
    } else {
      // Rule 1: At least 8 characters
      if (newPassword.length < 7) {
        newErrors.newPassword = t("appSettingsChangePasswordLengthError");
      }

      // Rule 2: Contains both letters and digits
      const hasLetters = /[a-zA-Z]/.test(newPassword);
      const hasDigits = /\d/.test(newPassword);
      if (!hasLetters || !hasDigits) {
        newErrors.newPassword = t("appSettingsChangePasswordSymbolsError");
      }

      // Rule 3: Old password and new password must not match
      if (oldPassword === newPassword) {
        newErrors.newPassword = t("appSettingsChangePasswordDifferentPass");
      }
    }

    // Rule: Confirm password is required
    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = t("appSettingsChangePasswordNewPassError");
    } else if (newPassword !== confirmNewPassword) {
      // Rule 4: New password and confirm password must match
      newErrors.confirmNewPassword = t(
        "appSettingsChangePasswordMismatchError"
      );
    } else {
      // Clear the error if the passwords match
      newErrors.confirmNewPassword = null;
    }

    setErrors(newErrors);

    // If no errors, validation is successful
    return (
      Object.keys(newErrors).filter((key) => newErrors[key] !== null).length ===
      0
    );
  };

  const handleChangePassword = async () => {
    if (!validate()) {
      return;
    }

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
        throw new Error(
          errorData.error || t("appSettingsChangePasswordErrorTitle")
        );
      }

      const data = await response.json();
      Alert.alert(
        t("appSettingsChangePasswordSuccessTitle"),
        t("appSettingsChangePasswordSuccessMessage")
      );
      router.push("/settings");
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
              onChangeText={(text) => setOldPassword(text)}
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
                validate();
              }}
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

                // Clear mismatch error as soon as passwords match
                if (newPassword === text) {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmNewPassword: null,
                  }));
                } else {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmNewPassword: t(
                      "appSettingsChangePasswordMismatchError"
                    ),
                  }));
                }
              }}
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
              <Text style={styles.addText}>
                {t("appSettingsChangePassword")}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
