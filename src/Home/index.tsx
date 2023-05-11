import {View, Text, Button, Pressable, Dimensions} from 'react-native';
import React, {useRef, useEffect} from 'react';
import Rive, {RiveRef, Fit, Alignment} from 'rive-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Svg} from 'react-native-svg';
const {width: WD} = Dimensions.get('screen');
const index = () => {
  const runRef = useRef<RiveRef>(null);
  const animatedViewWidth = useSharedValue(WD * 0.6);
  const animatedViewHeight = useSharedValue(70);
  const animatedViewRadius = useSharedValue(10);
  const animatedTextOpacity = useSharedValue(1);
  const animatedViewOpacity = useSharedValue(0);
  const animatedViewScale = useSharedValue(1);
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      width: animatedViewWidth.value,
      height: animatedViewHeight.value,
      borderRadius: animatedViewRadius.value,
      transform: [{scale: animatedViewScale.value}],
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedTextOpacity.value,
    };
  });
  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedViewOpacity.value,
    };
  });

  const handlePlay = () => {
    animatedViewHeight.value = withTiming(55);
    animatedViewWidth.value = withTiming(55);
    animatedViewRadius.value = withTiming(60);
    animatedViewOpacity.value = withTiming(1);
    animatedTextOpacity.value = withTiming(0);
    // setTimeout(() => {
    //   animatedViewScale.value = withTiming(20);
    // }, 2000);
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  return (
    <View style={{flex: 1}}>
      <Rive
        resourceName="spring_demo"
        autoplay={true}
        fit={Fit.FitHeight}
        stateMachineName="Motion"
        artboardName="LadScape"
      />

      <Animated.View
        style={[
          {
            borderWidth: 1.5,
            height: 80,
            borderStyle: 'dashed',
            width: 80,
            borderRadius: 100,
            borderColor: 'hsl(35,97%,55%)',
            position: 'absolute',
            bottom: 37.5,
            alignSelf: 'center',
            transform: [{rotate: '-50deg'}],
          },
          animatedBorderStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            borderWidth: 1.5,
            height: 70,
            borderStyle: 'dashed',
            width: 70,
            borderRadius: 100,
            borderColor: 'hsl(35,97%,60%)',
            position: 'absolute',
            bottom: 42.5,
            alignSelf: 'center',
          },
          animatedBorderStyle,
        ]}
      />
      <AnimatedPressable
        onPress={handlePlay}
        style={[
          {
            //   width: '60%',
            //   height: 70,
            position: 'absolute',
            bottom: 50,
            alignSelf: 'center',
            backgroundColor: 'hsl(0,90%,66%)',
            justifyContent: 'center',
            alignItems: 'center',
            //   borderRadius: 10,
            flexDirection: 'row',
            paddingHorizontal: 10,
          },
          animatedViewStyle,
        ]}>
        <Animated.Text
          style={[
            {
              color: 'white',
              fontSize: 18,
              letterSpacing: 1,
              position: 'absolute',
              zIndex: 999,
            },
            animatedTextStyle,
          ]}>
          Start Quiz!
        </Animated.Text>
        <Rive
          ref={runRef}
          resourceName="rocket_demo"
          autoplay={true}
          fit={Fit.None}
          style={{
            width: WD * 0.6,
            height: 70,
          }}
          alignment={Alignment.Center}
          stateMachineName="State Machine 1"
          artboardName="New Artboard"
        />
      </AnimatedPressable>
    </View>
  );
};

export default index;
