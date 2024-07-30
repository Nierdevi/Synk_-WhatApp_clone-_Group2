import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import GroupsScreen from "./GroupsScreen";
import GroupRoom from "./GroupRoom";
import GroupInfo from "./GroupInfo";

const GroupStack=createStackNavigator();

const GroupStackNavigator=({navigation,route})=>{

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'GroupsScreen';
    if (routeName === 'GroupsScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'flex',height:70,  } });
      navigation.setOptions({ tabBarStyle: { display: 'flex',height:80,  },headerShown:true })
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'none' },headerShown:false });
    }
  }, [navigation, route]);

  return (
    <GroupStack.Navigator initialRouteName="GroupsScreen">
        <GroupStack.Screen name="GroupsScreen" component={GroupsScreen} options={{ headerShown: false}} />
        <GroupStack.Screen name="GroupRoom" component={GroupRoom} options={{ headerShown: true}} />
        <GroupStack.Screen name="GroupInfo" component={GroupInfo} options={{ headerShown: false}} />
    </GroupStack.Navigator>
  );
};

export default GroupStackNavigator;