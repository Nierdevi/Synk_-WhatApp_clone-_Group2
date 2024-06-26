import { View, Text,StyleSheet,Button } from 'react-native'
import React from 'react'


export default function UpdatesScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Updates Screen </Text>
      <Button title='tap to watch a status' onPress={()=>{navigation.navigate('Status')}}  />
      <Button title='tap to view channels page' onPress={()=>{navigation.navigate('Channels')}}  />
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