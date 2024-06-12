import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CustomText } from "../../components/CustomText/customText.jsx";

const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const server = "http://ec2-18-234-44-48.compute-1.amazonaws.com";

  const handleRegister = async () => {
    console.log(name, email, password, repeatPassword);

    if (!name || !email || !password || !repeatPassword) {
      Alert.alert("Грешка", "Моля, попълнете всички полета");
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert("Грешка", "Паролите не съвпадат");
      return;
    }

    const user = await register(email, password);
    console.log(`in REGISTER COMPOONNENT USER IS ${user}`);
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Регистрация</CustomText>
      <TextInput
        style={styles.input}
        placeholder="Име"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Имейл"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Парола"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Потвърди парола"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
      />
      <Button title="Регистрация" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default User;
