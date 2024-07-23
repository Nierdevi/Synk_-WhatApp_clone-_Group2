import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import InputBox from '../../../components/InputBox';
import ChatList from '../../../components/ChatListItem';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { PopupMenu } from '../../../components/PopupMenu';
import { fetchGroupMessages, sendGroupMessage } from '../../../backend/groupServices';
import { fetchLastMessage } from '../../../backend/chatService';
import GroupChatList from '../../../components/GroupChatList';
import { getUser } from '../../../constants/userContext';
import { useContacts } from '../../../backend/contacts ';


const ChatRoom = ({ route, navigation }) => {
  const { groupData, groupId, participants, currentUserPhoneNumber, profilePicture } = route.params;
  const [messages, setMessages] = useState([]);
  const { session } = getUser();
  const contacts = useContacts(session); // Fetch contacts
  const [lastMessage, setLastMessage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

//   console.log("group data: ", contacts);
// console.log('groupId in room: ',groupId)

  const menuItems = [
    { label: 'Report or Block', onPress: () => {} },
    { label: 'Search', onPress: () => {} },
    { label: 'Mute notifications', onPress: () => {} },
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
            source={profilePicture ? { uri: profilePicture } : require('../../../assets/Grp.jpg')}
            style={styles.profilePicture}
            cachePolicy='disk'
          />
          <TouchableOpacity style={styles.usenameContainer} onPress={() => { navigation.navigate('GroupInfo', {}) }}>
            <Text style={styles.name}>{groupData.groupName}</Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => { setMenuVisible(true) }}>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, profilePicture, groupData.groupName]);

  useEffect(() => {
    const loadMessages = async () => {
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
  }, [groupId, messages]);

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

    const response = await sendGroupMessage(groupId,currentUserPhoneNumber,participants, text, mediaUri, mediaType);
    if (response) {
        setMessages((prevMessages) => {
          const newMessages = [response, ...prevMessages];
          return newMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        });
        setLastMessage(response);
      }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 0}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <PopupMenu visible={menuVisible} onClose={() => setMenuVisible(false)} menuItems={menuItems} style={styles.popupMenu} />
      <StatusBar backgroundColor="transparent" translucent={true} />
      <GroupChatList messages={messages} currentUserPhoneNumber={currentUserPhoneNumber} contacts={contacts} />
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
    flex: 1,
    marginHorizontal: 15,
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
