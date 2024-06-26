import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 125,
    marginTop: 35,
  },
  contentContainer: {
    margin: 26,
    justifyContent: 'center',
    gap: 20
  },
  title: {
    fontSize: 28,
    marginBottom: 28,
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
  waterMeterContainer: {
    gap: 30,
  },
  addWaterMeter: {
    fontSize: 20,
    alignItems: 'center',
    color: '#3CA5D8',
    textDecorationLine: 'underline'
  }
});
