import { StyleSheet, Text, View, Pressable, Image, Button, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import avatar from '../assets/images/avatar.png';
import { TouchableOpacity } from 'react-native-gesture-handler';



const AvatarScreen = () => {
    const navigation = useNavigation();

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
                <Text style={styles.headerTitle}>Avatar</Text>
            </View>

            <View>
                <Image source={avatar} style={styles.image}/>
                <View style={styles.me}>
                    <Text style={[styles.Text, {paddingBottom: 10,}]}>Say more with Avatars now on Synk</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.Text2}>Create your Avatar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.Text1}>Learn more</Text>
            </TouchableOpacity>
        </View>
        
    )
}

export default AvatarScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'yellow',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        //marginBottom: 5,
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
    },
    image:{
        position: 'absolute',
        height: 350,
        width: 358,
        marginHorizontal: 1,
        marginVertical: 1,
    },
    Text:{
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    Text2:{
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    Text1:{
        color: 'blue',
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 20,
        top: 300,
        textDecorationLine: 'underline',

    },
    me:{
        alignItems: 'center',
        justifyContent: 'center',
        top: 250,
    },
    button:{
        backgroundColor: '#eba834',
        height: 40,
        width: 320,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
})