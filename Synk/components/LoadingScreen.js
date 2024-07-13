import { View, Text,ActivityIndicator } from 'react-native'
import React from 'react'
import { primaryColors } from '../constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


export default function LoadingScreen() {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size='large' color={primaryColors.purple} style={{width:wp('10%')}}></ActivityIndicator>
    </View>
  )
}