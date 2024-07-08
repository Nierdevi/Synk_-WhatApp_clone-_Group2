import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ChannelsScreen() {
  return (
    <View style={styles.container}>
      <Text>Channels </Text>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})