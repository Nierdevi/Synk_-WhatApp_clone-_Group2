import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CameraComponent from '../../../components/CameraComponent';
import { useTheme } from '../../../constants/themeContext';
import SettingsScreen from '../Settings/SettingsScreen';
import ChannelsScreen from './ChannelDetails';
import ChannelInfo from './ChannelInfo';
import EditStatusScreen from './EditStatusScreen';
import ExploreMore from './ExploreMore';
import StatusView from './StatusView';
import UpdatesScreen from './UpdatesScreen';
import StatusList from '../../../components/StatusList ';

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
        options={{ 
          headerShown: false,
        }} 
      />
      <ChatsStack.Screen 
        name="Explore" 
        component={ExploreMore} 
        options={{ 
          headerShown: false,
        }} 
      />
      <ChatsStack.Screen 
        name="EditStatus" 
        component={EditStatusScreen} 
        options={{ 
          headerShown: false,
        }} 
      />
      <ChatsStack.Screen 
        name="CameraStatus" 
        component={StatusList} 
        options={{ 
          headerShown: false,
          headerTitle: '', // Remove the title by setting it to an empty string
          headerLeft: () => null, // Remove the back arrow icon
        }} 
      />
    </ChatsStack.Navigator>
  );
};

export default UpdatesStackNavigator;
