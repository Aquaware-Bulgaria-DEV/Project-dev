import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    paddingBottom: 125,
    // marginHorizontal: 24,
    marginTop: 35,
  },
  content: {
    margin: 26,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 28,
    marginLeft: 15,
  },
  settingsButton: {
    // width: 331,
    height: 68,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 6,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  gradient: {
    flexDirection: 'row',
    backgroundGradient: 'horizontal',
    height: 68,
    margin: -20,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
  },
  textGradient: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'center',
    marginLeft: 20,
  },
  text: {
    color: '#999999',
    fontSize: 18,
  },
});
