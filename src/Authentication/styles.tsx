import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  press: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 99,
  },
  or: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  chatbox: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'hsl(0,0%,80%)',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  square: {
    position: 'absolute',
    bottom: -10,
    width: 20,
    height: 20,
    backgroundColor: 'hsl(0,0%,80%)',
    left: 20,
    transform: [{rotate: '45deg'}],
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
export default styles;
