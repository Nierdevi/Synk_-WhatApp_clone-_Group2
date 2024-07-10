import { useNavigation, useRoute, } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
//import talkiobg from '../../../assets/images/talkioBG.png'
import messages from '../../../assets/data/messages.json';
import InputBox from '../../../src/components/InputBox';
import Message from '../../../src/components/Message';
import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { sendMessage, fetchMessages, getExistingChat } from '../../../backend/chatService';
import InputBox from '../../../components/InputBox';
import ChatList from '../../../components/ChatListItem';
import { fetchLastMessage } from '../../../backend/chatService'; // Import fetchLastMessage function
import DateTime from '../../../components/DateTime';

const ChatRoom = () => {

    const route = useRoute();
    const navigation = useNavigation();
const ChatRoom = ({ route }) => {
  const { contact, currentUserPhoneNumber } = route.params;
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);

  const recipientPhoneNumber = contact.normalizedPhoneNumbers[0]; // Use the first normalized phone number

    useEffect(() => {
        navigation.setOptions({title: route.params.name})
    },[route.params.name])
  // console.log(messages)
  useEffect(() => {
    const loadMessages = async () => {
      const existingChat = await getExistingChat(currentUserPhoneNumber, recipientPhoneNumber);
      if (existingChat) {
        const chatId = existingChat.$id;
        const fetchedMessages = await fetchMessages(chatId);
        const sortedMessages = fetchedMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMessages(sortedMessages);

        // Fetch the last message
        try {
          const lastMessageData = await fetchLastMessage(chatId);
          setLastMessage(lastMessageData);
        } catch (error) {
          console.error('Failed to fetch last message:', error);
        }
      }
    };
    loadMessages();
  }, [currentUserPhoneNumber, recipientPhoneNumber]);

  const handleSendMessage = async (messageText) => {
    if (messageText.trim()) {
      const response = await sendMessage(currentUserPhoneNumber, recipientPhoneNumber, messageText);
      if (response) {
        setMessages((prevMessages) => [response, ...prevMessages]);
        setLastMessage(response); // Update last message after sending new message
      }
    }
  };

    return (
        <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.talkiobg } >
            <Flatlist
                    data = {messages}
                    renderItem={({item}) => <Message message={item} />}
                    style={styles.list}
                    inverted
                />
                <InputBox/>
        </KeyboardAvoidingView>
    )
}
const styles=StyleSheet.create({
     talkiobg:{
            flex:1,
        },
        list: {
            padding: 10,
        },
    });

    export default ChatRoom;
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 0}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ChatList messages={messages} currentUserPhoneNumber={currentUserPhoneNumber} />
      <InputBox onSendMessage={handleSendMessage} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatRoom;
