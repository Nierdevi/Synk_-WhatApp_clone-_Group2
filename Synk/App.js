import React from 'react';
import { StyleSheet, Text, View ,Appearance} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './Screens/WelcomeScreen'
import SignUpScreen from './Screens/SignUpScreen';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from './constants/themeContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <ThemeProvider>
        <MenuProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome'>
              <Stack.Screen name='welcome' component={WelcomeScreen} 
              options={{
                headerShown:false
              }}
              />
              <Stack.Screen name='Signup' component={SignUpScreen}
                options={{
                headerShown:false
              }}
              />
            </Stack.Navigator>
        </NavigationContainer>
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


