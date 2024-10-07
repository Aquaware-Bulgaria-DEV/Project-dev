import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollViewContent: {
    paddingBottom: 125,
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
  form: {
    marginHorizontal: 3,
  },
  inputField: {
    height: 68,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: "white",
  },
  text: {
    color: "grey",
    fontSize: 18,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  addButton: {
    marginHorizontal: 28,
    borderRadius: 17,
    justifyContent: "center",
    height: 54,
    marginTop: 20,
  },
  addText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});