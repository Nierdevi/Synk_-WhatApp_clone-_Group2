import React from 'react';
import { StyleSheet, Text, View ,Appearance} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from './constants/themeContext';

import WelcomeScreen from './Screens/WelcomeScreen';
// import Verification from './Screens/Verification';
import SettingsScreen from './Screens/SettingsScreen';

const Stack = createStackNavigator();



const MainLayout = () => {
  // const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen name='welcome' component={WelcomeScreen} options={{headerShown:false}}/>
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


