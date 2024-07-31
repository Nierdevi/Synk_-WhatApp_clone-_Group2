import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const LiveLocationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>Live location</Text>
        </View>
        <View style={styles.head}>
            <View style={styles.me}>
            <MaterialIcons name="location-on" size={60} style={styles.location} />
                <Text style={styles.grey}>You aren't sharing live loction in any chats</Text>
            </View>
        </View>
        <Text style={styles.grey1}>Live location requires background location. You can manage this in your device settings.</Text>
    </View>
  )
}

export default LiveLocationScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 30,
        backgroundColor: 'yellow',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
        backgroundColor: 'white',
        paddingTop: 20,
        paddingLeft: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
        paddingRight: 100,
    },
    head:{
        paddingTop: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
    },
    me:{
        alignItems:'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    location:{
        color: 'black',
        paddingBottom: 20,
    },
    grey:{
        color: 'grey',
        fontWeight: 'bold',
    },
    grey1:{
        color: 'grey',
        padding: 20,
    },
    pen:{
        height: 22,
        left: 180,
        bottom: 5,
        color:"black",
    },
    bold:{
        fontWeight: 'bold',
    },
    you:{
        paddingTop: 10,
        flexDirection: 'row', 
    },
})