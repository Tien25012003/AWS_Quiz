import {Text} from 'react-native';
import React, {useEffect} from 'react';

interface Props {
  text: string;
  time: number;
  setTime: Function;
}
const CountDown = ({text, time, setTime}: Props) => {
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
      {Math.floor(time / 60)} : {time % 60 < 10 ? `0${time % 60}` : time % 60}
    </Text>
  );
};

export default CountDown;
