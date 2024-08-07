import React,{useState,useRef,useEffect} from 'react';
import {View, Image,StatusBar} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {PanGestureHandler,GestureHandlerRootView,State} from 'react-native-gesture-handler'
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
      <View style={{ flex: 1 }}>
        <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent={true}
          />
        <Tab.Navigator
          initialRouteName="Chats"
          screenOptions={({ route }) => ({
            tabBarStyle: { height: 80, },
            tabBarItemStyle:{height:60,marginVertical: 6,marginHorizontal:-20,  },
            tabBarIcon: ({ color, size, focused }) => {
                let iconSource;
                switch (route.name) {
                  case 'Chats':
                    iconSource = chatIcon;
                    break;
                  case 'Groups':
                    iconSource = groupIcon;
                    break;
                  case 'Updates':
                    iconSource = updateIcon;
                    break;
                  case 'Calls':
                    iconSource = callIcon;
                    break;
                }
                return (
                  <View style={{
                    backgroundColor: focused ? SecondaryColors.secPurple : 'transparent',
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                  }}>
                    <Image
                      source={iconSource}
                      style={{ width: size * 1.1, height: size * 1.1, tintColor: theme === 'dark' ? primaryColors.white : primaryColors.black }}
                      resizeMode="contain"
                    />
                  </View>
                );
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
            // initialParams={{ 'handleClearCallLogs' }}
          />
        </Tab.Navigator>
    </View>
  );
};




export default MainTabs;