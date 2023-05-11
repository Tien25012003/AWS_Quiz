import {
  View,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Rive, {RiveRef, Fit} from 'rive-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('screen');
const STATE_MACHINE = 'State Machine 1';
const STATE_MACHINE_BIRD = 'State Machine 2';
const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [look, setLook] = useState(0);
  const [security, setSecurity] = useState(true);
  const [type, setType] = useState<Number>(-1);
  const [code, setCode] = useState('');
  const [screenType, setScreenType] = useState(1);
  const Ref = useRef<RiveRef>(null);
  const BtnRef = useRef<RiveRef>(null);
  const ScrollRef = useRef<ScrollView>(null);
  const onPressEye = () => {
    setSecurity(!security);
    Ref.current?.setInputState(STATE_MACHINE, 'hands_up', security);
  };
  const onLookDown = () => {
    Ref.current?.setInputState(STATE_MACHINE, 'Check', true);
  };
  const onLookUp = () => {
    Ref.current?.setInputState(STATE_MACHINE, 'Check', false);
    setLook(0);
    setType(-1);
  };
  const onPressBtn = () => {
    //BtnRef.current?.setInputState(STATE_MACHINE_BIRD, 'clck', true);
    if (email === '' || pass === '') {
      Ref.current?.fireState(STATE_MACHINE, 'fail');
      setScreenType(3);
      return;
    }
    if (screenType === 1 || screenType === 3) {
      setScreenType(2);
      ScrollRef.current?.scrollTo({x: width, y: 0, animated: true});
      Ref.current?.fireState(STATE_MACHINE, 'success');
    } else {
      console.log('Go to home screen');
    }
  };
  const onBack = () => {
    ScrollRef.current?.scrollTo({x: -width, y: 0, animated: true});
    setScreenType(1);
  };
  useEffect(() => {
    Ref.current?.setInputState(STATE_MACHINE, 'Look', look);
  }, [look]);
  useEffect(() => {
    if (type === 1) {
      setLook(email.length * 5);
    }
    if (type === 2) {
      setLook(pass.length * 5);
    }
  }, [email.length, pass.length]);
  return (
    <View style={{flex: 1, paddingTop: 20}}>
      <ScrollView>
        {screenType !== 1 && (
          <Ionicons
            name="arrow-back"
            size={30}
            color={'grey'}
            style={{marginLeft: 20, marginTop: 10, marginBottom: -20}}
            onPress={onBack}
          />
        )}
        <View style={{alignItems: 'center'}}>
          {screenType !== 1 && (
            <View style={{position: 'absolute', top: StatusBar.currentHeight}}>
              <View style={styles.chatbox}>
                {screenType === 2 ? (
                  <Text>
                    We have send you an email. Please confirm the OTP code in
                    your email here!
                  </Text>
                ) : (
                  <Text>
                    Maybe you forgot to provide your email or password to sign
                    up
                  </Text>
                )}
                <View style={styles.square} />
              </View>
            </View>
          )}
          <Rive
            resourceName="login_screen_character"
            artboardName="Artboard"
            stateMachineName={STATE_MACHINE}
            autoplay={true}
            style={{
              height: height * 0.5,
              width,
            }}
            ref={Ref}
            fit={Fit.Fill}
          />
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            opacity: 0.5,
            width,
            height: 3,
            marginTop: -2,
          }}
        />
        <ScrollView horizontal ref={ScrollRef} scrollEnabled={false}>
          <View style={{width}}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.row}>
                <AntDesign name={'user'} size={20} color={'grey'} />
                <TextInput
                  style={{width: '90%', color: '#000'}}
                  defaultValue={email}
                  onChangeText={setEmail}
                  placeholder={'New Email'}
                  placeholderTextColor={'hsl(0,0%,80%)'}
                  onFocus={() => {
                    onLookDown();
                    setType(1);
                  }}
                  onBlur={onLookUp}
                />
              </View>
              <View style={styles.row}>
                <AntDesign name={'lock'} size={20} color={'grey'} />
                <TextInput
                  style={{width: '80%', color: '#000'}}
                  defaultValue={pass}
                  onChangeText={setPass}
                  placeholder={'New Password'}
                  placeholderTextColor={'hsl(0,0%,80%)'}
                  secureTextEntry={security}
                  onFocus={() => {
                    onLookDown();
                    setType(2);
                  }}
                  onBlur={onLookUp}
                />
                <Feather
                  name={security ? 'eye-off' : 'eye'}
                  size={20}
                  color={'grey'}
                  onPress={onPressEye}
                />
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Rive
                resourceName="button"
                artboardName="New Artboard"
                stateMachineName={STATE_MACHINE_BIRD}
                autoplay={true}
                style={{
                  height: height * 0.12,
                  width,
                }}
                ref={BtnRef}
                fit={Fit.FitWidth}
              />
              <Pressable style={styles.press} onPress={onPressBtn} />
            </View>
            <View style={styles.or}>
              <View
                style={{width: '40%', backgroundColor: 'grey', height: 1}}
              />
              <Text style={{color: 'grey', fontSize: 15}}>or</Text>
              <View
                style={{width: '40%', backgroundColor: 'grey', height: 1}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../Assets/Images/google1.png')}
                resizeMode={'contain'}
                style={{
                  height: 65,
                  width: 65,
                  marginRight: 20,
                }}
              />
              <Image
                source={require('../Assets/Images/facebook1.png')}
                resizeMode={'contain'}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          </View>
          <View style={{width}}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.row}>
                <AntDesign name={'user'} size={20} color={'grey'} />
                <Text
                  style={{width: '90%', color: '#000', paddingVertical: 10}}>
                  {email}
                </Text>
              </View>
              <View style={styles.row}>
                <TextInput
                  style={{width: '100%', color: '#000'}}
                  defaultValue={code}
                  onChangeText={setCode}
                  placeholder={'Code'}
                  placeholderTextColor={'hsl(0,0%,80%)'}
                  secureTextEntry={security}
                  onFocus={onLookDown}
                  onBlur={onLookUp}
                />
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Rive
                resourceName="button"
                artboardName="New Artboard"
                stateMachineName={STATE_MACHINE_BIRD}
                autoplay={true}
                style={{
                  height: height * 0.12,
                  width,
                }}
                ref={BtnRef}
                fit={Fit.FitWidth}
              />
              <Pressable style={styles.press} onPress={onPressBtn} />
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  press: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: width * 0.5,
    height: height * 0.1,
    zIndex: 99,
  },
  or: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  chatbox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'hsl(0,0%,80%)',
    marginHorizontal: 10,
  },
  square: {
    position: 'absolute',
    bottom: -10,
    width: 20,
    height: 20,
    backgroundColor: 'hsl(0,0%,80%)',
    left: 20,
    transform: [{rotate: '45deg'}],
  },
});
export default SignUp;
