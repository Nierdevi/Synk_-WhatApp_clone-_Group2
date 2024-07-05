import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ChatsScreen from './ChatsScreen';
import ChatRoom from './ChatRoom';
import ChatInfo from './ChatInfo';
import { useTheme } from '../../../constants/themeContext';



const ChatsStack = createStackNavigator();

const ChatsStackNavigator = ({navigation,route}) => {

  const { theme, toggleTheme } = useTheme();


  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ChatsScreen';
    if (routeName === 'ChatsScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'flex',height:70 } });
      navigation.setOptions({ tabBarStyle: { display: 'flex',height:80 },headerShown:true },);
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'none' },headerShown:false });
    }
  }, [navigation, route]);


  return (
    <ChatsStack.Navigator initialRouteName="ChatsScreen">
        <ChatsStack.Screen name="ChatsScreen" component={ChatsScreen} options={{ headerShown: false}} />
        <ChatsStack.Screen name="chat" component={ChatRoom} 
          options={()=>({ 
              headerShown: true,
              // tabBarVisible:false
            })
          } 
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