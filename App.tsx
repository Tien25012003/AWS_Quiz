import {View, StatusBar, LogBox} from 'react-native';
import React from 'react';
import Navigation from './src/Navigation/Navigation';
const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <Navigation />
    </View>
  );
};

export default App;
