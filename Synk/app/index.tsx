import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, Stack, Tabs } from 'expo-router'

export default function index() {
  return (
    <View  style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>Home page</Text>
        <Link href='/(tabs)' asChild>
            <Text>Go to chat page</Text>
        </Link>
    </View>

  )
}
