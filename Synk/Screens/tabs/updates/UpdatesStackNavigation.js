import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from '../../../constants/themeContext';
import ChannelsScreen from './ChannelDetails';
import ChannelInfo from './ChannelInfo';
import EditStatusScreen from './EditStatusScreen';
import ExploreMore from './ExploreMore';
import StatusView from './StatusView';
import UpdatesScreen from './UpdatesScreen';

const ChatsStack = createStackNavigator();

const UpdatesStackNavigator = ({ navigation, route }) => {
  const { theme } = useTheme();

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'UpdatesScreen';
    if (routeName === 'UpdatesScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'flex', height: 80 }, headerShown: true });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'none' }, headerShown: false });
    }
  }, [navigation, route]);

  return (
    <ChatsStack.Navigator>
      <ChatsStack.Screen 
        name="UpdatesScreen" 
        component={UpdatesScreen} 
        options={{ headerShown: false }} 
      />
      <ChatsStack.Screen 
        name="Status" 
        component={StatusView} 
        options={{ headerShown: true }} 
      />
      <ChatsStack.Screen 
        name="ChannelDetails" 
        component={ChannelsScreen} 
        options={({ route }) => ({
          headerShown: false,
          title: route.params.channel.name, // Set channel name as title
        })} 
      />
      <ChatsStack.Screen 
        name="ChannelInfo" 
        component={ChannelInfo} 
        options={{ headerShown: true }} 
      />
      <ChatsStack.Screen 
        name="Explore" 
        component={ExploreMore} 
        options={{ headerShown: true }} 
      />
      <ChatsStack.Screen 
        name="EditStatus" 
        component={EditStatusScreen} 
        options={{ headerShown: true }} 
      />
    </ChatsStack.Navigator>
  );
};

export default UpdatesStackNavigator;
