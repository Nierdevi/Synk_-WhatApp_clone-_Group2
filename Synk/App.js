import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './constants/themeContext';
import { UserProvider } from './constants/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useRef,useEffect } from 'react';

import PhoneNumScreen from './Screens/PhoneNumScreen';
import Verification from './Screens/Verification';
import WelcomeScreen from './Screens/WelcomeScreen';
// import Tabs from './src/navigation/Tabs';
import MainTabs from './Screens/tabs/_tabLayout';
import { getUser } from './constants/userContext';

const Stack = createStackNavigator();



const MainLayout = () => {
  const navigationRef = useRef(null);
  const {session,setSession}=getUser();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const checkSession = async () => {
      const storedSession = await AsyncStorage.getItem('session');
      if (storedSession || session) {
        const session = JSON.parse(storedSession);
        setSession(session);
        // console.log(session)
        navigationRef.current?.navigate('Tabs');
      } else {
        navigationRef.current?.navigate('welcome');
      }
      setIsLoading(false);
    };

    checkSession();
  }, [setSession]);


  if (isLoading) {
    // Optionally, return a loading screen while checking session
    return <LoadingScreen />;
  }



  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator >
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


