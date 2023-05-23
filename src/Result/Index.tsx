import {View, Text, Image} from 'react-native';
import React from 'react';

const Index = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#227CE6',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/*Header */}
      <View
        style={{
          backgroundColor: 'white',
          width: '90%',
          paddingVertical: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: -50,
          }}>
          <Image
            source={{uri: 'https://img.icons8.com/fluency/48/smurf.png'}}
            style={{width: 75, height: 75, resizeMode: 'contain'}}
          />
        </View>
        {/*Name */}
        <Text
          style={{
            color: 'black',
            fontSize: 22,
          }}>
          Nguyen Van A
        </Text>
        {/*Emal */}
        <Text
          style={{
            color: 'gray',
            fontSize: 16,
          }}>
          nguyenvana@gmail.com
        </Text>
        <View
          style={{
            width: '80%',
            paddingHorizontal: 1,
            paddingVertical: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: 'black',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
            <Text>Core</Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
            <Text>Core</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Index;
