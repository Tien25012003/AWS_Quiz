import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Button,
  Pressable,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {useRef, useEffect, useState, useReducer} from 'react';
import Rive, {RiveRef, Fit, LoopMode, Direction} from 'rive-react-native';
const {width, height} = Dimensions.get('screen');
const STATE_MACHINE = 'State Machine 3';
const STATE_MACHINE_STAR = 'State Machine 1';
const STAR_WIDTH = (width - 40) / 5;
const CLICK = 'CLICK';
interface Action {
  type: string;
  index: number;
}
const initialState: Array<boolean> = [...new Array(5).fill(false)];
const Reducer = (state: Array<boolean>, action: Action): Array<boolean> => {
  switch (action.type) {
    case CLICK:
      //console.log('Click');
      for (let i = 0; i <= action.index; i++) {
        state[i] = true;
      }
      for (let i = state.length - 1; i > action.index; i--) {
        state[i] = false;
      }
      return [...state];
    default:
      return [...state];
  }
};
type Props = {
  setOpenRating: Function;
  openRating: boolean;
};
const Rating = ({setOpenRating, openRating}: Props) => {
  const BtnRef = useRef<RiveRef>(null);
  const StarRef = useRef<RiveRef>(null);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [emotion, setEmotion] = useState('Sad');
  const onSubmit = () => {
    BtnRef.current?.setInputState(STATE_MACHINE, 'clicked?', true);
    setOpenRating(false);
    //BtnRef.current?.setInputState(STATE_MACHINE, 'waveR?', true);
  };
  useEffect(() => {
    setTimeout(() => {
      BtnRef.current?.setInputState(STATE_MACHINE, 'waveR?', true);
    }, 2000);
    setTimeout(() => {
      BtnRef.current?.setInputState(STATE_MACHINE, 'waveR?', false);
    }, 4000);
  }, []);
  useEffect(() => {
    let index = state.findIndex(s => s === false);
    switch (index) {
      case 0:
        setEmotion('Sad');
        break;
      case 1:
        setEmotion('Sad');
        break;
      case 2:
        setEmotion('Depressive');
        break;
      case 3:
        setEmotion('Puppy Eyes');
        break;
      case 4:
        setEmotion('Big Smile');
        break;
      case -1:
        setEmotion('Timid');
        break;
      default:
        break;
    }
  }, [state]);
  const onStarPress = (s: boolean, index: number) => {
    if (index === 0) {
      StarRef.current?.play(
        `${index + 1}_star`,
        LoopMode.Auto,
        Direction.Auto,
        false,
      );
    } else {
      StarRef.current?.play(
        `${index + 1}_stars`,
        LoopMode.Auto,
        Direction.Auto,
        false,
      );
    }
    dispatch({type: CLICK, index: index});
  };
  return (
    <Modal
      visible={openRating}
      onRequestClose={() => setOpenRating(false)}
      statusBarTranslucent
      animationType="slide">
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              marginTop: 50,
            }}>
            <Rive
              resourceName="emoji"
              artboardName={emotion}
              autoplay={true}
              style={{
                height: height * 0.2,
                width: 200,
              }}
              fit={Fit.Contain}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Rive
              resourceName="rating"
              artboardName={'New Artboard'}
              stateMachineName={STATE_MACHINE_STAR}
              autoplay={true}
              style={{
                height: 100,
                width,
              }}
              ref={StarRef}
              fit={Fit.FitWidth}
            />
            <View style={styles.star_press}>
              {state.map((s, index) => {
                return (
                  <Pressable
                    key={index}
                    style={{
                      width: STAR_WIDTH,
                      height: 100,
                    }}
                    onPress={() => onStarPress(s, index)}
                  />
                );
              })}
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: 50}}>
            <Rive
              resourceName="button"
              artboardName="Get Started"
              stateMachineName={STATE_MACHINE}
              autoplay={true}
              style={{
                height: height * 0.2,
                width: width,
              }}
              ref={BtnRef}
              fit={Fit.FitWidth}
            />
            <Pressable style={styles.submit} onPress={onSubmit} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  star_press: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  submit: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.25,
    width: width * 0.5,
    height: 80,
    zIndex: 99,
  },
});
export default Rating;
