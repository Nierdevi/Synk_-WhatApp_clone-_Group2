import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { sendMessage, fetchMessages, getExistingChat } from '../../../backend/chatService';
import InputBox from '../../../components/InputBox';
import { primaryColors } from '../../../constants/colors';

const ChatRoom = ({ route }) => {
  const { contact, currentUserPhoneNumber } = route.params;
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const recipientPhoneNumber = contact.normalizedPhoneNumbers[0]; // Use the first normalized phone number

  useEffect(() => {
    const loadMessages = async () => {
      const existingChat = await getExistingChat(currentUserPhoneNumber, recipientPhoneNumber);
      if (existingChat) {
        const chatId = existingChat.$id;
        const fetchedMessages = await fetchMessages(chatId);
        setMessages(fetchedMessages.reverse()); // Reverse to display the latest message at the bottom
      }
    };
    loadMessages();
  }, [currentUserPhoneNumber, recipientPhoneNumber]);

  const handleSendMessage = async (messageText) => {
    if (messageText.trim()) {
      const response = await sendMessage(currentUserPhoneNumber, recipientPhoneNumber, messageText);
      if (response) {
        setMessages((prevMessages) => [response, ...prevMessages]);
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
    }
  };

  const isCurrentUserMessage = (message) => {
    return message.senderId === currentUserPhoneNumber;
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        isCurrentUserMessage(item) ? styles.currentUserMessage : styles.recipientMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.messageText}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.messagesContainer}
        // inverted
      />
      <InputBox onSendMessage={handleSendMessage} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: primaryColors.purple, // Example background color for current user's message
  },
  recipientMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#3F3F46', // Example background color for recipient's message
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ChatRoom;
