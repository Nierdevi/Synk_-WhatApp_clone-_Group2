import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './constants/themeContext';
import { UserProvider } from './constants/userContext';

import PhoneNumScreen from './Screens/PhoneNumScreen';
import Verification from './Screens/Verification';
import WelcomeScreen from './Screens/WelcomeScreen';
// import Tabs from './src/navigation/Tabs';
import MainTabs from './Screens/tabs/_tabLayout';
import { getUser } from './constants/userContext';
import LoadingScreen from './components/LoadingScreen';
const Stack = createStackNavigator();



const MainLayout = () => {
  const navigationRef = useRef(null);
  const {session,setSession}=getUser();
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('welcome');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedSession = await AsyncStorage.getItem('session');
        console.log('Stored session:', storedSession);

        if (storedSession || session) {
          const sessionData = JSON.parse(storedSession);
          setSession(sessionData);
          setInitialRoute('Tabs');
        }
      } catch (error) {
        console.error('Failed to check session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [setSession]);


  if (isLoading) {
   // Optionally, return a loading screen while checking session
   return <LoadingScreen />;
  }



  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRoute} >
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


