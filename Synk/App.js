import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuProvider } from 'react-native-popup-menu';
import WelcomeScreen from './Screens/WelcomeScreen';
import { ThemeProvider } from './constants/themeContext';
import { StyleSheet, View, Text } from 'react-native';
import PhoneNumScreen from './Screens/PhoneNumScreen';
import { supabase } from '../utils/supabase';


// import Verification from './Screens/Verification';
import SettingsScreen from './Screens/SettingsScreen';

const Stack = createStackNavigator();



const MainLayout = () => {
  // const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen name='welcome' component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='settings' component={SettingsScreen} options={{headerShown:false}}/>
        <Stack.Screen name='PhoneNumber' component={PhoneNumScreen} options={{headerShown:false}} />
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


