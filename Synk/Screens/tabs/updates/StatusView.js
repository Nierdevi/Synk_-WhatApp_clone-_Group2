import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function StatusView() {
  return (
    <View style={styles.container}>
      <Text>View Status </Text>
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