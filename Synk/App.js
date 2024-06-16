import React from 'react';
import { StyleSheet, Text, View ,Appearance} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './Screens/WelcomeScreen'
import PhoneNumScreen from './Screens/PhoneNumScreen';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from './constants/themeContext';
import Verification from './Screens/Verification';

const Stack = createStackNavigator();



const MainLayout = () => {
  // const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Verification">
        {/* <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="PhoneNumScreen" component={PhoneNumScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <ThemeProvider>
        <MenuProvider>
          <MainLayout />
        </MenuProvider>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});


