import { View, Text,ActivityIndicator } from 'react-native'
import React from 'react'
import { primaryColors } from '../constants/colors'



export default function LoadingScreen() {
  return (
    <View style={{flex:1,justifyContent:'center',alignContent:"center"}}>
      <ActivityIndicator size="large" color={primaryColors.purple}></ActivityIndicator>
    </View>
  )
}