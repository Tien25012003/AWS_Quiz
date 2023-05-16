import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import TextAnimation from './TextAnimation';
const {width, height} = Dimensions.get('screen');
const Message = () => {
  return (
    <Svg>
      <Path
        d={`M 1 0 C 1 0 1 0 1 0 H 30 Q 31 0 31 1 V 3 Q 31 4 30 4 H 3 L 2 5 V 4 H 1 Q 0 4 0 3 V 1 Q 0 0 1 0`}
        scale={10}
        stroke={'black'}
        strokeWidth={0.2}
        fill={'none'}
      />
      <TextAnimation text={'When was AWS official launched?'} />
    </Svg>
  );
};

export default Message;
