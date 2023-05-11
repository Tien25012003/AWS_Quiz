import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Draft from './src/Draft';
import SignUp from './src/Authentication/SignUp';
import InitialScreen from './src/Authentication/InitialScreen';
import Rating from './src/Setting/Rating';
const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Rating />
    </View>
  );
};

export default App;
