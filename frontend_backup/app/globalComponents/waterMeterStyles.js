import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  waterMeterContainer: {
    gap: 20
  },
  labels: {
    fontSize: 20,
    color: '#999999',
    paddingLeft: 15,
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 68,
    justifyContent: 'center'
  },
  pickerItem: {
    fontSize: 16,
    color: '#000'
  },
  hr:{
    borderBottomWidth: 1,
    borderBottomColor: '#999999',
    opacity: .1
  }
});
