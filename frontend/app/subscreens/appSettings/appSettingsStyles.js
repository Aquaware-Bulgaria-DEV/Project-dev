import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollViewContent: {
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
    textShadowColor: '#000', 
    textShadowOffset: { width: 1, height: 1 }, 
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
