import { View, Text,StyleSheet,Button } from 'react-native'
import React from 'react'

export default function GroupsScreen({navigation}) {
return (
    <View style={styles.container}>
        <Text>Groups Screen </Text>
        <Button title='tap' onPress={()=>{navigation.navigate('GroupRoom')}}/>
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