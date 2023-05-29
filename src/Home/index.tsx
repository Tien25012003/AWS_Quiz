import {View, Pressable, Dimensions} from 'react-native';
import React, {useRef} from 'react';
import Rive, {RiveRef, Fit, Alignment} from 'rive-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {StackParamList} from '../Navigation/Navigation';
import {DataStore} from 'aws-amplify';
const {width: WD} = Dimensions.get('screen');
type Props = NativeStackScreenProps<StackParamList, 'Home'>;

const Index = ({navigation, route}: Props) => {
  const runRef = useRef<RiveRef>(null);
  const animatedViewWidth = useSharedValue(WD * 0.6);
  const animatedViewHeight = useSharedValue(70);
  const animatedViewRadius = useSharedValue(10);
  const animatedTextOpacity = useSharedValue(1);
  const animatedViewOpacity = useSharedValue(0);
  const animatedViewScale = useSharedValue(1);
  const animatedRotate_1 = useSharedValue(0);
  const animatedRotate_2 = useSharedValue(0);
  const animatedScale = useSharedValue(0);
  const animatedOpacity = useSharedValue(1);
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
  const animatedBorderStyle_1 = useAnimatedStyle(() => {
    return {
      opacity: animatedViewOpacity.value,
      transform: [
        {rotate: `${interpolate(animatedRotate_1.value, [0, 1], [0, 360])}deg`},
      ],
    };
  });
  const animatedBorderStyle_2 = useAnimatedStyle(() => {
    return {
      opacity: animatedViewOpacity.value,
      transform: [
        {rotate: `${interpolate(animatedRotate_2.value, [0, 1], [360, 0])}deg`},
      ],
    };
  });
  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });
  const animatedScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: interpolate(animatedScale.value, [0, 1], [1, 30])}],
    };
  });
  const handlePlay = () => {
    DataStore.clear();
    animatedViewHeight.value = withTiming(55);
    animatedViewWidth.value = withTiming(55);
    animatedViewRadius.value = withTiming(60);
    animatedViewOpacity.value = withTiming(1);
    animatedTextOpacity.value = withTiming(0);
    animatedRotate_1.value = withRepeat(withTiming(1), -1, true);
    animatedRotate_2.value = withRepeat(withTiming(1), -1, true);
    setTimeout(() => {
      animatedOpacity.value = 0;
      animatedScale.value = withTiming(1, {duration: 2000});
    }, 3000);
    setTimeout(() => {
      navigation.navigate('ChooseCharacter');
    }, 5000);
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
          },
          animatedBorderStyle_1,
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
          animatedBorderStyle_2,
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
          animatedScaleStyle,
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
        <Animated.View style={animatedOpacityStyle}>
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
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
};

export default Index;
