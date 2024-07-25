import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SecondaryColors } from '../../../constants/colors';

const EmailScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>Email address</Text>
      </View>
      <View style={styles.head}>
            <View style={styles.me}>
                <MaterialIcons name="email" size={60} style={styles.lock} />
                <Text style={styles.grey}>Email helps you access your account. It isn't visible to</Text>
                <Text style={styles.grey}>others.</Text>
            </View>
            <View>
                <Text style={styles.grey}>Email</Text>
                <View style={styles.you}>
                    <Text style={styles.bold}>SynkUser@gmail.com</Text>
                    <MaterialCommunityIcons name="draw-pen" size={24} color="black" style={styles.pen} />
                </View>
                <View style={styles.you}>
                    <Ionicons name="checkmark-circle-outline" size={24} color="green" />
                    <Text style={{color: 'green', top: 3,}}>Verified</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default EmailScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 30,
        backgroundColor: SecondaryColors.secPurple,
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
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 10,
        paddingRight: 100,
    },
    head:{
         padding: 20,
    },
    me:{
        alignItems:'center',
        paddingTop: 20,
        paddingBottom: 30,
    },
    lock:{
        color: 'black',
        paddingBottom: 10,
    },
    grey:{
        color: 'grey',
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