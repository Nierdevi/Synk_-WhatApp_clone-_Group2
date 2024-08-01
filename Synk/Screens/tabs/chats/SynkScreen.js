import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity,SafeAreaView  } from 'react-native';
import React from 'react';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

Applogo=require('../../../assets/AppLogo.png')

const SynkScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <View style={{flexDirection:'row',alignItems:'center',gap:3}}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <View style={{flexDirection:"row", paddingLeft: 5,}}>
                    <Image
                        source={Applogo} 
                        style={styles.profilePicture}
                        cachePolicy="disk"
                    />
                    <View>
                        <View style={{flexDirection:"row"}}> 
                            <Text style={styles.headerTitle}>Synk</Text>
                            <Image source={Verified} cachePolicy='memory-disk' style={styles.verify} tintColor="#7410d7" />
                        </View>
                        <Text style={styles.headerTitle1}>Official Synk Account</Text>
                    </View>
                </View>
            </View>

            <View style={styles.headerRight}>
                <TouchableOpacity style={styles.iconButton} onPress={() => { setMenuVisible(true) }}>
                    <Entypo name="dots-three-vertical" size={20} />
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView>
            
        </ScrollView>
        <View style={styles.end}>
            <Text style={{textAlign:'center'}}>Only Synk can send messages</Text>
        </View>
    </SafeAreaView>
  )
}

export default SynkScreen

const styles = StyleSheet.create({
container:{
    flex: 1,
},
header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'Lightgray',
    backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 15,
    justifyContent:'space-between'
},
headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 5,
},
headerTitle1: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
},
profilePicture: {
    width: wp('13%'),
    height: hp('6%'),
    borderRadius: 50,
    marginBottom: 5,
  },
  verify:{
    width: wp('5%'),
    top: 3,
  },
  headerRight:{
    // left: 135,
    // alignSelf:'flex-end',
    justifyContent:'flex-end'
  },
  end:{
    alignItems:'center',
    backgroundColor: 'grey',
    padding: 10,
    marginTop: 675,
  },
})