import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollViewContent: {
    paddingBottom: 125,
    marginTop: 35,
  },
  content: {
    marginHorizontal: 20,
  },
  pic: {
    height: 190,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 25,
    borderRadius: 8,
  },
  title: {
    fontFamily: 'Muli',
    fontSize: 30,
    fontFamily: 'Muli_700Bold',
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 19,
    marginHorizontal: 10,
    letterSpacing: 0.1,
    lineHeight: 25,
  },
});
