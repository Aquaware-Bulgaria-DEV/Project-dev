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
    progressContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 25
    },
    subContainer: {
        alignItems: 'center',
        gap: 15
    },
    textContainer: {
        alignItems: 'center',
        // gap: 5,
    },
    quantity: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    tip: {
        color: '#339DFA',
        fontWeight: 'bold'
    },
})