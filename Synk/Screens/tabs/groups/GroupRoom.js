import { View, Text,StyleSheet,Button } from 'react-native'
import React from 'react'

export default function GroupRoom({navigation}) {
return (
    <View style={styles.container}>
        <Text>Group room </Text>
        <Button title='tap' onPress={()=>{navigation.navigate('GroupInfo')}}/>
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