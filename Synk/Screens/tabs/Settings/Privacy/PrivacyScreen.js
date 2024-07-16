import { StyleSheet, Text, View,Pressable,ScrollView } from 'react-native';
import React, {useState} from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';


const PrivacyScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const handleNavigationToLastSeen = () =>{
        navigation.navigate('LastSeen');
    };

    const handleNavigationToProfilePhoto = () =>{
        navigation.navigate('ProfilePhoto');
    };

    const handleNavigationToAbout = () =>{
        navigation.navigate('About');
    };

    const handleNavigationToDefault = () =>{
        navigation.navigate('Default');
    };

    const handleNavigationToGroups = () =>{
        navigation.navigate('Groups');
    };

    const handleNavigationToLiveLocation = () =>{
        navigation.navigate('LiveLocation');
    };

    const handleNavigationToCalls = () =>{
        navigation.navigate('Calls');
    };

    const handleNavigationToAppLock = () =>{
        navigation.navigate('AppLock');
    };

    const handleNavigationToChatLock = () =>{
        navigation.navigate('ChatLock');
    };

    const handleNavigationToAdvanced = () =>{
        navigation.navigate('Advanced');
    };

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

                <TouchableOpacity style={styles.mine} onPress={handleNavigationToLastSeen}>
                    <Text style={styles.you}>Last seen and online</Text>
                    <Text style={styles.text}>Nobody</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mine} onPress={handleNavigationToProfilePhoto}>
                    <Text style={styles.you}>Profile Photo</Text>
                    <Text style={styles.text}>Everyone</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mine} onPress={handleNavigationToAbout}>
                    <Text style={styles.you}>About</Text>
                    <Text style={styles.text}>Everyone</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>Status</Text>
                    <Text style={styles.text}>20 contacts excluded</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={toggleSwitch} style={styles.can}>
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Text style={styles.you}>Read reciepts</Text>
                    <View style={styles.switchContainer}>
                        <Switch
                            trackColor={{ false: '#767577', true: '#ffffff' }}
                            thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
                <Text style={styles.pod}>If turned off, you won't send or recieve Read reciepts. Read receipts are always sent for group chats.</Text>
            </TouchableOpacity> 
            
            <View style={styles.head}>
                <Text style={styles.text2}>Disappearing messages</Text>
                <TouchableOpacity style={{flexDirection: 'row',}} onPress={handleNavigationToDefault}>
                    <View>
                        <Text style={styles.you}>Default message timer</Text>
                        <Text style={styles.text0}>Start new chats with disappearing messages set</Text>
                        <Text style={styles.text0}>to your timer</Text>
                    </View>
                    <Text style={styles.text1}>Off</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.her}>
            <TouchableOpacity style={styles.mine} onPress={handleNavigationToGroups}>
                    <Text style={styles.you}>Groups</Text>
                    <Text style={styles.text}>Everyone</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine} onPress={handleNavigationToLiveLocation}>
                    <Text style={styles.you}>Live location</Text>
                    <Text style={styles.text}>None</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine} onPress={handleNavigationToCalls}>
                    <Text style={styles.you}>Calls</Text>
                    <Text style={styles.text}>Silence unknown callers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine}>
                    <Text style={styles.you}>Blocked Contacts</Text>
                    <Text style={styles.text}>29</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine} onPress={handleNavigationToAppLock}>
                    <Text style={styles.you}>App lock</Text>
                    <Text style={styles.text}>Disabled</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine} onPress={handleNavigationToChatLock}>
                    <Text style={styles.you}>Chat lock</Text>
                    <Text style={styles.text}></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mine} onPress={handleNavigationToAdvanced}>
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
    text0:{
        fontSize: 13,
        color: 'grey',
        lineHeight: 15
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
    switchContainer: {
        marginLeft: 'auto', // Pushes the switch to the right end
    },
    him:{
        flexDirection: "row",
    },
    her:{
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    head:{
        padding: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
        borderTopColor: 'Lightgray',
    },
    can: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    switchContainer: {
        marginLeft: 'auto', // Pushes the switch to the right end
    },
    pod:{
        paddingRight: 80,
        top: -15,
    },
})