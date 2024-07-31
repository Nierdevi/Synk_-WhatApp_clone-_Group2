import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UpdatesHeader from '../../../components/CusTabsHeaders/ChatsHeader';
import { useTheme } from '../../../constants/themeContext';
import NotificationsScreen from '../../../Screens/tabs/Settings/NotificationsScreen';
import AccountScreen from '../Settings/AccountScreen';
import AppUpdatesScreen from '../Settings/AppUpdatesScreen';
import AvatarScreen from '../Settings/AvatarScreen';
import ChangeNumberScreen from '../Settings/ChangeNumberScreen';
import DeleteAccountScreen from '../Settings/DeleteAccountScreen';
import EmailScreen from '../Settings/EmailScreen';
import HelpScreen from '../Settings/HelpScreen';
import PassKeysScreen from '../Settings/PassKeysScreen';
import PrivacyScreen from '../Settings/PrivacyScreen';
import ProfileScreen from '../Settings/ProfileScreen';
import RequestAccountInfoScreen from '../Settings/RequestAccountInfoScreen';
import SChatScreen from '../Settings/SChatScreen';
import SecurityNotificationsScreen from '../Settings/SecurityNotificationsScreen';
import SettingsScreen from '../Settings/SettingsScreen';
import StorageScreen from '../Settings/StorageScreen';
import TwoStepVerificationScreen from '../Settings/TwoStepVerificationScreen';
import ChatInfo from './ChatInfo';
import ChatRoom from './ChatRoom';
import ChatsScreen from './ChatsScreen';

const ChatsStack = createStackNavigator();

const ChatsStackNavigator = ({ navigation, route }) => {
  const { theme, toggleTheme } = useTheme();

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ChatsScreen';
    if (routeName === 'ChatsScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'flex',height:70,  } });
      navigation.setOptions({ tabBarStyle: { display: 'flex',height:80,  },headerShown:true })
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
