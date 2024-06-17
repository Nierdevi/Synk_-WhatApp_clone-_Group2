import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatScreen from '../screens/ChatScreen';
import ChatsHomeScreen from '../screens/ChatsHomeScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

const Tabs = () => {
  return (
        <Stack.Navigator>
            <Stack.Screen name = "Home" component={ChatsHomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name = "tabs" component={MainTabNavigator} />
            <Stack.Screen name = "Chat" component={ChatScreen} />
        </Stack.Navigator>
  );
};

export default Tabs;