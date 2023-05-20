import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useRef, useCallback, useState, useMemo} from 'react';
type Props = {
  text: string;
  width?: number;
  marginLeft?: number;
};
const {width: WD} = Dimensions.get('screen');
const TextAnimation = ({text, width = WD * 0.5, marginLeft = 20}: Props) => {
  const listTxt = useMemo(() => text.split(' '), [text]);
  let clear = useMemo(() => false, [text]);
  const [sentences, setSentences] = useState<string[]>([]);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (number < listTxt.length) {
        setSentences([...sentences, listTxt[number]]);
        setNumber(number + 1);
      }
    }, 100);
  }, [number]);
  useEffect(() => {
    setSentences([]);
    setNumber(0);
  }, [text]);

  return (
    <View style={{width: width, marginLeft, marginTop: 5}}>
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
