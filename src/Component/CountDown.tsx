import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import Rive from 'rive-react-native';
interface Props {
  time: number;
  setTime: Function;
}
const CountDown = ({time, setTime}: Props) => {
  useEffect(() => {
    setTimeout(() => {
      if (time > 0) setTime(time - 1);
    }, 1000);
  }, [time]);
  return (
    <Text
      style={{
        fontSize: 20,
        color: 'white',
      }}>
      {time}
    </Text>
  );
};

export default CountDown;
