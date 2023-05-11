import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import Rive, {RiveRef, Fit} from 'rive-react-native';
const Draft = () => {
  const Ref = useRef(null);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Rive
        resourceName="login_screen_character"
        artboardName="Artboard"
        stateMachineName="State Machine 1"
        autoplay={true}
        style={{
          height: 400,
          width: 300,
        }}
        ref={Ref}
        fit={Fit.Contain}
      />
    </View>
  );
};

export default Draft;
