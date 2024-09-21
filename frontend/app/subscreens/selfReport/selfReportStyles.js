import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 125,
    // marginHorizontal: 24,
    marginTop: 35,
  },
  contentContainer: {
    margin: 26,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 28,
    marginLeft: 15,
    textShadowColor: '#000', // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5,
  },
  settingsBtn: {
    height: 68,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 6,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  }, 
  noData: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999999',
    fontWeight: 'bold',
   }
});
