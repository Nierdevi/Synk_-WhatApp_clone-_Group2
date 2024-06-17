import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotImplementedScreen from "../screens/NotImplementedScreen";
import ChatsHomeScreen from "../screens/ChatsHomeScreen";
import{Ionicons}from '@expo/vector-icons';

import ChatScreen from '../screens/ChatScreen';

const Tab  = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
        <Tab.Navigator initialRouteName="Chats">
            <Tab.Screen 
                name="Status"
                component={NotImplementedScreen } 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="logo-whatsapp" size={size} color={color} />
                    ),
                }}
             />
            <Tab.Screen 
                name="Calls"
                component={NotImplementedScreen }
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="call-outline" size={size} color={color} />
                    ),
                }}
            />        
            <Tab.Screen 
                name="Camera" 
                component={NotImplementedScreen }
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="camera-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chats"
                component={ChatsHomeScreen }
                options={{
                    tabBarIcon: ({color, size}) => (
                        // add 'ios-' if you want the ios version of the chat bubble
                        <Ionicons name="chatbubbles-sharp" size={size} color={color} />
                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen
                name="Settings"
                component={NotImplementedScreen }

                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                    headerShown:false
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;