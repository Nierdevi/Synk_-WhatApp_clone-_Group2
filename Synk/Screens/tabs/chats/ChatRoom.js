import { View, Text,StyleSheet,Button } from 'react-native'
import React from 'react'

export default function ChatRoom({navigation}) {
return (
    <View style={styles.container}>
        <Text>Chat room </Text>
        <Button title='tap' onPress={()=>{navigation.navigate('ChatInfo')}}/>
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