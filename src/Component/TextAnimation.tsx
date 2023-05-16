import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
type Props = {
  text: string;
};
const {width: WD} = Dimensions.get('screen');
const TextAnimation = ({text}: Props) => {
  const listTxt = useRef<string[]>(text.split(' ')).current;
  const [sentences, setSentences] = useState<string[]>([]);

  const [number, setNumber] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (number < listTxt.length) {
        setSentences([...sentences, listTxt[number]]);

        setNumber(number + 1);
      }
    }, 200);
  }, [number]);
  return (
    <View
      style={{
        flexWrap: 'wrap',
        maxWidth: WD * 0.5,
      }}>
      <Text
        style={{
          fontSize: 16,
          color: 'black',
        }}>
        {sentences.join(' ')}
      </Text>
    </View>
  );
};

export default TextAnimation;
