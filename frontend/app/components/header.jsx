import { View, Pressable, Image, StyleSheet } from "react-native";

import PROFILE_PIC from "../../assets/blank-profile.png";
import LOGO_COVER from "../../assets/logo-cover.jpeg";

export const Header = () => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          console.log("TODO");
        }}
      >
        <Image style={styles.icons} source={PROFILE_PIC} />
        <View style={styles.dot} />
      </Pressable>

      <Image style={styles.icons} source={LOGO_COVER} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 5,
    backgroundColor: "#329DFA",
    position: "absolute",
    top: 4,
    right: -1,
  },
});
