import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SignUp from '../Authentication/SignUp';
import InitialScreen from '../Authentication/InitialScreen';
import Rating from '../Setting/Rating';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
export type StackParamList = {
  InitialScreen: undefined;
  SignUp: undefined;
  Rating: undefined; // undefined because you aren't passing any params to the home screen
};
const Stack = createNativeStackNavigator<StackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="InitialScreen">
        <Stack.Screen name={'InitialScreen'} component={InitialScreen} />
        <Stack.Screen name={'SignUp'} component={SignUp} />
        <Stack.Screen name={'Rating'} component={Rating} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
