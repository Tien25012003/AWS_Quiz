import {
  View,
  Text,
  Image,
  Button,
  Vibration,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import TextAnimation from '../Component/TextAnimation';
import Message from '../Component/Message';
import Rive, {Alignment, Fit, RiveRef} from 'rive-react-native';
import CountDown from '../Component/CountDown';
import {useEffect} from 'react';
const {width, height} = Dimensions.get('screen');
const Answer = ['Basketball', 'Football', 'I don’t know!!!', 'Hmmm'];
interface Answer {
  item: string;
  index: number;
}
const Index = () => {
  const alarm = useRef<RiveRef>(null);
  const gift = useRef<RiveRef>(null);
  const character = useRef<RiveRef>(null);
  const [time, setTime] = useState<number>(5);
  const [mark, setMark] = useState<number>(0);
  useEffect(() => {
    gift.current?.fireState('State Machine 1', 'Play');
    character.current?.fireState('State Machine 1', 'Welcome');
  }, []);
  useEffect(() => {
    alarm.current?.setInputState('Motion', 'Alarm', time < 10 ? true : false);
    if (time < 10) {
      character.current?.fireState('State Machine 1', 'Mind');
    } else {
      character.current?.fireState('State Machine 1', 'Welcome');
    }
  }, [time]);
  const renderAnswer = ({item, index}: Answer) => {
    return (
      <Pressable
        android_ripple={{
          color: 'hsl(220,98%,83%)',
          radius: 100,
        }}
        style={{
          flex: 1,
          height: 100,
          borderRadius: 10,
          marginHorizontal: 10,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1.5,
        }}>
        <Text
          adjustsFontSizeToFit
          style={{
            color: 'black',
            fontSize: 16,
          }}>
          {item}
        </Text>
      </Pressable>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {/*Header */}
      <View
        style={{
          height: height * 0.3,
          width,
          backgroundColor: '#227CE6',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 50,
                height: 50,
              }}>
              <Rive
                ref={alarm}
                stateMachineName="Motion"
                resourceName="alarm_icon"
                artboardName="New Artboard"
                autoplay={false}
              />
            </View>
            <CountDown time={time} setTime={setTime} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 50,
                height: 50,
              }}>
              <Rive
                ref={gift}
                resourceName="giftbox"
                stateMachineName="State Machine 1"
                artboardName="Composition"
                autoplay={true}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
              }}>
              {mark}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '79%',
              width: 150,
            }}>
            <Rive
              resourceName="character_emotion"
              artboardName="tes"
              stateMachineName="State Machine 1"
              ref={character}
              autoplay={true}
              fit={Fit.Cover}
              alignment={Alignment.TopCenter}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Message text="Hello, My name is khang, nice to meet you, How are you today" />
          </View>
        </View>
      </View>
      {/*Body */}
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            color: 'gray',
            textAlign: 'center',
            marginTop: 10,
            fontSize: 16,
            marginBottom: 20,
          }}>
          Select the correct answer
        </Text>
        <View>
          <FlatList
            data={Answer}
            renderItem={renderAnswer}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          />
        </View>
        <Pressable
          onPress={() => {
            console.log('preess');
            setTime(30);
          }}
          style={{
            width: 200,
            height: 60,
            backgroundColor: '#227CE6',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 10,
          }}>
          <View style={{width: 80, height: 50}}>
            <Rive
              resourceName="can_go_next"
              stateMachineName="State Machine 1"
              artboardName="arrow-right-solid.svg"
              autoplay={true}
              fit={Fit.Fill}
              alignment={Alignment.Center}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Index;
