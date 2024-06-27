import React,{useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {primaryColors,SecondaryColors} from '../../constants/colors';


import ChatsStackNavigator from './chats/ChatsStackNavigator ';
import GroupStackNavigator from './groups/GroupStackNavigator ';
import UpdatesStackNavigator from './updates/UpdatesStackNavigation';
import ChatsScreen from './calls/CallsScreen';
// import UpdatesScreen from './updates/updatesScreen';
import { StatusBar } from 'react-native';
import Channels from './updates/Channels';


const Tab = createBottomTabNavigator();
  


const MainTabs = () => {
  return (
    <SafeAreaView style={styles.container}>
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        tabBarStyle:{
          height:80
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Chats') {
            iconName = 'chatbubbles';
          } else if (route.name === 'Groups') {
            iconName = 'people';
          } else if (route.name === 'Updates') {
            iconName = 'time';
          } else if (route.name === 'Calls') {
            iconName = 'call';
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              style={{ backgroundColor: focused ? SecondaryColors.secPurple : 'transparent', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 }}
            />
          );
        },
        tabBarActiveTintColor: '#57534E',
        tabBarInactiveTintColor: '#D6D3D1',
        tabBarLabelStyle: {
          fontSize: 15,
        },
      })}
    >
      <Tab.Screen
        name="Chats"
        component={ChatsStackNavigator}
        options={{
          headerShown: false,
          tabBarBadge: '',
          tabBarBadgeStyle: {
            width: 14,
            height: 14,
            backgroundColor: primaryColors.purple,
            // borderRadius: 50, // Ensure the badge is circular
          },
          // tabBarIcon: true,
          // tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Updates" 
        component={UpdatesStackNavigator} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Calls" 
        component={ChatsScreen} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
  container:{
    flex:1,
    paddingBottom:1,
  }
})


export default MainTabs;