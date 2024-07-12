import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import avatar1 from '../assets/images/avatar1.jpg';

const AvatarScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Text style={styles.headerTitle}>Avatar</Text>
            </View>

            <View>
                <Image source={avatar1} style={styles.image}/>
            </View>
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
    
})