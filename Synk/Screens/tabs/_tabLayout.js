import React,{useState} from 'react';
import {View} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {primaryColors,SecondaryColors} from '../../constants/colors';
import { useTheme } from '../../constants/themeContext';
// const { theme, toggleTheme } = useTheme();



import UpdateIcon from '../../components/UpdateIcon';
import ChatIcon from '../../components/ChatIcon';
import GroupIcon from '../../components/GroupIcon';
import CallIcon from '../../components/CallIcon';

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
  // const { theme, toggleTheme } = useTheme();
  // const [iconColor,setIconColor]=useState(theme === 'dark' ?  primaryColors.white : null)


  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 80,backgroundColor:primaryColors.black },
        tabBarItemStyle:{height:60,marginVertical: 6,marginHorizontal:-20,  }, 
        tabBarIcon: ({ color, size, focused }) => {

          if (route.name === 'Chats') {
            return(
              <View style={{
                  backgroundColor: focused ? SecondaryColors.secPurple : 'transparent',
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                }}>
                  <ChatIcon width={size*1.3} height={size*1.4} fill={color} />
                </View>
            )
          } else if (route.name === 'Groups') {
            return(
              <View style={{
                  backgroundColor: focused ? SecondaryColors.secPurple : 'transparent',
                  borderRadius: 20,
                  paddingHorizontal: 6,
                  paddingVertical: 0,
                }}>
                  <GroupIcon width={size*1.7} height={size*1.7} fill={color} />
                </View>
            )
          } else if (route.name === 'Updates') {
            return(
              <View style={{
                  backgroundColor: focused ? SecondaryColors.secPurple : 'transparent',
                  borderRadius: 20,
                  paddingHorizontal: 13,
                  paddingVertical: 5,
                }}>
                  <UpdateIcon width={size*1.2} height={size*1.2} fill={color} />
                </View>
            )
          }else if (route.name === 'Calls') {
            return(
              <View style={{
                  backgroundColor: focused ? SecondaryColors.secPurple : 'transparent',
                  borderRadius: 20,
                  paddingHorizontal: 11,
                  paddingVertical: 5,
                }}>
                  <CallIcon width={size*1.2} height={size*1.15} fill={color} />
                </View>
            )
          }


        },
        tabBarActiveTintColor: '#57534E',
        tabBarInactiveTintColor: '#D6D3D1',
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