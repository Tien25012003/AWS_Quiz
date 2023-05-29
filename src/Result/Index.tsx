import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import Rating from '../Setting/Rating';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {StackParamList} from '../Navigation/Navigation';
import {DataStore} from 'aws-amplify';
import {USER} from '../models';
import {Auth} from 'aws-amplify';
import {LIST_CHARACTER} from '../ChooseCharacter/ChooseCharacter';

const {width: WC, height: HC} = Dimensions.get('screen');

type Props = NativeStackScreenProps<StackParamList, 'Result'>;

const Index = ({route, navigation}: Props) => {
  const [user, setUser] = useState<any>();
  const [listUser, setListUser] = useState<any[]>([]);
  const [rankCurrentUser, setRankCurrentUser] = useState<number>(0);
  const name = route.params.name;
  useEffect(() => {
    const getUser = async () => {
      const user = await DataStore.query(USER);
      user.sort((a: any, b: any) => {
        if (a.score < b.score) return 1;
        if (a.score === b.score) {
          if (a.time > b.time) {
            return 1;
          }
          return -1;
        }
        return -1;
      });
      setListUser(user);
      let rankCurrentUser = user.findIndex(u => u.name === name);
      setRankCurrentUser(rankCurrentUser + 1);
      setUser(user[rankCurrentUser]);
    };
    getUser();
  }, []);
  useEffect(() => {
    setListUser([]);
    DataStore.observe(USER).subscribe(async () => {
      const user = await DataStore.query(USER);
      user.sort((a: any, b: any) => {
        if (a.score < b.score) return 1;
        if (a.score === b.score) {
          if (a.time > b.time) {
            return 1;
          }
          return -1;
        }
        return -1;
      });

      let rankCurrentUser = user.findIndex(u => u.name === name);
      setRankCurrentUser(rankCurrentUser + 1);
      setListUser([...user]);
    });
  }, []);
  const [openRating, setOpenRating] = useState(true);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'hsl(0,90%,75%)',
      }}>
      {/*Header */}
      <View
        style={{
          backgroundColor: 'white',
          width: '90%',
          paddingVertical: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: StatusBar.currentHeight && 0 + 100,
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: -50,
            borderWidth: 1,
          }}>
          {LIST_CHARACTER[+user?.nameImage] && (
            <Image
              source={LIST_CHARACTER[user?.nameImage]}
              style={{
                width: 75,
                height: 75,
                resizeMode: 'contain',
              }}
            />
          )}
        </View>
        {/*Name */}
        <Text
          style={{
            color: 'black',
            fontSize: 22,
          }}>
          {user?.name}
        </Text>

        <View
          style={{
            width: WC * 0.8,
            flexWrap: 'wrap',
            backgroundColor: 'hsl(0,90%,75%)',
            padding: 1,
            marginTop: 15,
            gap: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}>
                <AntDesign name="checkcircle" color={'#12D801'} size={35} />
                <View
                  style={{
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Correct
                  </Text>
                  <Text style={{color: 'gray'}}>{user?.numberCorrect}/10</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}>
                <MaterialCommunityIcons
                  name="timer-sand"
                  color={'#FF0000'}
                  size={35}
                />
                <View
                  style={{
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Time
                  </Text>
                  <Text style={{color: 'gray'}}>
                    {Math.floor((240 - user?.time) / 60)} :{' '}
                    {(240 - user?.time) % 60}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              width: '100%',
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <AntDesign name="gift" color={'#FC055E'} size={35} />
                <View
                  style={{
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Score
                  </Text>
                  <Text style={{color: 'gray'}}>
                    {Math.round(user?.score * 100) / 100}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Ionicons name="medal-outline" color={'#E68022'} size={35} />
                <View
                  style={{
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Rank
                  </Text>
                  <Text style={{color: 'gray'}}>{rankCurrentUser}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/*Leader Broad */}
      <Text
        style={{
          fontSize: 24,
          color: 'white',
          margin: 20,
          alignSelf: 'center',
        }}>
        LEADERBOARD
      </Text>

      <View
        style={{
          alignSelf: 'center',
          width: WC * 0.9,
        }}>
        {listUser.map((item, index) => {
          if (index < 8) {
            let color = '#227CE6';
            if (index === 0) color = '#FFB800';
            if (index === 1) color = '#939393';
            if (index === 2) color = '#D26F37';
            return (
              <View
                key={index}
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginVertical: 10,
                  borderRadius: 10,
                }}>
                <Image
                  source={LIST_CHARACTER[+item.nameImage]}
                  style={{width: 80, height: 80, resizeMode: 'contain'}}
                />
                <View>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 14, color: 'black'}}>
                    Score: {item.score}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {index <= 2 && (
                    <Ionicons name="medal-outline" color={color} size={35} />
                  )}
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 17,
                      color: color,
                    }}>
                    {index + 1}
                  </Text>
                </View>
              </View>
            );
          }
        })}
      </View>
      <Pressable
        style={{
          alignSelf: 'center',
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 15,
          marginTop: 20,
        }}
        onPress={async () => {
          await Auth.deleteUser();
          navigation.navigate('SignUp');
        }}>
        <Text style={{color: '#000', fontWeight: '700', fontSize: 20}}>
          Exit
        </Text>
      </Pressable>
      <Rating openRating={openRating} setOpenRating={setOpenRating} />
    </ScrollView>
  );
};

export default Index;
