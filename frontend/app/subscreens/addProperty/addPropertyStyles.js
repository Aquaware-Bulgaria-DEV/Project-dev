import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
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
    textShadowColor: '#000', // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5,
  },
  form: {
    marginHorizontal: 3,
  },
  inputField: {
    height: 68,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  numPeople: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 68,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  text: {
    color: 'grey',
    fontSize: 18,
    flex: 1,
  },
  inputNumPeople: {
    height: 34,
    width: 36,
    paddingHorizontal: 5,
    backgroundColor: '#C0C0C0',
    color: 'black',
    textAlign: 'center',
    borderRadius: 3,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedOption: {
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
  addButton: {
    marginHorizontal: 28,
    borderRadius: 17,
    justifyContent: 'center',
    height: 54,
  },
  addText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  plusText: {
    color: '#3CA5D8',
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 18,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 68,
    justifyContent: 'center',
  },
  pickerItem: {
    fontSize: 16,
    color: '#000',
    marginLeft: 20,
  },
});
