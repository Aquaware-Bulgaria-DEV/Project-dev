import React from "react";
import { View, StyleSheet } from "react-native";
import { CustomText } from "../../components/CustomText/customText.jsx";
const Statistic = () => {
  return (
    <View style={styles.container}>
      <CustomText>Welcome to the Statistics Screen!</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Statistic;
