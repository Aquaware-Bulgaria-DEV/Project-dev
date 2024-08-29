import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    yesButton: {
      backgroundColor: "#fff", 
      width: 50,
      padding: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#FF5C5C',
    },
    noButton: {
      backgroundColor: "#fff", 
      width: 50,
      padding: 10,
      borderColor: "#CCC",
      borderWidth: 2,
      borderRadius: 5
    },
    buttonTextYes: {
      color: "#C7253E", 
      fontWeight: "bold",
      textAlign: "center",
    },
    buttonTextNo: {
      color: "#686D76", 
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      fontSize: 18,
      textAlign: "center"
    }
  });