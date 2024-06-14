import React from 'react';
import { StyleSheet, Text, View ,Appearance} from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen'
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from './constants/themeContext';



export default function App() {
  return (
    <View style={styles.container}>
    <ThemeProvider>
      <MenuProvider>
          <WelcomeScreen />
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


