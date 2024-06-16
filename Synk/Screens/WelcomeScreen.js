import { Entypo } from '@expo/vector-icons';
import React,{useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StyleSheet, Text, View,Image,Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PopupMenu } from '../components/PopupMenu';
import primaryColors from '../constants/colors';
import { useTheme } from '../constants/themeContext';


export default function WelcomeScreen({navigation}) {

  const [menuVisible, setMenuVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const toggleButtonLabel = theme === 'dark' ? 'Light Theme' : 'Dark Theme';
  const Applogo =theme==='dark'? require('../assets/AppLogo.png'):require('../assets/applogo_white.png')

  const menuItems = [
    { label: toggleButtonLabel, onPress:toggleTheme },
    { label: 'App Language', onPress: () => {} },
  ];


  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ?  primaryColors.black : primaryColors.white }]}>
        {/* <StatusBar backgroundColor={theme=='dark'? primaryColors.black:primaryColors.white} barStyle={theme=='dark'? 'light-content':'dark-content'} /> */}
        <Image
          source={Applogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Pressable style={[styles.dots]} onPress={() => setMenuVisible(true)}>
        <PopupMenu visible={menuVisible} onClose={() => setMenuVisible(false)} menuItems={menuItems} />
          <Entypo name="dots-three-vertical" size={24} color="black" style={{color:theme ==='dark' ? primaryColors.white: primaryColors.black}} />
        </Pressable>
        <View style={styles.textContainer}>
          <View>
            <Text style={[styles.text,{color:theme ==='dark' ? primaryColors.white: primaryColors.black}]}>Synk</Text>
            <Text style={[styles.textWelcome,{color:theme ==='dark' ? primaryColors.white: primaryColors.black}]}>
                Welcome To Synk Chat App, Connect To Millions Worldwide!</Text>
          </View>
          <TouchableOpacity >
            <Pressable style={styles.btn} onPress={() => navigation.navigate('Sign')}>
              <Text style={[styles.btnText, { color: primaryColors.white }]}>
                Tap to Continue
              </Text>
            </Pressable>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:primaryColors.white
  },
  text:{
      marginTop:'-10%',
      fontSize:24,
      fontWeight:"bold",
      marginBottom:16,
      textAlign:'center',
    },
    textWelcome:{
      marginTop:'16%',
      fontSize:22,
      padding:50,
      textAlign:'center'
    },
    logo:{
      flex:1,
      width:wp('50%'),
      height:hp('50%'),
    },
    textContainer:{
      flex:1.5,
      paddingBottom:70,
      justifyContent:'space-between'
    },
    btn: {
    marginBottom:20,
    marginHorizontal:50,
    backgroundColor: primaryColors.purple,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnText: {
    fontSize: 20,
    textAlign: 'center',
    marginRight: 10,
    fontWeight:'900'
    
  },
    dots:{
      position:'absolute',
      top:40,
      right:20
    },
})