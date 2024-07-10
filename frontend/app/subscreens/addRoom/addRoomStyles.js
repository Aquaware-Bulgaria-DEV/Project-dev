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
  },
  form: {
    marginHorizontal: 3,
  },
  text: {
    marginVertical: 7,
    color: 'grey',
    fontSize: 18,
    flex: 1,
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
  inputField: {
    height: 68,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
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
  saveButton: {
    width: '88%',
    height: 68,
    borderRadius: 28,
    padding: 0,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
