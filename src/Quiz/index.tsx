import {
  View,
  Text,
  Image,
  Button,
  Vibration,
  Dimensions,
  FlatList,
  StatusBar,
  Pressable,
} from 'react-native';
import React, {useRef, useState, useCallback} from 'react';
import TextAnimation from '../Component/TextAnimation';
import Message from '../Component/Message';
import Rive, {Alignment, Fit, RiveRef} from 'rive-react-native';
import CountDown from '../Component/CountDown';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../Navigation/Navigation';
import {DataStore, Predicates} from 'aws-amplify';
import {USER} from '../models';
// import '@azure/core-asynciterator-polyfill';
const {width, height} = Dimensions.get('screen');
const Answer = ['Basketball', 'Football', 'I don’t know!!!', 'Hmmm'];
const Question = [
  {
    question: 'When was AWS official launched?',
    answer: ['2005', '2003', '2008', '2006'],
    result: '2006',
  },
  {
    question: 'What is an IAM Policy',
    answer: [
      'A document that customizes user permissions for AWS services and resources',
      'A temporary access to AWS services or resources',
      'An entity that interacts with AWS services or resources',
      "I don't know",
    ],
    result:
      'A document that customizes user permissions for AWS services and resources',
  },
  {
    question: 'What is AWS EC2?',
    answer: [
      'A data center',
      'A resource monitoring service',
      'A virtual server in the AWS cloud',
      'A serverless compute service',
    ],
    result: 'A virtual server in the AWS cloud',
  },
  {
    question: 'What does EC2 stand for?',
    answer: [
      'Efficient Compute Cloud',
      'Enterprise Compute Cloud',
      'Elastic Compute Cloud',
      'None of above',
    ],
    result: 'Elastic Compute Cloud',
  },
  {
    question: 'With AWS EC2 you only pay for the compute time that you use.',
    answer: ['True', 'False', 'Not Given', "I don't know"],
    resolve: 'True',
  },
  {
    question:
      'A company hosts data in S3. There is a requirement to control access to the S3 buckets. Which are the 2 ways in which this can be achieved?',
    answer: [
      'Use Bucket Policies and IAM user policies',
      'Use the Secure Token Service and AWS Access Keys.',
      'Use AWS Access Keys and IAM user policies.',
      'Use Bucket Policies and AWS Access Keys.',
    ],
    result: 'Use Bucket Policies and IAM user policies',
  },
  {
    question: 'Which of the following is an online backup and storage system?',
    answer: [
      'Amazon Elastic Compute Cloud',
      'Amazon Simple Queue Service',
      'Amazon Simple Notification Service',
      'Amazon Simple Storage System',
    ],
    result: 'Amazon Simple Storage System',
  },
  {
    question: 'Amazon RDS is a distributed …… service by AWS',
    answer: [
      'long term database',
      'relational database',
      'critical database',
      "I don't know",
    ],
    result: 'relational database',
  },
  {
    question:
      'Amazon RDS is a web service that makes it easier to set up, operate and scale a relational database in ……',
    answer: ['the cloud', 'the group', 'the class', "I don't know"],
    result: 'the cloud',
  },
  {
    question:
      'Amazon RDS creates and saves automated …… of RDS database instances.',
    answer: ['headings', 'backups', 'backlinks', "I don't know"],
    result: 'backups',
  },
];
interface Answer {
  item: string;
  index: number;
}
type Props = NativeStackScreenProps<StackParamList, 'Quiz'>;
interface Params {
  time: number;
  score: number;
  numberCorrect: number;
}

const Index = ({navigation, route}: Props) => {
  const name = route.params?.name;
  const alarm = useRef<RiveRef>(null);
  const gift = useRef<RiveRef>(null);
  const character = useRef<RiveRef>(null);
  const [time, setTime] = useState<number>(60 * 4);
  const [mark, setMark] = useState<number>(0);
  const [numberCorrect, setNumberCorrect] = useState<number>(0);
  const [question, setQuestion] = useState<string>(Question[0].question);
  const [page, setPage] = useState(0);
  const [timeStart, setTimeStart] = useState(60 * 4);
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
  const createMark = async (gap: number) => {
    let point = 0;
    if (gap <= 10) {
      point = mark + (1 - gap / 10) * 100;
    } else if (gap <= 20) point = mark + (1 - gap / 20) * 80;
    else if (gap <= 50) {
      point = mark + (1 - gap / 50) * 60;
    } else {
      point = mark + 20;
    }

    let DATA_QUERY = await DataStore.query(USER, user => user.name.eq(name));

    if (DATA_QUERY) {
      await DataStore.save(
        USER.copyOf(DATA_QUERY[0], updated => {
          updated.score = Math.floor(point);
          updated.time = time;
          updated.numberCorrect = numberCorrect + 1;
        }),
      );
    }
    setMark(point);
    setNumberCorrect(numberCorrect + 1);
  };
  const [enablePress, setEnablePress] = useState<boolean>(false);
  const renderMessage = useCallback(
    () => <Message text={question} setEnablePress={setEnablePress} />,
    [page],
  );
  const renderAnswer = ({item, index}: Answer) => {
    return (
      <Pressable
        disabled={enablePress}
        onPress={async () => {
          let timeGap = timeStart - time;
          if (Question[page].result === item) {
            createMark(timeGap);
          }
          if (page < Question.length - 1) {
            setQuestion(Question[page + 1].question);
            setPage(page + 1);
            setEnablePress(true);
          } else {
            let DATA_QUERY = await DataStore.query(USER, user =>
              user.name.eq('21520276'),
            );

            if (DATA_QUERY) {
              await DataStore.save(
                USER.copyOf(DATA_QUERY[0], updated => {
                  updated.time = time;
                }),
              );
            }
            navigation.navigate('Result', {name: name});
          }
          setTimeStart(time);
        }}
        android_ripple={{
          color: 'hsl(0,90%,95%)',
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
        backgroundColor: 'hsl(0,90%,75%)',
        paddingTop: StatusBar.currentHeight,
      }}>
      {/*Header */}
      <View
        style={{
          height: height * 0.3,
          width,
          backgroundColor: 'hsl(0,90%,75%)',
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
            <CountDown time={time} setTime={setTime} text={question} />
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
            {renderMessage()}
          </View>
        </View>
      </View>
      {/*Body */}
      <View
        style={{
          backgroundColor: 'white',
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
            data={Question[page].answer}
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
          style={{
            width: 200,
            height: 60,
            backgroundColor: 'hsl(0,90%,75%)',
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
