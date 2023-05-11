import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Home from './src/Home/index';
import Quiz from './src/Quiz';
const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <Quiz />
    </View>
  );
};

export default App;
