// src/navigation/MainTabNavigator.js
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsHomeScreen from "../screens/ChatsHomeScreen";
import NotImplementedScreen from "../screens/NotImplementedScreen";
import UpdatesScreen from '../screens/UpdatesScreen'; // Import UpdatesScreen

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Chats">
      <Tab.Screen 
        name="Status"
        component={UpdatesScreen} // Use UpdatesScreen here
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="logo-whatsapp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Calls"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="call-outline" size={size} color={color} />
          ),
        }}
      />        
      <Tab.Screen 
        name="Camera" 
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="camera-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsHomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbubbles-sharp" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
