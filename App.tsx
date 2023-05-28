import {View, Text, StatusBar} from 'react-native';
import React, {useState} from 'react';
import Navigation from './src/Navigation/Navigation';
const App = () => {
  const [openRating, setOpenRating] = useState(true);
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
