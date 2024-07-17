import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { sendMessage, fetchGroupMessages } from '../../../backend/chatService';
import { Image } from 'expo-image';
import InputBox from '../../../components/InputBox';
import ChatList from '../../../components/ChatListItem';
import { fetchLastMessage } from '../../../backend/chatService';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { PopupMenu } from '../../../components/PopupMenu';
import { getcurrentUserData, getUserData } from '../../../backend/userService';
import { useFocusEffect } from '@react-navigation/native';
import { sendGroupMessage } from '../../../backend/groupServices';



const ChatRoom = ({ route, navigation }) => {
  const { contact, currentUserPhoneNumber, profilePicture } = route.params;
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

//   const recipientPhoneNumber = contact.normalizedPhoneNumbers[0];

  const menuItems = [
    { label: 'Report or Block', onPress: () => {} },
    { label: 'Search', onPress: () => {} },
    { label: 'Mute notifications', onPress: () => {} },
    // { label: 'Disappearing messages', onPress: () => handleNavigateToSettings() },
    { label: 'Media, Links and docs', onPress: () => {} },
    { label: 'Clear chat', onPress: () => {} },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerStyle: { height: hp('10%'), elevation: 10 },
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={() => { navigation.goBack() }}>
            <Ionicons name="arrow-back-outline" size={24} color="black" style={{ marginRight: 6 }} />
          </TouchableOpacity>
          <Image
            source={profilePicture ? { uri: profilePicture } : require('../../../assets/Avator.jpg')}
            style={styles.profilePicture}
            cachePolicy='disk'
          />
          <TouchableOpacity style={styles.usenameContainer} onPress={() => { navigation.navigate('ChatInfo', {}) }}>
            <Text style={styles.name}>{}  </Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="call" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="video" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => { setMenuVisible(true) }}>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const loadMessages = async () => {
      const groupId = route.params.groupId;
      if (groupId) {
        const fetchedMessages = await fetchGroupMessages(groupId);
        const sortedMessages = fetchedMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMessages(sortedMessages);

        if (JSON.stringify(sortedMessages) !== JSON.stringify(messages)) {
          setMessages(sortedMessages);
        }

        try {
          const lastMessageData = await fetchLastMessage(groupId);
          setLastMessage(lastMessageData);
        } catch (error) {
          console.error('Failed to fetch last message:', error);
        }
      }
    };

    loadMessages();
    const intervalId = setInterval(loadMessages, 1000);

    return () => clearInterval(intervalId);
  }, [currentUserPhoneNumber]);

  const handleSendMessage = async ({ text, mediaUri }) => {
    let mediaType = 'text';

    if (mediaUri) {
      const fileExtension = mediaUri.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        mediaType = 'image';
      } else if (['mp4', 'mov', 'mkv'].includes(fileExtension)) {
        mediaType = 'video';
      }
    }

    const response = await sendMessage(currentUserPhoneNumber, groupId, participants, text, mediaUri, mediaType);
    if (response) {
      setMessages((prevMessages) => [response, ...prevMessages]);
      setLastMessage(response);
    }
  };


  const handleSend = async (messageText, mediaUri = '', type = 'text') => {
    await sendMessage(currentUserPhoneNumber, groupId, participants, messageText, mediaUri, type);
    // Reload messages after sending a new one
    const fetchedMessages = await fetchGroupMessages(groupId);
    const sortedMessages = fetchedMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setMessages(sortedMessages);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 0}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <PopupMenu visible={menuVisible} onClose={() => setMenuVisible(false)} menuItems={menuItems} style={styles.popupMenu} />
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ChatList messages={messages} currentUserPhoneNumber={currentUserPhoneNumber} contactName={contact} />
      <InputBox onSendMessage={handleSendMessage} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: wp('100%')
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    width: wp('75%')
  },
  profilePicture: {
    width: wp('10.5%'),
    height: hp('5%'),
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    fontSize: wp('5%'),
    fontWeight: '500',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 15,
    width: wp('25%')
  },
  usenameContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  popupMenu: {
    position: 'absolute',
    marginTop: 20,
    backgroundColor: 'white',
    width: wp("47%"),
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'flex-end'
  },
});

export default ChatRoom;
