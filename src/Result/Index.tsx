import {View, Text, Image, Dimensions, StatusBar} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import Rating from '../Setting/Rating';

const {width: WC, height: HC} = Dimensions.get('screen');
const sortLevelRank = [
  {
    image:
      'https://w7.pngwing.com/pngs/152/259/png-transparent-cartoon-character-animation-game-cartoon-characters-video-game-boy-cartoon-thumbnail.png',
    name: 'Doan Tan Khang',
    score: 5555,
    rank: 1,
  },
  {
    image:
      'https://w7.pngwing.com/pngs/152/259/png-transparent-cartoon-character-animation-game-cartoon-characters-video-game-boy-cartoon-thumbnail.png',
    name: 'Doan Tan Khang',
    score: 5555,
    rank: 2,
  },
  {
    image:
      'https://w7.pngwing.com/pngs/152/259/png-transparent-cartoon-character-animation-game-cartoon-characters-video-game-boy-cartoon-thumbnail.png',
    name: 'Doan Tan Khang',
    score: 5555,
    rank: 3,
  },
  {
    image:
      'https://w7.pngwing.com/pngs/152/259/png-transparent-cartoon-character-animation-game-cartoon-characters-video-game-boy-cartoon-thumbnail.png',
    name: 'Doan Tan Khang',
    score: 5555,
    rank: 4,
  },
  {
    image:
      'https://w7.pngwing.com/pngs/152/259/png-transparent-cartoon-character-animation-game-cartoon-characters-video-game-boy-cartoon-thumbnail.png',
    name: 'Doan Tan Khang',
    score: 5555,
    rank: 5,
  },
];
const Index = () => {
  const [openRating, setOpenRating] = useState(true);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#227CE6',
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
          }}>
          <Image
            source={{uri: 'https://img.icons8.com/fluency/48/smurf.png'}}
            style={{width: 75, height: 75, resizeMode: 'contain'}}
          />
        </View>
        {/*Name */}
        <Text
          style={{
            color: 'black',
            fontSize: 22,
          }}>
          Nguyen Van A
        </Text>
        {/*Emal */}
        <Text
          style={{
            color: 'gray',
            fontSize: 16,
          }}>
          nguyenvana@gmail.com
        </Text>
        <View
          style={{
            width: WC * 0.8,
            flexWrap: 'wrap',
            backgroundColor: '#227CE6',
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
                  <Text style={{color: 'gray'}}>8/10</Text>
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
                  <Text style={{color: 'gray'}}>4:00</Text>
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
                  <Text style={{color: 'gray'}}>124</Text>
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
                  <Text style={{color: 'gray'}}>15</Text>
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
        {sortLevelRank.map((item, index) => {
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
                source={{uri: item.image}}
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
                  {item.rank}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <Rating openRating={openRating} setOpenRating={setOpenRating} />
    </ScrollView>
  );
};

export default Index;
