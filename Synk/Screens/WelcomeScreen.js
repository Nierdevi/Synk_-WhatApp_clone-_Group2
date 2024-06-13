import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import primaryColors from '../constants/colors'

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
    
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:primaryColors.white
  },
  text:{
        fontSize:24,
        fontWeight:"bold",
        marginBottom:16,
        textAlign:'center'
    },
    card:{
      padding:10,
      backgroundColor:'#F9FAFB',
      elevation:5,
    }
})