import {StyleSheet} from 'react-native'
import globalStyles from '../globalStyles'

export const styles = StyleSheet.create({
    container: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalStyles.primaryColor,
        padding: 16,
        borderRadius: 16,
    },
    btn: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    gradient: {
        flexDirection: 'row',
        backgroundGradient: 'horizontal',
        height: 68,
        // margin: -20,
        // paddingRight: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
      },
})