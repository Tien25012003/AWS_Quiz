import {View, Text} from 'react-native';
import React from 'react';
import TextAnimation from '../Component/TextAnimation';
import Message from '../Component/Message';

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {/*Header */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'blue',
        }}></View>
      {/*Body */}
      <View
        style={{
          flex: 2,
        }}>
        <Message />
      </View>
    </View>
  );
};

export default index;
