import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './constants/themeContext';
import { UserProvider, getUser } from './constants/userContext';

import PhoneNumScreen from './Screens/PhoneNumScreen';
import Verification from './Screens/Verification';
import WelcomeScreen from './Screens/WelcomeScreen';
import MainTabs from './Screens/tabs/_tabLayout';
import LoadingScreen from './components/LoadingScreen';

const Stack = createStackNavigator();

const MainLayout = () => {
    const navigationRef = useRef(null);
    const { session, setSession, isLoading, setIsLoading } = getUser();
    const [initialRoute, setInitialRoute] = useState('welcome');

    useEffect(() => {
        const checkSession = async () => {
            //await AsyncStorage.removeItem('session')
            try {
                const storedSession = await AsyncStorage.getItem('session');
                if (storedSession) {
                  // console.log("Stored session: ",session)
                    const sessionData = JSON.parse(storedSession);
                    console.log('Stored Session in MainLayout:', sessionData);
                    // console.log('Stored Session phoneNumber in MainLayout:', sessionData.phoneNumber);
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
        return <LoadingScreen />;
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name='welcome' component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Verification' component={Verification} options={{ headerShown: false }} />
                <Stack.Screen name='PhoneNumber' component={PhoneNumScreen} options={{ headerShown: false }} />
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
