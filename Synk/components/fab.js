import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons, MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';
import { primaryColors } from '../constants/colors';


export default function Fab({type,color,handlePress}) {
  return (
    <TouchableOpacity style={styles.fab} onPress={handlePress}>
     { type==="chats"&&<Ionicons name="person-add" size={24} color="white" />}
      { type==="groups"&&<MaterialIcons name="group-add" size={24} color="white" />} 
      { type==="updates"&&<Ionicons name="camera" size={24} color="white" />} 
      { type==="calls"&&<MaterialIcons name="add-ic-call" size={24} color="white" />}
      { type==="send"&&<MaterialCommunityIcons name="send-outline" size={24} color="white" />}
    </TouchableOpacity>
  )
}

const styles =StyleSheet.create({
    fab:{
        position:'absolute',
        bottom:15,
        width:45,heightL:45,
        backgroundColor:primaryColors.purple,
        right:10,
        width:60,
        height:60,
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        zIndex:222,
        // height:200
    }
})

