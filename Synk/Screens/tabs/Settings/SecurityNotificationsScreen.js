import { StyleSheet, Text, View, Pressable, Alert, TouchableOpacity, Image, Switch } from 'react-native';
import React from 'react';
import { useState } from "react";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import updateIcon from '../../../assets/tabIcons/updateIcon.png'
import { SecondaryColors } from '../../../constants/colors';

const SecurityNotificationsScreen = ({navigation}) => {

    const [autoUpdate, setAutoUpdate] = useState(false);
    const [notifyUpdate, setNotifyUpdate] = useState(true);
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const handlePress = () => {
        // Handle the link press
        Alert.alert('Learn more pressed');
      };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>Security notifications</Text>
        </View>
        <View style={styles.me}>
            <View style={styles.pad}>
                <MaterialIcons name="lock" size={60} style={styles.lock} />
            </View>
            <View style={styles.mine}>
                <Text style={styles.text}>Your chats and calls are private</Text>
                <Text style={styles.grey}>End-to-end encryption kepps your personal messages</Text>
                <Text style={styles.grey}>and calls between you and the people you choose.</Text>
                <Text style={styles.grey}>Not even Synk can read or listen to them. This</Text>
                <Text style={{paddingBottom: 10, color: 'grey',}}>includes your:</Text>

                <View style={styles.flex}>
                    <MaterialIcons name="chat" size={24} color="black" style={styles.icon} />
                    <Text style={styles.grey}>Text and voice messages</Text>
                </View>

                <View style={styles.flex}>
                    <MaterialIcons name="call" size={24} color="black" style={styles.icon} />
                    <Text style={styles.grey}>Audio and video calls</Text>
                </View>

                <View style={styles.flex}>
                    <Ionicons name="attach" size={24} color="black" style={styles.icon} />
                    <Text style={styles.grey}>Phots, videos and documents</Text>
                </View>

                <View style={styles.flex}>
                    <Ionicons name="location-outline" size={24} color="black" style={styles.icon}/>
                    <Text style={styles.grey}>Location sharing</Text>
                </View>

                <View style={styles.flex}>
                    <Image source={updateIcon} style={styles.image}/>
                    <Text style={[styles.grey, {paddingLeft: 10}]}>Status updates</Text>

                </View>

                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.Text1}>Learn more</Text>
                </TouchableOpacity>
            </View>
        </View>

        <TouchableOpacity onPress={toggleSwitch} style={{padding: 20,}}>
            <View style={{flexDirection: 'row',}}>
                <Text style={{fontWeight: 'bold', fontSize: 15,}}>Show security notifications on this device</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#ffffff' }}
                    thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <Text style={styles.grey1}>Get notified when your security code changes</Text>
            <Text style={styles.grey1}>for a contact's phone in an end-to-end encrypted</Text>
            <Text style={styles.grey1}>chat. If you have multiple devices, this setting</Text>
            <Text style={styles.grey1}>must be enabled on each device where you want</Text>
            <Text style={styles.grey1}>to get notifications.</Text>

            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.Text2}>Learn more</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    </View>
  );
};

export default SecurityNotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: SecondaryColors.secPurple,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
        backgroundColor: 'white',
        paddingTop: 20,
        paddingLeft: 10,
      },
      headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 10,
        paddingRight: 109,
      },
      me:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
      },
    lock:{
        color:"black",
    },
    pad:{
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mine:{
        padding: 20,
    },
    text:{
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    flex:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon:{
        paddingRight: 10,
    },
    Text1:{
        color: 'blue',
        fontSize: 13,
        fontWeight: 'bold',
        top: 3,
        paddingTop: 5,
    },
    Text2:{
        color: 'blue',
        fontSize: 13,
        fontWeight: 'bold',
        top: 3,
        paddingTop: 5,
        left: 105,
        top:-20.5,
    },
    grey:{
        color: 'grey',
        fontSize: 13,
    },
    grey1:{
        color: 'grey',
        fontSize: 13,
        lineHeight: 15,
    },
    image:{
        height: 22,
        width: 22,
    },
    switch1: {
        marginLeft: 30,
        marginTop: -15,
      },
})