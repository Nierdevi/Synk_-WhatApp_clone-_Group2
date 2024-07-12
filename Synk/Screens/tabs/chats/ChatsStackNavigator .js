import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ChatsScreen from './ChatsScreen';
import ChatRoom from './ChatRoom';
import ChatInfo from './ChatInfo';
import { useTheme } from '../../../constants/themeContext';
import UpdatesHeader from '../../../components/CusTabsHeaders/ChatsHeader';
import SettingsScreen from '../../SettingsScreen';
import NotificationsScreen from '../../NotificationsScreen';
import AccountScreen from '../../AccountScreen';
import StorageScreen from '../../StorageScreen';
import ProfileScreen from '../../ProfileScreen';
import PrivacyScreen from '../../PrivacyScreen';
import SChatScreen from '../../SChatScreen';
import HelpScreen from '../../HelpScreen';
import AppUpdatesScreen from '../../AppUpdatesScreen';
import AvatarScreen from '../../AvatarScreen';

const ChatsStack = createStackNavigator();

const ChatsStackNavigator = ({ navigation, route }) => {
  const { theme, toggleTheme } = useTheme();

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ChatsScreen';
    if (routeName === 'ChatsScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'flex', height: 70 } });
      navigation.setOptions({ headerShown: true });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'none' }, headerShown: false });
    }
  }, [navigation, route]);

  return (
    <ChatsStack.Navigator initialRouteName="ChatsScreen">
      <ChatsStack.Screen name="ChatsScreen" component={ChatsScreen} options={{ headerShown: false }} />
      <ChatsStack.Screen name="ChatRoom" component={ChatRoom} options={{ headerShown: true}} />
      <ChatsStack.Screen name="ChatInfo" component={ChatInfo} options={{ headerShown: true }} />
      <ChatsStack.Screen name="UpdatesHeader" component={UpdatesHeader} options={{ headerShown: false }} />
      <ChatsStack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
      <ChatsStack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
      <ChatsStack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }}/>
      <ChatsStack.Screen name="Storage" component={StorageScreen} options={{ headerShown: false }}/>
      <ChatsStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      <ChatsStack.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: false }}/>
      <ChatsStack.Screen name="SChat" component={SChatScreen} options={{ headerShown: false }}/>
      <ChatsStack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }}/>
      <ChatsStack.Screen name="AppUpdate" component={AppUpdatesScreen} options={{ headerShown: false }}/>
      <ChatsStack.Screen name="Avatar" component={AvatarScreen} options={{ headerShown: false }}/>
    </ChatsStack.Navigator>
  );
};

export default ChatsStackNavigator;
