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
      paddingHorizontal: 25,
    },
    wrapper: {
      gap: 5,
      justifyContent: 'space-between',
    },
    roomInfo: {
      
    },
    roomName: {
      color: '000',
      fontWeight: 'bold',
      fontSize: 20,
    },
    activeDevices: {
      color: 'gray'
    },
    progressContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    }
})