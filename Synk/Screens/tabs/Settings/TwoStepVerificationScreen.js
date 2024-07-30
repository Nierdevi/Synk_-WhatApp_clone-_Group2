import { StyleSheet, Text, View, Pressable,Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import verification from '../../../assets/images/verification.png'
import { SecondaryColors } from '../../../constants/colors';


const TwoStepVerificationScreen = ({navigation}) => {

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
            <Text style={styles.headerTitle}>Two-step verification</Text>
      </View>
      <View>
            <View style={styles.post}>
                <Image source={verification} style={styles.image}/>
                <Text>Two-step-verification is on. You'll need to enter your PIN if</Text>
                <Text>you register your phone number on Synk again.                    </Text>
                <TouchableOpacity style={{maxWidth:60,}} onPress={handlePress}>
                    <Text style={styles.Text1}>Learn more</Text>
                </TouchableOpacity>   
            </View>
            <TouchableOpacity style={styles.mine}>
                <Ionicons name="close-circle-outline" size={24} color="black" style={{paddingRight: 10,}} />
                <Text style={styles.pop}>Turn off</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mine}>
                <MaterialIcons name="password" size={24} color="black" style={{paddingRight: 10,}} />
                <Text style={styles.pop}>Turn off</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

export default TwoStepVerificationScreen

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
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
        paddingRight: 100,
    },
    image:{
        height: 100,
        width: 100,
    },
    post:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
        padding: 20,
    },
    Text1:{
        color: 'green',
        fontSize: 13,
        fontWeight: 'bold',
        top: -21,
        left: 125,
        paddingTop: 5,
    },
    mine:{
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    pop:{
        top: 5.5,
    },
})