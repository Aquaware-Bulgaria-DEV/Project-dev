import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      paddingBottom: 125,
      marginTop: 35,
    },
    dataContainer: {
      marginTop: 10,
      paddingHorizontal: 25
    },
    roomInfo: {
      gap: 5,
    },
    roomName: {
      color: '000',
      fontWeight: 'bold',
      fontSize: 20,
    },
    activeDevices: {
      color: 'gray'
    }
})