import React, { useState } from 'react';
import { View, Text, Platform, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { primaryColors } from '../../constants/colors';
import { Feather, Entypo } from '@expo/vector-icons';
import { PopupMenu } from '../PopupMenu';
import { useTheme } from '../../constants/themeContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import CameraComponent from '../CameraComponent';


const isIOS = Platform.OS === 'ios';

export default function ChatsHeader() {

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation(); // Access the navigation object
  const [menuVisible, setMenuVisible] = useState(false);

  const openCamera = () => {
    setIsCameraVisible(true);
  };

  const closeCamera = () => {
    setIsCameraVisible(false);
  };

  const menuItems = [
    { label: 'New broadcast', onPress: () => {} },
    { label: 'Linked Devices', onPress: () => {} },
    { label: 'Starred messages', onPress: () => {} },
    { label: 'Settings', onPress: () => handleNavigateToSettings() }, // Navigate to SettingsScreen
    { label: 'Switch accounts', onPress: () => {} },
  ]; 

  const handleNavigateToSettings = () => {
    navigation.navigate('SettingsScreen'); // Navigate to SettingsScreen
    setMenuVisible(false); // Close the popup menu after navigation
  };

  return (
    <View style={[{ paddingTop: isIOS ? insets.top : insets.top + 10 }, styles.container, { backgroundColor: theme === 'dark' ? primaryColors.black : primaryColors.white }]}>
      <Text style={[styles.text, { color: theme === 'dark' ? primaryColors.white : primaryColors.black }]}>Chats</Text>

      <View style={styles.option}>
        <TouchableOpacity onPress={openCamera}>
          <Feather name="camera" size={22} color={theme === 'dark' ? primaryColors.white : primaryColors.black} />
        </TouchableOpacity>

        <Pressable style={[styles.dots, { color: theme === 'dark' ? primaryColors.white : primaryColors.black }]} onPress={() => setMenuVisible(true)}>
          <PopupMenu visible={menuVisible} onClose={() => setMenuVisible(false)} menuItems={menuItems} style={styles.popupMenu} />
          <Entypo name="dots-three-vertical" size={20} color={theme === 'dark' ? primaryColors.white : primaryColors.black} />
        </Pressable>
        <CameraComponent isVisible={isCameraVisible} onClose={closeCamera} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 3,
    height: hp('12%'), // Adjust height as needed
    paddingHorizontal: wp('4%'), // Adjust padding as needed
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('15%'),
  },
  popupMenu: {
    position: 'absolute',
    marginTop: 20,
    backgroundColor: 'white',
    width: wp("47%"),
    top: 12,
    right: -10,
    borderRadius: 10,
    elevation: 2,
  },
});
