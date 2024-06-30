import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import UpdatesScreen from './UpdatesScreen'; 
import StatusView from './StatusView';
import ChannelsScreen from './Channels';

const ChatsStack = createStackNavigator();

const UpdatesStackNavigator = ({navigation,route}) => {

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'UpdatesScreen';
    if (routeName === 'UpdatesScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'flex',height:80,  } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    }
  }, [navigation, route]);


  return (
    <ChatsStack.Navigator >
        <ChatsStack.Screen name="UpdatesScreen" component={UpdatesScreen} options={{ headerShown: false}} />
        <ChatsStack.Screen name="Status" component={StatusView} 
        options={()=>({ 
            headerShown: true,
            // tabBarVisible:false
            })} 

            />
        <ChatsStack.Screen name="Channels" component={ChannelsScreen} 
        options={()=>({ 
            headerShown: true,
            // tabBarVisible:false
            })} 

            />
    </ChatsStack.Navigator>
  );
};

export default UpdatesStackNavigator;