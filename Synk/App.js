import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from './constants/themeContext';
import {UserProvider} from './constants/userContext'
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { useEffect } from 'react';
import { startContactRefresh } from './backend/contacts ';
import { loadCachedContacts } from './backend/contacts ';

import PhoneNumScreen from './Screens/PhoneNumScreen';
import Verification from './Screens/Verification';
import WelcomeScreen from './Screens/WelcomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
// import Tabs from './src/navigation/Tabs';
import MainTabs from './Screens/tabs/_tabLayout'


const Stack = createStackNavigator();



const MainLayout = () => {

  useEffect(() => {
    // Start the contact refresh when the app mounts
    loadCachedContacts();
    // startContactRefresh();
  }, []);
  // const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen name='welcome' component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Verification' component={Verification} options={{headerShown:false}}/>
        <Stack.Screen name='PhoneNumber' component={PhoneNumScreen} options={{headerShown:false}} />
        <Stack.Screen name='Tabs' component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <UserProvider>
        <ThemeProvider>
          <MenuProvider>
            <MainLayout />
          </MenuProvider>
        </ThemeProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});


