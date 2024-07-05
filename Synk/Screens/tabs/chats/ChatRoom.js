import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ImageBackground,TouchableOpacity,Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import talkiobg from '../../../assets/images/talkioBG.png'
import Message from '../../../src/components/Message';
import messages from '../../../assets/data/messages.json';
import InputBox from '../../../src/components/InputBox';
import {Ionicons,MaterialIcons} from '@expo/vector-icons'; 

const ChatRoom = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { name, image } = route.params; // Extract name and image from route params

  useEffect(() => {
    navigation.setOptions({ 
      title: route.params.name,
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => alert('Camera Icon Pressed')} style={{ marginRight: 15 }}>
            <Ionicons name="camera" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('More Options Pressed')} style={{ marginRight: 15 }}>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
     })

  }, [navigation, route.params.name]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 100}
    style={styles.bg}>
        <ImageBackground source={talkiobg} style={styles.bg}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Message message={item} />}
                style={styles.list}
                inverted
            />
            <InputBox />
        </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default ChatRoom;
