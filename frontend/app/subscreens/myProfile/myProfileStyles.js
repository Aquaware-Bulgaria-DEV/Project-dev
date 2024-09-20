import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    paddingTop: Platform.OS === 'ios' ? 38 : 0, 
    // paddingBottom: 125,
    // marginHorizontal: 24,
    // marginTop: 35,
  },
  content: {
    marginHorizontal: 26,
    justifyContent: 'center',
    height: '100%',
    borderRadius: 5,
  },
  reqContainer: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  content: {
    marginTop: 20,
    marginHorizontal: 26,
    gap: 2,
  },
  pickerContainer: {
    backgroundColor: '#F9F9F9',
    // borderRadius: 20,
    height: 54,
    justifyContent: 'center',
  },
  screenLabel: {
    fontSize: 26,
    color: 'black',
    marginBottom: 4,
    textShadowColor: '#000', // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5,
  },
  otherDetails: {
    color: 'grey',
    marginVertical: 1,
  },
  innerContainer: {
    backgroundColor: '#FFFFFF',
    height: '90%',
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
    borderBottomWidth: 1,
    borderBlockColor: '#E8E8E8',
    paddingBottom: 20,
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 25,
  },
  clientInfo: {
    paddingTop: 10,
    gap: 14,
  },
  clientName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  clientNumber: {
    fontSize: 12,
    opacity: 0.3,
  },
  removeBtn: {
    fontSize: 12,
    color: '#F67280',
  },
  form: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputField: {
    height: 54,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    marginVertical: 15,
    // borderRadius: 20,
    backgroundColor: '#F9F9F9',
  },
  inputFieldName: {
    color: 'grey',
    fontSize: 18,
    flex: 1,
    paddingHorizontal: 16,
  },
  saveButton: {
    width: '100%',
    height: 68,
    borderRadius: 28,
    padding: 0,
    marginTop: 15,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  pickerItem: {
    fontSize: 16,
    color: '#000',
    marginLeft: 20,
    marginVertical: 15,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3F9FF4',
    borderRadius: 50,
    padding: 5,
    margin: 6,
  },
  removeBtn: {
    fontSize: 12,
    color: '#F67280',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    marginBottom: 20,
  },
  passwordInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalCancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalConfirmButton: {
    backgroundColor: '#388FED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
  },
  confirmButtonText: {
    color: 'white',
  },
  modalButton: {
    backgroundColor: '#388FED',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalInput: {
    marginBottom: 20,
  },
});
