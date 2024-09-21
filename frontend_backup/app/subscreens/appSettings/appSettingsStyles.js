import { StyleSheet } from "react-native";
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollViewContent: {
    paddingTop: Platform.OS === 'ios' ? 38 : 0, 
    // paddingBottom: 125,
    // marginHorizontal: 24,
    marginTop: 35,
  },
  content: {
    margin: 26,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 28,
    marginLeft: 15,
    textShadowColor: '#000', // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5,
  },
  settingsBtn: {
    height: 68,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 6,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#999999",
  },
});
