import { StyleSheet } from 'react-native';

const CARD_HEIGHT = 170;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollViewContent: {
    paddingBottom: 125,
    // marginHorizontal: 24,
    marginTop: 35,
  },
  headerTitle: {
    fontSize: 25,
    paddingBottom: 15,
    marginHorizontal: 24,
  },
  description: {
    fontSize: 15,
    color: 'grey',
    letterSpacing: 0.1,
    lineHeight: 25,
    marginHorizontal: 24,
  },
  paddingZero: {
    padding: 0,
  },
  text: {
    marginVertical: 35,
    // fontStyle: 'normal',
  },
  rooms: {
    height: CARD_HEIGHT,
    justifyContent: 'flex-end',
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 24,
    marginVertical: 10,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  roomText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Muli_700Bold',
    // fontWeight: 'bold',
    marginBottom: 8,
    // fontStyle: 'bolder',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 68,

    width: '88%',
    alignSelf: 'center',
  },
  pickerItem: {
    fontSize: 18,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height: 68,
    // marginTop: 20,
    marginLeft: 15,
  },
  // devices: {
  //   color: "white",
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   fontStyle: "bolder",
  // },
});
