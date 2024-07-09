import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ImageBackground, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import talkiobg from '../../../assets/images/talkioBG.png';
import AppLogo from '../../../assets/AppLogo.png';
import Message from './Message';
import messages from '../../../assets/data/messages.json';
import InputBox from './InputBox';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ChatRoom = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const { name, image } = route.params; // Extract name and image from route params

  const menuItems = [
    { label: 'View contact', onPress: () => alert('View contact') },
    { label: 'Media, links, and docs', onPress: () => alert('Media, links, and docs') },
    { label: 'Search', onPress: () => alert('Search') },
    { label: 'Mute notifications', onPress: () => alert('Mute notifications') },
    { label: 'Disappearing messages', onPress: () => alert('Disappearing messages') },
    { label: 'Wallpaper', onPress: () => alert('Wallpaper') },
    { label: 'More', onPress: () => alert('More') },
  ];

  useEffect(() => {
    navigation.setOptions({ 
      title: name,
      headerRight: () => (
        <View style={styles.headerRight}>
          <Image source={AppLogo} style={styles.headerImage} />
          <TouchableOpacity onPress={() => alert('Camera Icon Pressed')} style={styles.iconButton}>
            <Ionicons name="camera" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => setMenuVisible(!menuVisible)}>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, route.params.name, menuVisible]);

  const closeMenu = () => {
    if (menuVisible) {
      setMenuVisible(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 100}
      style={styles.bg}
    >
      <ImageBackground source={talkiobg} style={styles.bg}>
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.container}>
            <FlatList
              data={messages}
              renderItem={({ item }) => <Message message={item} />}
              style={styles.list}
              inverted
            />
            <InputBox />
          </View>
        </TouchableWithoutFeedback>
        {menuVisible && (
          <View style={styles.popupMenu}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={item.onPress}>
                <Text style={styles.menuOptionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  iconButton: {
    marginHorizontal: 5,
  },
  popupMenu: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    elevation: 2,
    top: 5,
    right: 3,
    width: 185,
  },
  menuOptionText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#333',
  },
});

export default ChatRoom;
