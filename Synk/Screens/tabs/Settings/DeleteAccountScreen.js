import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { SecondaryColors } from '../../../constants/colors';


const DeleteAccountScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>Delete this account</Text>
        </View>

        <View>
            <View style={styles.pop}>
                <View style ={styles.dub}>
                    <Feather name="alert-triangle" size={24} color="red" style={{paddingRight: 15,}} />
                    <Text style={styles.head}>If you delete this account:</Text>
                </View>
                <View style={styles.pad}>
                    <Text style={styles.text}>{'\u2022'} The account will be deleted from Synk and all your devices</Text>
                    <Text style={styles.text}>{'\u2022'} Your message history will be erased</Text>
                    <Text Style={styles.text}>{'\u2022'} You will be removed from all your Synk groups</Text>
                    <Text style={styles.text}>{'\u2022'} Your Google storage backup will be deleted</Text>
                    <Text style={styles.text1}>{'\u2022'} Any channels you  created will be deleted</Text>
                </View>
                <View style={styles.dog}>
                    <MaterialIcons name="send-to-mobile" size={24} style={{paddingRight: 15,}} />
                    <Text style={styles.feet}>Change number instead?</Text>
                </View>
                <View style={{paddingBottom: 20,}}>
                    <TouchableOpacity style={styles.button}>
                            <Text>Change number</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.me}>
                <Text>To delete your account, confirm your country code and enter your phone number. </Text>
                <View></View>
                <View style={{paddingBottom: 20, paddingTop: 20}}>
                    <TouchableOpacity style={styles.button1}>
                            <Text>Delete account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}

export default DeleteAccountScreen

const styles = StyleSheet.create({
    container: {
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
        paddingRight: 109,
      },
      pop:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
      },
      dub:{
        flexDirection: 'row',
        padding: 20,
      },
      head:{
        top: 5,
        color: 'red',
        fontWeight: 'bold',
      },
      feet:{
        top: 5,
        fontWeight: 'bold',
      },
      pad:{
        paddingLeft: 60,
       
      },
      text: {
        color: 'grey',
      },
      text1: {
        color: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
        paddingBottom: 15,
      },
      dog:{
        flexDirection: 'row',
        padding: 20,
      },
      button:{
        backgroundColor: '#eba834',
        height: 40,
        width: 120,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 60,
    },
    button1:{
      backgroundColor: '#f05454',
      height: 40,
      width: 120,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      top: 200,
  },
    me:{
      paddingTop: 20,
      paddingLeft: 60,
      paddingRight: 20,
    },
})