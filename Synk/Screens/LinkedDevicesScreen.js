import React from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { SecondaryColors } from '../constants/colors';

const LinkedDevicesScreen = ({ navigation }) => {

    const handlePress = () => {
        Alert.alert('end-to-end encrypted pressed');
    };

    const handlePress1 = () => {
        // Handle the link press
        Alert.alert('Learn more pressed');
      };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>Linked devices</Text>
        </View>
        <View style={styles.videoContainer}>
            <Video
            source={require('../assets/Videos/DigitalNetwork.mp4')} // Adjust the path to your video
            style={styles.backgroundVideo}
            shouldPlay
            isLooping
            resizeMode="cover"
            />
        </View>
        <View style={styles.me}>
            <Text>Use Synk on Web,Desktop and other devices.</Text>
            <TouchableOpacity onPress={handlePress1}>
                <Text style={styles.Text}>Learn more</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.Text2}>Link a device</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.mine}>
            <Text style={styles.tom}>Device Status</Text>
            <Text style={styles.tom}>Tap a device to log out.</Text>
        </View>
        <View style={styles.dot}>
            <MaterialIcons name="lock" size={14} color="black" style={{bottom: 15}}/>
            <View>
                <Text style={{fontSize:13,}}>Your personal messages are                                      on all your devices.</Text>
                <TouchableOpacity onPress={handlePress} style={styles.yoo}>
                    <Text style={{color:'red',fontSize: 13,}}> end-to-end encrypted </Text> 
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

export default LinkedDevicesScreen;

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: SecondaryColors.secPurple,
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'Lightgray',
    backgroundColor: 'white',
    paddingTop: 50,
    paddingLeft: 10,
},
headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    paddingRight: 100,
},
videoContainer: {
    alignItems: 'center',
    height: '400',
},
backgroundVideo: {
    width: '100%',
    height: 250,
},
me:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    paddingBottom: 10,
    marginBottom:10,
},
button:{
    backgroundColor: '#eba834',
    height: 40,
    width: 320,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
},
dot:{
    padding: 20,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection:'row',
},
yoo:{
    left: 147,
    bottom: 29.5,
},
mine:{
    backgroundColor: 'white',
    padding:10,
},
tom:{
    fontSize:13
},
Text:{
    color: 'blue',
    fontSize: 13,
    fontWeight: 'bold',
    bottom: 1,
    paddingBottom: 15,
},
});
