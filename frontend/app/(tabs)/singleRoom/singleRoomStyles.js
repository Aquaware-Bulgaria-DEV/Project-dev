import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    scrollView: {
      flexGrow: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
      paddingBottom: 125,
      marginTop: 35,
    },
    dataContainer: {
      flex: 1,
      marginTop: 10,
      paddingHorizontal: 25,
    },
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',
      // gap: 50
    },
    roomInfo: {
      
    },
    roomName: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 20,
    },
    activeDevices: {
      color: 'gray'
    },
    progressContainer: {
      // justifyContent: 'space-around',
      alignItems: 'center'
    }
})