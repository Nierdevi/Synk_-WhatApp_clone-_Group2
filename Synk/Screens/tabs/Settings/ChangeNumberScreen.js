import { StyleSheet, Text, View, Pressable,TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons, Entypo, FontAwesome6 } from '@expo/vector-icons';


const ChangeNumberScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>Change number</Text>
      </View>
      <View style={styles.dot}>
            <View style={styles.sim}>
                <FontAwesome6 name="sim-card" size={60} color="black" />
                <Entypo name="dots-three-horizontal" size={30} color="#eba834" style={{paddingLeft:5, paddingRight:5,}} />
                <FontAwesome6 name="sim-card" size={60} color="#eba834" />
            </View>
            <View style={{paddingLeft:30,}}>
                <View style={{paddingBottom: 10,}}>
                    <Text style={styles.text}>Changing your phone number will migrate</Text>
                    <Text style={styles.text}>your account info, groups & settings.</Text>
                </View>
                <View style={{paddingBottom: 10,}}>
                    <Text style={styles.text1}>Before proceeding, please confirm that you are able</Text>
                    <Text style={styles.text1}>to receive SMS or calls at your new number.</Text>
                </View>
                <View style={{paddingBottom: 10,}}>
                    <Text style={styles.text1}>If you have both a new phone & a new number, first</Text>
                    <Text style={styles.text1}>change your number on your old phone.</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button}>
                        <Text>Next</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChangeNumberScreen

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
    sim:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,

    },
    dot:{
        padding: 20,
        //alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    text1:{
        fontSize: 13,
        color: 'grey',
    },
    button:{
        backgroundColor: '#eba834',
        height: 40,
        width: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top: 400,
        left: '35%',
    },
})