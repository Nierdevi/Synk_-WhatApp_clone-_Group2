import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ChatsScreen from './ChatsScreen';
import ChatRoom from './ChatRoom';
import ChatInfo from './ChatInfo';

const ChatsStack = createStackNavigator();

const ChatsStackNavigator = ({navigation,route}) => {

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ChatsScreen';
    if (routeName === 'ChatsScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    }
  }, [navigation, route]);


  return (
    <ChatsStack.Navigator initialRouteName="ChatsScreen">
        <ChatsStack.Screen name="ChatsScreen" component={ChatsScreen} options={{ headerShown: true}} />
        <ChatsStack.Screen name="ChatRoom" component={ChatRoom} 
        options={()=>({ 
            headerShown: true,
            // tabBarVisible:false
            })} 

            />
        <ChatsStack.Screen name="ChatInfo" component={ChatInfo} 
        options={()=>({ 
            headerShown: true,
            // tabBarVisible:false
            })} 

            />
    </ChatsStack.Navigator>
  );
};

export default ChatsStackNavigator;