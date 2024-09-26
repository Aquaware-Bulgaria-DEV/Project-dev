import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 125,
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
    textShadowColor: '#000', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  settingsButton: {
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
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
