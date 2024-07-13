import { StyleSheet, Text, View,Pressable,ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';


const PrivacyScreen = () => {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>Privacy</Text>
        </View>

        <ScrollView>
            <View style={styles.her}>
                <View style={styles.me}>
                    <Text style={styles.text}>Who can see my personal info</Text>
                </View>

                <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>Last seen and online</Text>
                    <Text style={styles.text}>Nobody</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>Profile Photo</Text>
                    <Text style={styles.text}>Everyone</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>About</Text>
                    <Text style={styles.text}>Everyone</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>Status</Text>
                    <Text style={styles.text}>20 contacts excluded</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.him}>
                <TouchableOpacity style={styles.mine1}>
                    <Text style={styles.you}>Read receipts</Text>
                    <Text style={styles.text}>If turned off, you won't send or recieve Read</Text>
                    <Text style={styles.text}>receipts. Read receipts are always sent for</Text>
                    <Text style={styles.text}>group chats.</Text>
                </TouchableOpacity>
                <Switch/>
            </View>

            <View style={styles.head}>
                <Text style={styles.text2}>Disappearing messages</Text>
                <View style={{flexDirection: 'row',}}>
                    <TouchableOpacity>
                        <Text style={styles.you}>Default message timer</Text>
                        <Text style={styles.text}>Start new chats with disappearing messages set</Text>
                        <Text style={styles.text}>to your timer</Text>
                    </TouchableOpacity>
                    <Text style={styles.text1}>Off</Text>
                </View>
            </View>

            <View style={styles.her}>
            <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>Groups</Text>
                    <Text style={styles.text}>Everyone</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>Live location</Text>
                    <Text style={styles.text}>None</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>Calls</Text>
                    <Text style={styles.text}>Silence unknown callers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>Blocked Contacts</Text>
                    <Text style={styles.text}>29</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>App lock</Text>
                    <Text style={styles.text}>Everyone</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>Chat lock</Text>
                    <Text style={styles.text}></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>Advanced</Text>
                    <Text style={styles.text}>Protect IP address in calls, Disable link previews</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </View>
  )
}

export default PrivacyScreen

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
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 10,
        paddingRight: 250,
        //paddingBottom: 10,
    },
    me:{
        marginBottom: 10,
    },
    you:{
        fontWeight: 'bold',
        fontSize: 15,
    },
    you1:{
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 10,
    },
    text:{
        fontSize: 13,
        color: 'grey',
    },
    text1:{
        fontSize: 13,
        color: 'grey',
        left:35,
        top: 18,
    },
    text2:{
        fontSize: 13,
        color: 'grey',
        paddingBottom: 10,
    },
    mine:{
        marginBottom: 25,
        
    },
    mine1:{
        marginBottom: 25,
        paddingLeft:20,
        paddingRight:20,
        
    },
    him:{
        flexDirection: "row",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
    },
    her:{
        padding: 20,
    },
    head:{
        padding: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
    },
})