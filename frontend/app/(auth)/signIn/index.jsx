// SignIn.js
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Button, Alert } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import AuthForm from "../../globalComponents/authForm.jsx";
import AuthContext from "../../Context/AuthContext";
import { styles } from "./sign-inStyles";
import AquawareLogo from "../../../assets/AquawareLogo.svg";
import { login } from "../../services/fetch";
import LanguageToggleButton from "../../globalComponents/LanguageToggleButton.jsx";
import * as SecureStore from "expo-secure-store";
import * as Facebook from 'expo-auth-session/providers/facebook'; // Facebook provider
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { t } = useTranslation();
  const { saveToken, saveUserInfo } = React.useContext(AuthContext);
  const [formValues, setFormValues] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState("");
  const [biometricLoginEnabled, setBiometricLoginEnabled] = useState(false);
  const [biometricConfigured, setBiometricConfigured] = useState(false);
  const router = useRouter();

  // Facebook login setup
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '1052805583190115',
  });
  
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;

      // Use the access token to fetch user details from Facebook's API
      fetch(`https://graph.facebook.com/me?access_token=${access_token}`)
        .then(res => res.json())
        .then(async userData => {
          // Handle Facebook user authentication (e.g., send to your backend for verification)
          await saveToken(access_token);
          // Assuming saveUserInfo will store the profile details fetched from Facebook
          saveUserInfo(userData);
          router.push("/home");
        })
        .catch(err => {
          console.error(err);          
          setError(`${t('errorFacebookLogin')}`);
        });
    }
  }, [response]);

  useEffect(() => {
    const loadBiometricPreference = async () => {
      try {
        const value = await AsyncStorage.getItem("biometricLogin");
        const isEnabled = value ? JSON.parse(value) : false;
        setBiometricLoginEnabled(isEnabled);

        if (isEnabled) {
          const hasHardware = await LocalAuthentication.hasHardwareAsync();
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();
          setBiometricConfigured(hasHardware && isEnrolled);
        }
      } catch (error) {
        console.error("Error getting biometric preference:", error);
      }
    };

    loadBiometricPreference();
  }, []);

  const handleFormChange = (newValues) => {
    setFormValues(newValues);
  };

  const handleLogin = async () => {
    if (formValues.email === "" || formValues.password === "") {
      setError(`${t('errorAllFieldsAreRequired')}`);
      return;
    }

    try {
      const loginResponse = await login(formValues);
      await saveToken(loginResponse.token);

      if (biometricLoginEnabled) {
        await SecureStore.setItemAsync("userEmail", formValues.email);
        await SecureStore.setItemAsync("userPassword", formValues.password);
      }

      const response = await fetch(
        "http://ec2-18-234-44-48.compute-1.amazonaws.com/profile/details/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${loginResponse.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Failed to fetch profile details");
      }

      const profileData = await response.json();
      saveUserInfo(profileData);
      setError("");
      router.push("/home");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Log in with Face ID",
          fallbackLabel: "Use Passcode",
          disableDeviceFallback: false,
        });

        if (result.success) {
          await sendCredentials();
          console.log("Biometric authentication was successful.");
        }
      } else {
        Alert.alert("Biometrics not available", "Please ensure your biometrics are set up.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during biometric authentication.");
    }
  };

  const sendCredentials = async () => {
    try {
      const email = await SecureStore.getItemAsync("userEmail");
      const password = await SecureStore.getItemAsync("userPassword");

      if (email && password) {
        const loginResponse = await login({ email, password });
        await saveToken(loginResponse.token);
        router.push("/home");
      } else {
        setError("No credentials found. Please log in manually first.");
      }
    } catch (error) {
      setError("Login failed");
    }
  };

  const handleFacebookLogin = () => {
    promptAsync();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={AquawareLogo} style={styles.image} contentFit="cover" />
        {biometricLoginEnabled && biometricConfigured ? (
          <Button title={t("biometricsLogin")} onPress={handleBiometricAuth} />
        ) : null}
        <AuthForm
          title="Login"
          onFormChange={handleFormChange}
          onLogin={handleLogin}
          facebookAuth={handleFacebookLogin}
          errorMessage={error}
        />
        <LanguageToggleButton />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
