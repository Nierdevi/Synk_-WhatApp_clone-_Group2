import { StyleSheet, Text, View,Pressable,ScrollView, Alert } from 'react-native';
import React, {useState} from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatLockScreen = ({navigation}) => {

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
            <Text style={styles.headerTitle}>Chat lock</Text>
        </View>
        <View style={styles.head}>
            <View style={styles.me}>
                <View style={{flexDirection: 'row',}}>
                    <MaterialIcons name="chat" size={80} color="black" />
                    <MaterialIcons name="lock" size={60} color="#59c96b" style={{left:-30 , top: 5,}} />
                </View>
                <Text style={styles.grey}>Chats lock keeps your chats locked and hidden</Text>
            </View>
            <Text>If you have locked chats, pull down on your chat list or type your secret code in the search bar to find them.</Text>
            <TouchableOpacity onPress={handlePress}>
            <Text style={styles.Text}>Learn more</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.can}>
            <Text style={{fontWeight: 'bold'}}>Unlock and clear locked chats</Text>
            <Text style={{paddingRight: 20,}}>If you forgot your secret code, you can clear it. This will also unlock and clear messages, photos and videos in locked chats.</Text>
        </View>
    </View>
  )
}

export default ChatLockScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'yellow',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
        backgroundColor: 'white',
        paddingTop: 50,
        paddingLeft: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
        paddingRight: 100,
        //paddingBottom: 10,
    },
    head:{
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
   },
   me:{
       alignItems:'center',
       paddingTop: 20,
       paddingBottom: 30,
   },
   lock:{
       color: "#59c96b",
       right: 20,
   },
   grey:{
       color: 'grey',
       fontWeight: 'bold',
       fontSize: 17,
   },
   Text:{
        color: 'blue',
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 10,
        top:-26.5,
        left: 253,
    },
    can:{
        padding: 20,
    },
})