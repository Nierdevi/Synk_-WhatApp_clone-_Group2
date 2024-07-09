import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { sendMessage, fetchMessages, getExistingChat } from '../../../backend/chatService';
import InputBox from '../../../components/InputBox';
import ChatList from '../../../components/ChatListItem';
import { fetchLastMessage } from '../../../backend/chatService'; // Import fetchLastMessage function

const ChatRoom = ({ route }) => {
  const { contact, currentUserPhoneNumber } = route.params;
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null); // State to hold last message

  const recipientPhoneNumber = contact.normalizedPhoneNumbers[0]; // Use the first normalized phone number

  useEffect(() => {
    const loadMessages = async () => {
      const existingChat = await getExistingChat(currentUserPhoneNumber, recipientPhoneNumber);
      if (existingChat) {
        const chatId = existingChat.$id;
        const fetchedMessages = await fetchMessages(chatId);
        setMessages(fetchedMessages.reverse()); // Reverse to display the latest message at the bottom

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
      <View style={styles.lastMessageContainer}>
        {lastMessage && (
          <Text style={styles.lastMessageText}>{lastMessage.messageText}</Text>
        )}
      </View>
      <ChatList messages={messages} currentUserPhoneNumber={currentUserPhoneNumber} />
      <InputBox onSendMessage={handleSendMessage} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lastMessageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  lastMessageText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ChatRoom;
