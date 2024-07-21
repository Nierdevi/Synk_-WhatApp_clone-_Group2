import { View, Text, Platform, StyleSheet,Pressable, TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {primaryColors,SecondaryColors} from '../../constants/colors';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { PopupMenu } from '../PopupMenu';
import { useTheme } from '../../constants/themeContext';
import CameraComponent from '../CameraComponent';

const isIOS = Platform.OS === 'ios';

export default function CallHeader({handleClearCallLogs}) {

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const {theme,toggleTheme}=useTheme();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
//   console.log('Safe area insets:', insets);

  const openCamera = () => {
    setIsCameraVisible(true);
  };

  const closeCamera = () => {
    setIsCameraVisible(false);
  };

  const menuItems = [
    { label: 'Clear call logs', onPress:handleClearCallLogs },
    { label: 'Settings', onPress: () => {} },
    { label: 'Switch accounts', onPress: () => {} },
  ];

    return (
        <View style={[{ paddingTop: isIOS ? insets.top : insets.top + 10 }, styles.container,{backgroundColor:theme === 'dark' ?  primaryColors.black : primaryColors.white}]}>
            <Text style={[styles.text,{color:theme === 'dark' ?  primaryColors.white : primaryColors.black}]}>Calls</Text>

            <View style={styles.option}>

                <TouchableOpacity onPress={openCamera}>
                    <Feather name="camera" size={22} color={theme === 'dark' ?  primaryColors.white : primaryColors.black} />
                </TouchableOpacity>

                <Pressable style={[styles.dots]} onPress={() => setMenuVisible(true)}>
                    <PopupMenu visible={menuVisible} onClose={() => setMenuVisible(false)} menuItems={menuItems}  style={styles.popupMenu}/>
                    <Entypo name="dots-three-vertical" size={20} color={theme === 'dark' ?  primaryColors.white : primaryColors.black} />
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
    elevation:3,
    height: hp('12%'), // Adjust height as needed
    paddingHorizontal: wp('4%'), // Adjust padding as needed
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  option:{
    flexDirection:'row',
    // backgroundColor:'yellow',
    justifyContent:'space-between',
    width:wp('15%')
  },
  popupMenu:{
    position:'absolute',
    marginTop:20,
    backgroundColor:'white',
    width:wp("47%"),
    top:12,
    right:-10,
    borderRadius:10,
    elevation:2,
  }
});
