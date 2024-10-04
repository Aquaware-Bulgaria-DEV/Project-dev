import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 125,
    flexGrow: 1,
    marginTop: 35,
  },
  // title: {
  //   marginVertical: 10,
  //   fontSize: 24,
  //   fontFamily: 'Muli_700Bold',
  //   lineHeight: 35,
  //   marginHorizontal: 24,
  // },
  text: {
    marginVertical: 35,
  },
  headerTitle: {
    fontSize: 25,
    paddingBottom: 15,
    marginHorizontal: 24,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 15,
    color: 'grey',
    letterSpacing: 0.1,
    lineHeight: 25,
    marginHorizontal: 24,
  },
  tipsButton: {
    width: '88%',
    height: 68,
    borderRadius: 28,
    padding: 0,
    alignSelf: 'center',
    marginBottom: 30,
    position: 'absolute',
    bottom: 30,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 25,
  },
  clientInfo: {
    paddingTop: 10,
    gap: 15,
  },
  clientName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  clientNumber: {
    fontSize: 12,
    opacity: 0.3,
  },
  // removeBtn: {
  //   fontSize: 12,
  //   color: '#F67280',
  // },
  innerContainer: {
    backgroundColor: '#FFFFFF',
    // height: '87%',
    flex: 1,
    marginVertical: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    gap: 30,
  },
  credentials: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    borderRadius: 20,
    marginHorizontal: 25,
    marginVertical: 5,
    alignContent: 'center',
    // position: 'relative',
  },
  numPosition: {
    color: 'blue',
    fontSize: 20,
    position: 'absolute',
    top: 10,
    right: 20,
  },
});
