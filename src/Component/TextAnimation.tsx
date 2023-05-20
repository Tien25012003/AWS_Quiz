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
    setSentences([]);
    setNumber(0);
  }, [text]);
  useEffect(() => {
    setTimeout(() => {
      if (number < listTxt.length) {
        setSentences([...sentences, listTxt[number]]);

        setNumber(number + 1);
      }
    }, 200);
  }, [number]);
  return (
    <View style={{width: WD * 0.5, marginLeft: 20, marginTop: 5}}>
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
