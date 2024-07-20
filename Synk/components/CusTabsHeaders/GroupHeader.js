import { View, Text, Platform, StyleSheet,Pressable, TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {primaryColors,SecondaryColors} from '../../constants/colors';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { PopupMenu } from '../../components/PopupMenu';
import { useTheme } from '../../constants/themeContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


const isIOS = Platform.OS === 'ios';

export default function GroupHeader() {

    const {theme,toggleTheme}=useTheme();
    const insets = useSafeAreaInsets();
    const [menuVisible, setMenuVisible] = useState(false);
    //   console.log('Safe area insets:', insets);
    const navigation = useNavigation(); // Access the navigation object


    const menuItems = [
        { label: 'Settings', onPress: () => {handleNavigateToSettings} },
        { label: 'Switch accounts', onPress: () => {} },
    ];

    const handleNavigateToSettings = () => {
      navigation.navigate('SettingsScreen'); // Navigate to SettingsScreen
      setMenuVisible(false); // Close the popup menu after navigation
    };

    return (
        <View style={[{ paddingTop: isIOS ? insets.top : insets.top + 10 }, styles.container,{backgroundColor:theme === 'dark' ?  primaryColors.black : primaryColors.white}]}>
            <Text style={[styles.text,{color:theme === 'dark' ?  primaryColors.white : primaryColors.black}]}>Groups</Text>

            <View style={styles.option}>

                <TouchableOpacity>
                    <Feather name="camera" size={22} color={theme === 'dark' ?  primaryColors.white : primaryColors.black} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Feather name="search" size={24} color={theme === 'dark' ?  primaryColors.white : primaryColors.black} />
                </TouchableOpacity>

                <Pressable style={[styles.dots]} onPress={() => setMenuVisible(true)}>
                    <PopupMenu visible={menuVisible} onClose={() => setMenuVisible(false)} menuItems={menuItems}  style={styles.popupMenu}/>
                    <Entypo name="dots-three-vertical" size={20} color={theme === 'dark' ?  primaryColors.white : primaryColors.black} />
                </Pressable>

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
    width:wp('25 %')
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
