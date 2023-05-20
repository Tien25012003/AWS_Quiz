import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Draft from './src/Draft';
import SignUp from './src/Authentication/SignUp';
import InitialScreen from './src/Authentication/InitialScreen';
import Rating from './src/Setting/Rating';
import Navigation from './src/Navigation/Navigation';
import Quiz from './src/Quiz/index';
import Home from './src/Home/index';
const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar translucent backgroundColor={'transparent'} />
      {/* <Navigation /> */}
      {/* <Quiz /> */}
      <Quiz />
    </View>
  );
};

export default App;
