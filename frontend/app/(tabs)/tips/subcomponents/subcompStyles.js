import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  titleContainer: {
    height: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 24,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Muli_700Bold',
  },
  listContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    marginHorizontal: 60,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 7.3,
    elevation: 8,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  itemText: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Muli_700Bold',
  },
  selectedItemText: {
    fontSize: 12,
    fontFamily: 'Muli_700Bold',
    color: '#5B73E8',
  },
  accountContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountTitle: {
    fontSize: 18,
    marginBottom: 6,
    fontFamily: 'Muli_700Bold',
    color: '#151515',
  },
  userIcon: {
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  accountSubtitle: {
    fontSize: 14,
    color: '#707070',
    paddingBottom: 18,
  },
  categories: {
    marginVertical: 20,
    marginLeft: 32,
    marginRight: 24,
    fontSize: 25,
    fontFamily: 'Muli_700Bold',
  },
  background: {
    height: 240,
    justifyContent: 'flex-end',
  },
  tipText: {
    color: 'white',
    fontSize: 27,
    fontFamily: 'Muli_700Bold',
    paddingHorizontal: 5,
    paddingBottom: 20,
    textAlign: 'center',
  },
  arrow: {
    justifyContent: 'flex-end',
    color: '#9DC0F4',
    alignSelf: 'center',
  },
  account: { flexDirection: 'row' },
  profile: {
    color: 'black',
  },
});
