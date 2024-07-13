import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { sendMessage, fetchMessages, getExistingChat } from '../../../backend/chatService';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import InputBox from '../../../components/InputBox';
import ChatList from '../../../components/ChatListItem';
import { fetchLastMessage } from '../../../backend/chatService'; // Import fetchLastMessage function
import DateTime from '../../../components/DateTime';
import { getUserData } from '../../../backend/userService';

const ChatRoom = ({ route,navigation }) => {
  const { contact, currentUserPhoneNumber } = route.params;
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);


  const recipientPhoneNumber = contact.normalizedPhoneNumbers[0]; // Use the first normalized phone number
  const userdata=getUserData(recipientPhoneNumber)
  console.log(currentUserPhoneNumber)
  console.log(recipientPhoneNumber)
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
