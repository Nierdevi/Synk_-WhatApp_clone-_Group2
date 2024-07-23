import React from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { SecondaryColors } from '../constants/colors';

const LinkedDevicesScreen = ({ navigation }) => {

    const handlePress = () => {
        Alert.alert('You pressed the colored text!');
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
            <Text style={[styles.Text, {paddingBottom: 10,}]}>Use Synk on Web,Desktop and other devices.</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.Text2}>Link a device</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.dot}>
            <Text>Your personal messages are 
                <TouchableOpacity onPress={handlePress} style={{top: -5}}>
                    <Text style={{color:'red',}}> end-to-end </Text> 
                </TouchableOpacity>
                on all your devices.
            </Text>
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
    backgroundColor:'red',
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
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
},
});
