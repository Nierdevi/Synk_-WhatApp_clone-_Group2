import { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';
// const bg = require( '../../assets/images/Bg.png')
import InputBox from '../components/InputBox';

import Message from '../components/Message'; 
import messages from '../../assets/data/messages.json' ;

const ChatScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({title: route.params.name});
  },[route.params.name]);
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.bg}>
      {/* <ImageBackground source={bg} style={styles.bg}>
      </ImageBackground> */}
      <FlatList 
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        style={styles.list}
        inverted
        />
        <InputBox/>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    bg:{
        flex:1,
    },
    list:{
        padding: 10,
      },
});

export default ChatScreen