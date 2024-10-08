import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  reqContainer: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  screenLabel: {
    fontSize: 24,
    textShadowColor: "#000", // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5
  },
  innerContainer: {
    backgroundColor: "#FFFFFF",
    // height: "87%",
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    gap: 30
  },
  credentials: {
    flexDirection: "row",
    gap: 20,
    borderBottomWidth: 1,
    borderBlockColor: "#E8E8E8",
    paddingBottom: 25
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 25
  },
  clientInfo: {
    paddingTop: 10,
    gap: 7
  },
  clientName: {
    fontSize: 14,
    fontWeight: "bold"
  },
  clientNumber: {
    fontSize: 12,
    opacity: 0.3
  },
  removeBtn: {
    fontSize: 12,
    color: "#F67280"
  },
  errorcontent: {
    color: "red",
    alignSelf: "center",
    paddingBottom: 30
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 5
  },
  picker: {
    height: Platform.OS === "ios" ? 200 : 50,
    fontSize: 16
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
