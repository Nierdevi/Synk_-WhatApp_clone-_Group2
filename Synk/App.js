import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen'

export default function App() {
  return (
    <View style={styles.container}>
      <WelcomeScreen />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
