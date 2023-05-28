import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SignUp from '../Authentication/SignUp';
import InitialScreen from '../Authentication/InitialScreen';
import Rating from '../Setting/Rating';
import Quiz from '../Quiz/Index';
import Home from '../Home/Index';
import Result from '../Result/Index';
import ChooseCharacter from '../ChooseCharacter/ChooseCharacter';
export type StackParamList = {
  InitialScreen: undefined;
  SignUp: undefined;
  Rating: {setOpenRating: Function; openRating: boolean}; // undefined because you aren't passing any params to the home screen
  Home: undefined;
  Quiz: {name: string};
  Result: {name: string};
  ChooseCharacter: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Quiz">
        <Stack.Screen name={'InitialScreen'} component={InitialScreen} />
        <Stack.Screen name={'SignUp'} component={SignUp} />
        <Stack.Screen name={'ChooseCharacter'} component={ChooseCharacter} />
        {/* <Stack.Screen name={'Rating'} component={Rating} /> */}
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{
            animation: 'fade',
            animationDuration: 3000,
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
