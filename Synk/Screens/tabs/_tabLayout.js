import React,{useState} from 'react';
import {View, Image} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {primaryColors,SecondaryColors} from '../../constants/colors';
import { useTheme } from '../../constants/themeContext';

const chatIcon=require('../../assets/tabIcons/chatIcon.png');
const groupIcon=require('../../assets/tabIcons/groupIcon.png');
const updateIcon=require('../../assets/tabIcons/updateIcon.png');
const callIcon=require('../../assets/tabIcons/callIcon.png');

import ChatsStackNavigator from './chats/ChatsStackNavigator ';
import GroupStackNavigator from './groups/GroupStackNavigator ';
import UpdatesStackNavigator from './updates/UpdatesStackNavigation';
import CallsScreen from './calls/CallsScreen';

import ChatsHeader from '../../components/CusTabsHeaders/ChatsHeader';
import GroupHeader from '../../components/CusTabsHeaders/GroupHeader'
import UpdatesHeader from '../../components/CusTabsHeaders/UpdatesHeader'
import CallHeader from '../../components/CusTabsHeaders/CallHeader'

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { theme, toggleTheme } = useTheme();


  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 80, },
        tabBarItemStyle:{height:60,marginVertical: 6,marginHorizontal:-20,  }, 
        tabBarIcon: ({ color, size, focused }) => {

          if (route.name === 'Chats') {
            return(
              <View style={{
                  backgroundColor: focused ? SecondaryColors.secPurple : 'transparent',
                  borderRadius: 20,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}>
                  <Image
                      source={chatIcon} // Adjust the path as needed
                      style={{ width: size * 1.1, height: size * 1.1, tintColor:theme === 'dark' ?  primaryColors.white : primaryColors.black }}
                      resizeMode="contain"
                    />
                </View>
            )
          } else if (route.name === 'Groups') {
            return(
              <View style={{
                  backgroundColor: focused ? SecondaryColors.secPurple : 'transparent',
                  borderRadius: 20,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}>
                  <Image
                      source={groupIcon} // Adjust the path as needed
                      style={{ width: size * 1.1, height: size * 1.1, tintColor:theme === 'dark' ?  primaryColors.white : primaryColors.black }}
                      resizeMode="contain"
                    />
                </View>
            )
          } else if (route.name === 'Updates') {
            return(
              <View style={{
                  backgroundColor: focused ? SecondaryColors.secPurple : 'transparent',
                  borderRadius: 20,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}>
                  <Image
                      source={updateIcon} // Adjust the path as needed
                      style={{ width: size * 1.1, height: size * 1.1, tintColor:theme === 'dark' ?  primaryColors.white : primaryColors.black }}
                      resizeMode="contain"
                    />
                </View>
            )
          }else if (route.name === 'Calls') {
            return(
              <View style={{
                  backgroundColor: focused ? SecondaryColors.secPurple : 'transparent',
                  borderRadius: 20,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}>
                  <Image
                      source={callIcon} // Adjust the path as needed
                      style={{ width: size * 1.1, height: size * 1.1, tintColor:theme === 'dark' ?  primaryColors.white : primaryColors.black }}
                      resizeMode="contain"
                    />
                </View>
            )
          }


        },
        tabBarActiveTintColor: '#292524',
        tabBarInactiveTintColor: '#71717A',
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight:'700'
        },
      })}
    >
      <Tab.Screen
        name="Chats"
        component={ChatsStackNavigator}
        options={{
          header:()=> <ChatsHeader />,
          // headerShown: false,

        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupStackNavigator}
        options={{
          // headerShown: false,
          header:()=> <GroupHeader />
        }}
      />
      <Tab.Screen 
        name="Updates" 
        component={UpdatesStackNavigator} 
        options={{ 
          header:() => <UpdatesHeader />
          }} 
      />
      <Tab.Screen 
        name="Calls"
        component={CallsScreen}
        options={{
          tabBarLabel:"Calls ",
          header:()=> <CallHeader />
        }}
      />
    </Tab.Navigator>
  );
};




export default MainTabs;