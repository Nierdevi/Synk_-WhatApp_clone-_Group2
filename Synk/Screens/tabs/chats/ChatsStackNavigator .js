import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ChatsScreen from './ChatsScreen';
import ChatRoom from './ChatRoom';
import ChatInfo from './ChatInfo';
import { useTheme } from '../../../constants/themeContext';
import UpdatesHeader from '../../../components/CusTabsHeaders/ChatsHeader';
import SettingsScreen from '../Settings/SettingsScreen';
import NotificationsScreen from '../../../Screens/tabs/Settings/NotificationsScreen';
import AccountScreen from '../Settings/AccountScreen';
import ProfileScreen from '../Settings/ProfileScreen';
import PrivacyScreen from '../Settings/PrivacyScreen';
import SChatScreen from '../Settings/SChatScreen';
import HelpScreen from '../Settings/HelpScreen';
import AppUpdatesScreen from '../Settings/AppUpdatesScreen';
import AvatarScreen from '../Settings/AvatarScreen';
import SecurityNotificationsScreen from '../Settings/SecurityNotificationsScreen';
import StorageScreen from '../Settings/StorageScreen';
import PassKeysScreen from '../Settings/PassKeysScreen';
import EmailScreen from '../Settings/EmailScreen';
import TwoStepVerificationScreen from '../Settings/TwoStepVerificationScreen';
import ChangeNumberScreen from '../Settings/ChangeNumberScreen';
import RequestAccountInfoScreen from '../Settings/RequestAccountInfoScreen';
import DeleteAccountScreen from '../Settings/DeleteAccountScreen';

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
      <ChatsStack.Screen name="ChatRoom" component={ChatRoom} options={{ headerShown: false}} />
      <ChatsStack.Screen name="ChatInfo" component={ChatInfo} options={{ headerShown: false }} />
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
      <ChatsStack.Screen name="Security" component={SecurityNotificationsScreen} options={{ headerShown: false }}/>
      <ChatsStack.Screen name="PassKey" component={PassKeysScreen} options={{headerShown:false}}/>
      <ChatsStack.Screen name="Email" component={EmailScreen} options={{headerShown:false}}/>
      <ChatsStack.Screen name="TwoStep" component={TwoStepVerificationScreen} options={{headerShown:false}}/>
      <ChatsStack.Screen name="Change" component={ChangeNumberScreen} options={{headerShown:false}}/>
      <ChatsStack.Screen name="Request" component={RequestAccountInfoScreen} options={{headerShown:false}}/>
      <ChatsStack.Screen name="Delete" component={DeleteAccountScreen} options={{headerShown:false}}/>
    </ChatsStack.Navigator>
  );
};

export default ChatsStackNavigator;
