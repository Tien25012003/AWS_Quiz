import {
  View,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Rive, {RiveRef, Fit} from 'rive-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TextAnimation from '../Component/TextAnimation';
import styles from './styles';
import {Auth} from 'aws-amplify';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth/lib/types';
import {StackParamList} from '../Navigation/Navigation';
type NavigationProps = NativeStackNavigationProp<StackParamList, 'SignUp'>;
type Props = {
  navigation: NavigationProps;
};
const {width, height} = Dimensions.get('screen');
const STATE_MACHINE = 'State Machine 1';
const STATE_MACHINE_BIRD = 'State Machine 2';
const TEXT_EMPTY =
  'Maybe you forgot to provide your email or password to sign up!';
const SEND_OTP =
  ' We have send you an email. Please confirm the OTP code in your email here!';
const SignUp = ({navigation}: Props) => {
  //const SignUp = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [look, setLook] = useState(0);
  const [security, setSecurity] = useState(true);
  const [type, setType] = useState<Number>(-1);
  const [code, setCode] = useState('');
  const [screenType, setScreenType] = useState(1);
  const [error, setError] = useState(-1);
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
  const onPressBtn = async () => {
    if (email === '' || pass === '') {
      Ref.current?.fireState(STATE_MACHINE, 'fail');
      setError(3);
      return;
    }
    if (screenType === 1 || screenType === 3) {
      if (pass.length < 7) {
        Ref.current?.fireState(STATE_MACHINE, 'fail');
        setError(0);
        return;
      }
      await Auth.signUp({
        username: email,
        password: pass,
        autoSignIn: {
          enabled: true,
        },
      })
        .then(() => {
          setScreenType(2);
          ScrollRef.current?.scrollTo({x: width, y: 0, animated: true});
          Ref.current?.fireState(STATE_MACHINE, 'success');
        })
        .catch(() => {
          setError(1);
          Ref.current?.fireState(STATE_MACHINE, 'fail');
        });
    } else {
      if (code === '') {
        setError(2);
        return;
      }
      await Auth.confirmSignUp(email, code)
        .then(() => {
          navigation.navigate('Home');
        })
        .catch(() => setError(2));
    }
  };
  const onBack = () => {
    ScrollRef.current?.scrollTo({x: -width, y: 0, animated: true});
    setScreenType(1);
  };
  const onResend = async () => {
    await Auth.resendSignUp(email).then(() => console.log('resend'));
  };
  const onGoogle = async () => {
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    })
      .then(() => navigation.navigate('Home'))
      .catch(e => console.log(e));
  };
  const onFacebook = async () => {
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook,
    })
      .then(() => navigation.navigate('Home'))
      .catch(e => console.log(e));
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
    if (type === 3) {
      setLook(code.length * 5);
    }
  }, [email.length, pass.length, code.length]);
  return (
    <View style={{flex: 1, paddingTop: 20, backgroundColor: '#fff'}}>
      <ScrollView>
        {screenType === 2 && (
          <Pressable
            onPress={onBack}
            hitSlop={20}
            style={{position: 'absolute', zIndex: 99}}>
            <Ionicons
              name="arrow-back"
              size={30}
              color={'grey'}
              style={{
                marginLeft: 20,
                marginTop: 30,
              }}
            />
          </Pressable>
        )}
        <View style={{alignItems: 'center', zIndex: 1, marginTop: 30}}>
          {(screenType === 2 || error === 3) && (
            <View style={{position: 'absolute', top: StatusBar.currentHeight}}>
              <View style={styles.chatbox}>
                {screenType === 2 && (
                  <TextAnimation
                    text={SEND_OTP}
                    width={width * 0.8}
                    marginLeft={5}
                  />
                )}
                {error === 3 && (
                  <TextAnimation
                    text={TEXT_EMPTY}
                    width={width * 0.8}
                    marginLeft={5}
                  />
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
          <View
            style={{
              backgroundColor: '#fff',
              opacity: 0.5,
              width,
              height: 5,
              position: 'absolute',
              bottom: -3,
            }}
          />
        </View>

        <ScrollView
          horizontal
          ref={ScrollRef}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}>
          {/* View 1 */}
          <View style={{width}}>
            <View style={{alignItems: 'center'}}>
              <View
                style={[
                  styles.row,
                  {borderColor: error === 1 ? 'red' : 'grey'},
                ]}>
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
              {error === 1 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '80%',
                  }}>
                  <AntDesign
                    name="exclamationcircle"
                    size={13}
                    color="red"
                    style={{marginRight: 5}}
                  />
                  <Text style={{fontSize: 12, color: 'red'}}>
                    Opps! Invalid email
                  </Text>
                </View>
              )}

              <View
                style={[
                  styles.row,
                  {borderColor: error === 0 ? 'red' : 'grey'},
                ]}>
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
              {error === 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '80%',
                  }}>
                  <AntDesign
                    name="exclamationcircle"
                    size={13}
                    color="red"
                    style={{marginRight: 5}}
                  />
                  <Text style={{fontSize: 12, color: 'red'}}>
                    Opps! Password should have at least 7 characters
                  </Text>
                </View>
              )}
            </View>
          </View>
          {/* View 2 */}
          <View style={{width}}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.row}>
                <AntDesign name={'user'} size={20} color={'grey'} />
                <Text
                  style={{width: '90%', color: '#000', paddingVertical: 10}}>
                  {email}
                </Text>
              </View>
              <View
                style={[
                  styles.row,
                  {borderColor: error === 2 ? 'red' : 'grey'},
                ]}>
                <TextInput
                  style={{width: '90%', color: '#000'}}
                  defaultValue={code}
                  onChangeText={setCode}
                  placeholder={'Code'}
                  placeholderTextColor={'hsl(0,0%,80%)'}
                  secureTextEntry={security}
                  onFocus={() => {
                    onLookDown();
                    setType(3);
                  }}
                  onBlur={onLookUp}
                  keyboardType="numeric"
                />
                <Feather
                  name={security ? 'eye-off' : 'eye'}
                  size={20}
                  color={'grey'}
                  onPress={onPressEye}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '80%',
                }}>
                <View
                  style={{
                    width: '80%',
                    flexDirection: 'row',
                  }}>
                  {error === 2 && (
                    <>
                      <AntDesign
                        name="exclamationcircle"
                        size={13}
                        color="red"
                        style={{marginRight: 5}}
                      />
                      <Text style={{fontSize: 12, color: 'red'}}>
                        Opps! Please confirm OTP code !
                      </Text>
                    </>
                  )}
                </View>
                <Pressable
                  onPress={onResend}
                  hitSlop={5}
                  style={{
                    width: '20%',
                    alignItems: 'flex-end',
                  }}>
                  <Text style={{color: '#000', fontSize: 12}}>Resend</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
        <>
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
            <Pressable
              style={[styles.press, {width: width * 0.5, height: height * 0.1}]}
              onPress={onPressBtn}
            />
          </View>
          <View style={styles.or}>
            <View style={{width: '40%', backgroundColor: 'grey', height: 1}} />
            <Text style={{color: 'grey', fontSize: 15}}>or</Text>
            <View style={{width: '40%', backgroundColor: 'grey', height: 1}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Pressable onPress={onGoogle} hitSlop={20}>
              <Image
                source={require('../Assets/Images/google1.png')}
                resizeMode={'contain'}
                style={{
                  height: 65,
                  width: 65,
                  marginRight: 20,
                }}
              />
            </Pressable>
            <Pressable onPress={onFacebook} hitSlop={20}>
              <Image
                source={require('../Assets/Images/facebook1.png')}
                resizeMode={'contain'}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </Pressable>
          </View>
        </>
      </ScrollView>
    </View>
  );
};

export default SignUp;
