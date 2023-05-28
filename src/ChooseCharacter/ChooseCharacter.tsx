import {
  View,
  Text,
  StatusBar,
  FlatList,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Rive, {Alignment, Fit} from 'rive-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {StackParamList} from '../Navigation/Navigation';
import {DataStore} from 'aws-amplify';
import {USER} from '../models';
export const LIST_CHARACTER = [
  require('../Assets/Images/Characters/avatar.png'),
  require('../Assets/Images/Characters/dinosaur.png'),
  require('../Assets/Images/Characters/ghost.png'),
  require('../Assets/Images/Characters/lamb.png'),
  require('../Assets/Images/Characters/leonardo.png'),
  require('../Assets/Images/Characters/ninja.png'),
  require('../Assets/Images/Characters/robin-hood.png'),
  require('../Assets/Images/Characters/swordsman.png'),
  require('../Assets/Images/Characters/witch.png'),
  require('../Assets/Images/Characters/wolf.png'),
  require('../Assets/Images/Characters/angry-birds.png'),
  require('../Assets/Images/Characters/assasin.png'),
  require('../Assets/Images/Characters/fairy.png'),
  require('../Assets/Images/Characters/singer.png'),
  require('../Assets/Images/Characters/superhero.png'),
  require('../Assets/Images/Characters/monster.png'),
  require('../Assets/Images/Characters/github-character.png'),
  require('../Assets/Images/Characters/jigglypuff.png'),
  require('../Assets/Images/Characters/character_1.png'),
  require('../Assets/Images/Characters/adventurer.png'),
];

interface typeRender {
  item: any;
  index: number;
}
type Props = NativeStackScreenProps<StackParamList, 'ChooseCharacter'>;

const ChooseCharacter = ({navigation}: Props) => {
  const [name, setName] = useState<string>('');
  const [characterIndex, setCharacterIndex] = useState(0);
  const [error, setError] = useState<number>(0);
  const onNext = async () => {
    if (name === '') {
      setError(1);
      return;
    }
    const user = await DataStore.query(USER, u => u.name.eq(name));
    if (user.length !== 0) {
      setError(2);
    } else {
      setError(0);
      navigation.navigate('Quiz', {name: name});

      await DataStore.save(
        new USER({
          name: name,
          score: 0.0,
          numberCorrect: 0,
          time: 0,
          nameImage: characterIndex,
        }),
      );
    }
  };

  const renderCharacter = ({item, index}: typeRender) => {
    return (
      <Pressable
        onPress={() => setCharacterIndex(index)}
        key={index}
        style={[
          {
            width: 75,
            height: 75,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 100,
            marginHorizontal: 10,
            marginVertical: 10,
          },
          characterIndex === index && {borderWidth: 2},
        ]}>
        <Image
          source={item}
          style={{width: 50, height: 50, resizeMode: 'contain'}}
        />
      </Pressable>
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'hsl(0,90%,90%)',
        paddingTop: StatusBar.currentHeight,
      }}>
      <View
        style={{
          marginVertical: 20,
          paddingTop: 15,
          width: '80%',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'hsl(0,90%,66%)',
            marginVertical: 5,
          }}>
          {error === 1
            ? 'Please fill in your name'
            : error === 2 && 'Your name has been sign up'}
        </Text>
        <View
          style={{
            width: 100,
            height: 100,
            position: 'absolute',
            bottom: 25,
            right: 0,
          }}>
          <Rive
            stateMachineName="State Machine 1"
            artboardName="New Artboard"
            resourceName="kitten_popup"
            autoplay={true}
          />
        </View>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Please fill in your MSSV ..."
          placeholderTextColor={'gray'}
          style={[
            {
              width: '100%',
              backgroundColor: 'white',
              paddingVertical: 10,
              borderRadius: 10,

              paddingHorizontal: 10,
              color: 'black',
            },
            error > 0 && {borderWidth: 1, borderColor: 'red'},
          ]}
        />
      </View>
      <FlatList
        scrollEnabled={false}
        data={LIST_CHARACTER}
        renderItem={renderCharacter}
        renderToHardwareTextureAndroid
        numColumns={4}
        contentContainerStyle={{
          justifyContent: 'space-around',
          alignItems: 'center',

          width: '100%',
        }}
        style={{
          flex: 1,
        }}
      />
      <View
        style={{
          width: 200,
          height: 60,
          backgroundColor: 'hsl(0,90%,66%)',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 50,
          marginBottom: 80,
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
        <Pressable
          onPress={onNext}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: 'transparent'},
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default ChooseCharacter;
