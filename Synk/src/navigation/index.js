import{NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from '../screens/ChatScreen';
import ChatsHomeScreen from '../screens/ChatsHomeScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name = "Home" component={MainTabNavigator} />
            <Stack.Screen name = "Chat" component={ChatScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;