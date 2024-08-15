import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 125,
    // marginHorizontal: 24,
    marginTop: 35
  },
  contentContainer: {
    margin: 26,
    justifyContent: "center"
  },
  title: {
    fontSize: 28,
    marginBottom: 28,
    marginLeft: 15,
    textShadowColor: '#000', // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5,
  },
  dataContainer: {
    color: 'black',
    gap: 10,
    marginBottom: 20
  },
  dataLabel:{
    opacity: 0.5,
    marginLeft: 15,
    fontSize: 20,
  },
  dataNameWrapper: {
    marginLeft: 10,
    backgroundColor: '#fff',
    height: 68,
    borderRadius: 20,
    justifyContent: 'center',
  },
  dataName: {
    fontSize: 20,
    opacity: .5,
    marginLeft: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginLeft: 15,
  },
  dateLabel: {
   fontSize: 16,
   color: 'black',
   opacity: .5 
  },
  date: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    opacity: .5,
  }

});
