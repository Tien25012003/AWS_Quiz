import {
  View,
  Text,
  Dimensions,
  Pressable,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Rive, {RiveRef, Fit} from 'rive-react-native';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const {width, height} = Dimensions.get('screen');
const MOTION = 'Motion';
const InitialScreen = () => {
  const Ref = useRef<RiveRef>(null);
  const textOpacity = useRef(new Animated.Value(0)).current;
  const [trigger, setTrigger] = useState(false);
  const [numDrag, setNumDrag] = useState(0);
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    if (trigger && numDrag < 100) {
      setTimeout(() => setNumDrag(numDrag + 1), 1);
    }
  });
  useEffect(() => {
    Ref.current?.setInputState(MOTION, 'numDrag', numDrag);
    setTimeout(() => {
      Ref.current?.setInputState(MOTION, 'numLoad', 30);
    }, 2000);
  }, [numDrag]);
  const onPress = () => {
    setTrigger(true);
    LayoutAnimation.configureNext({
      duration: 2000,
      create: {type: 'linear', property: 'opacity', delay: 3000},
      delete: {type: 'linear', property: 'opacity'},
    });
    setShowText(true);
  };
  useEffect(() => {
    setTimeout(() => console.log('finish'), 6500);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#20062f',
      }}>
      <View style={{height: height * 0.8}}>
        <Rive
          resourceName="pull_to_refresh"
          artboardName="New Artboard"
          stateMachineName={MOTION}
          autoplay={true}
          style={{
            //height: height * 0.3,
            width,
          }}
          ref={Ref}
          fit={Fit.Cover}
        />
      </View>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {justifyContent: 'flex-end', alignItems: 'center'},
        ]}
        //onPress={() => setTrigger(true)}
        onPress={onPress}
        disabled={trigger}>
        {showText && (
          <View style={{position: 'absolute', bottom: 50}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 40,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Welcome to AWS
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default InitialScreen;
