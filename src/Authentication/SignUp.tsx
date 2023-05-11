import {
  View,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Rive, {RiveRef, Fit} from 'rive-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('screen');
const STATE_MACHINE = 'State Machine 1';
const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [look, setLook] = useState(0);
  const [security, setSecurity] = useState(true);
  const [type, setType] = useState<Number>(-1);
  const Ref = useRef<RiveRef>(null);
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
  useEffect(() => {
    Ref.current?.setInputState(STATE_MACHINE, 'Look', look);
  }, [look]);
  useEffect(() => {
    if (type === 1) {
      setLook(name.length * 5);
    }
    if (type === 2) {
      setLook(pass.length * 5);
    }
  }, [name.length, pass.length]);
  return (
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
          }}>
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
        <View style={{alignItems: 'center'}}>
          <View style={styles.row}>
            <AntDesign name={'user'} size={20} color={'grey'} />
            <TextInput
              style={[styles.text_input, {width: '90%'}]}
              defaultValue={name}
              onChangeText={setName}
              placeholder={'Email'}
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
              style={[styles.text_input, {width: '80%'}]}
              defaultValue={pass}
              onChangeText={setPass}
              placeholder={'Password'}
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
  text_input: {
    color: '#000',
  },
});
export default SignUp;
