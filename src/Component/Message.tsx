import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import TextAnimation from './TextAnimation';
const {width: WD, height: H} = Dimensions.get('screen');
type Props = {
  text: string;
};
const Message = ({text}: Props) => {
  return (
    <Svg translateX={-15} translateY={1}>
      <Path
        d={`M 1 0 H ${WD * 0.05} Q ${WD * 0.05 + 1} 0 ${WD * 0.05 + 1} 1 V ${
          H * 0.02
        } Q ${WD * 0.05 + 1} ${H * 0.02 + 1} ${WD * 0.05} ${H * 0.02 + 1} H ${
          WD * 0.05 * 0.5
        } L 6 ${H * 0.02 + 3} L 6 ${H * 0.02 + 1} H 1  Q 0 ${H * 0.02 + 1} 0 ${
          H * 0.02 - 1
        } V 1 Q 0 0 1 0`}
        scale={10}
        stroke={'black'}
        strokeWidth={0.2}
        fill={'white'}
        translateX={15}
      />
      <TextAnimation text={text} />
    </Svg>
  );
};

export default Message;
