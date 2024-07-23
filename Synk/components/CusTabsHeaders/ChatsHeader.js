import React, { useState } from 'react';
import { View, Text, Platform, StyleSheet, Pressable, TouchableOpacity, Modal, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { primaryColors } from '../../constants/colors';
import { Feather, Entypo,FontAwesome6 } from '@expo/vector-icons';
import { PopupMenu } from '../PopupMenu';
import { useTheme } from '../../constants/themeContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import CameraComponent from '../CameraComponent';
import AppLogo from '../../assets/AppLogo.png'


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
    { label: 'Linked Devices', onPress: () => handleNavigateToLinked() },
    //{ label: 'Starred messages', onPress: () => {} },
    { label: 'Settings', onPress: () => handleNavigateToSettings() }, // Navigate to SettingsScreen
    { label: 'Switch accounts', onPress: () => {toggleDrawer(); }},
  ]; 

  const handleNavigateToSettings = () => {
    navigation.navigate('SettingsScreen'); // Navigate to SettingsScreen
    setMenuVisible(false); // Close the popup menu after navigation
  };

  const handleNavigateToLinked = () => {
    navigation.navigate('Linked'); // Navigate to LinkedDevicesScreen
  };

  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // State for drawer visibility
  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const closeModal = () => {
    setIsDrawerVisible(false);
  };

  // Prevent propagation of press events to the parent elements
   const stopPropagation = event => {
    event.stopPropagation();
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDrawerVisible}
        onRequestClose={() => {
          setIsDrawerVisible(false);
        }}
      >
        <Pressable style={styles.modalContainer} onPress={closeModal}>
          <Pressable style={styles.drawerContent} onPress={stopPropagation}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
              <Image source={AppLogo} style={styles.headerImage1} />
                <View style={styles.me}>
                  <Text style={styles.drawerText}>Synk_User</Text>
                  <Text style={styles.drawerText1}>+233 50 343 4750</Text>
                </View>
                <FontAwesome6 name="circle-check" size={24} style={styles.check}/>
            </View>
            <TouchableOpacity style={styles.plus}>
              <Feather name="plus-circle" size={34} color="black" />
              <Text style={styles.drawerText}>Add account</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  drawerContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
    
  },
  drawerText1: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 15,
    color: 'grey',
    lineHeight: 14,
  },
  plus:{
    paddingTop: 40,
    paddingLeft:6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage1: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  check:{
    left: 150,
    backgroundColor: '#59c96b', 
    borderRadius: 100,
    color: "black",
  }
});
