import { View, Text,StyleSheet, Image,Pressable, TouchableOpacity, Switch, ScrollView		 } from 'react-native';
import React, {useState} from 'react';
import { Ionicons, MaterialIcons, Entypo, FontAwesome	, FontAwesome6,MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import AppLogo from '../../../assets/AppLogo.png'
import { SecondaryColors } from '../../../constants/colors';

export default function ChatInfo({navigation}) {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
};
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} >
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.back} />
        </Pressable>
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
          <Image source={AppLogo} style={styles.logo} />
          <View style={{bottom: 30,}}>
            <Text style={styles.text}>Synk-User</Text>
            <Text>+2331232434</Text>
          </View>
        </View>
        <View style={{marginLeft: 'flex-end',}}>
          <Pressable style={styles.dots}>
            <Entypo name="dots-three-vertical" size={20} />
          </Pressable>
        </View>
        <View style={styles.her}>
          <TouchableOpacity  style={styles.tab}>
            <Ionicons name="call-outline" size={24} color="black" />
            <Text>Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.tab}>
            <Entypo name="video-camera" size={24} color="black" />
            <Text>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.tab}>
            <Ionicons name="search-outline" size={24} color="black" />
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.header1}>
        <Text style={{padding: 10,}}>About</Text>
        <Text style={{paddingLeft: 10,}}>Date</Text>
      </View>

      <View style={styles.header1}>
        <Text style={styles.me}>Media, links, and docs</Text>
      </View>

      <View style={styles.header2}>
        <TouchableOpacity style={styles.pad}>
          <Ionicons name="notifications" size={24} color="black" />
          <Text style={styles.text1}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pad}>
          <FontAwesome name="picture-o" size={24} color="black" />
          <Text style={styles.text1}>Media visibility</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header2}>
        <TouchableOpacity style={styles.pad}>
          <MaterialIcons name="lock" size={24} color="black" />
          <View>
            <Text style={styles.text1}>Encryption</Text>
            <Text style={styles.text2}>Mesages and calls are end-to-end encrypted. Tap to verify</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pad}>
          <MaterialCommunityIcons name="clock-fast" size={24} color="black" />
          <View>
            <Text style={styles.text1}>Disappearing messages</Text>
            <Text style={styles.text2}>Off</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleSwitch} style={styles.pad}>
          <MaterialCommunityIcons name="message-lock-outline" size={24} color="black" />
          <View>
            <Text style={styles.text1}>Chat lock</Text>
            <Text style={styles.text3}>Lock and hide this chat on this device</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#ffffff' }}
            thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.header1}>
        <Text style={styles.me}>Other phones</Text>
        <View style={styles.mine}>
          <View style={{marginRight: 150,}}>
            <Text>+2334354456</Text>
            <Text style={styles.me1}>Mobile</Text>
          </View>
          <Pressable style={styles.icon}>
            <MaterialIcons name="chat" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.icon}>
            <Ionicons name="call-outline" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.icon}>
            <Entypo name="video-camera" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      <View style={styles.header1}>

        <TouchableOpacity style={styles.pad}>
          <FontAwesome6 name="heart" size={24} color="black" />
          <Text style={styles.text1}>Block Synk_User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pad}>
          <MaterialCommunityIcons name="cancel" size={24} color="red" />
          <Text style={styles.text0}>Block Synk_User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pad}>
          <AntDesign name="dislike2" size={24} color="red" />
          <Text style={styles.text0}>Report Synk_User</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: SecondaryColors.secPurple,
  },
  header: {
    backgroundColor: 'white',
    height: 'auto',
    marginBottom: 10,
    paddingBottom: 10,
    paddingTop: 0,
  },
  header1: {
    backgroundColor: 'white',
    height: 'auto',
    marginBottom: 10,
    paddingBottom: 10,
  },
  header2: {
    backgroundColor: 'white',
    height: 'auto',
    marginBottom: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
    //paddingBottom: 10,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 100,
    bottom: 30,
  },
  back:{
    padding: 30,
    right: 8,
  },
  dots: {
    alignItems: 'flex-end',
    marginRight: 20,
    bottom:  180
  },
  text:{
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text0:{
    marginLeft: 15,
    justifyContent: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
  text1:{
    marginLeft: 15,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  text2:{
    marginLeft: 15,
    marginRight: 100,
    justifyContent: 'center',
    fontSize: 13,
    color: 'grey',
  },
  text3:{
    marginLeft: 15,
    marginRight: 50,
    justifyContent: 'center',
    fontSize: 13,
    color: 'grey',
  },
  me:{
    fontSize: 13,
    color: 'grey',
    fontWeight: 'bold',
    padding: 10,
  },
  me1:{
    fontSize: 13,
    color: 'grey',
    fontWeight: 'bold',
  },
  pad:{
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 20,
    alignItems: 'center',
  },
  mine:{
    paddingLeft: 10,
    flexDirection: 'row',
  },
  icon:{
    marginLeft: 15,
  },
  tab:{
    //backgroundColor: 'red',
    borderWidth:StyleSheet.hairlineWidth,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight:30,
    marginRight: 10,
  },
  her:{
    flexDirection: 'row',
     padding:10,
     justifyContent: 'center',
     marginTop: -45
  },
})