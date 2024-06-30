import { View, Text,StyleSheet,Button } from 'react-native'
import React from 'react'



export default function ChatsScreen({navigation}) {
    return (
        <View style={styles.container}>
          <Text>Chat Screen </Text>
          <Button title='tap' onPress={()=>{navigation.navigate('ChatRoom')}}/>
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