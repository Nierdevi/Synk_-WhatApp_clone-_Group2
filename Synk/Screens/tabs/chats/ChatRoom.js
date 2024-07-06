import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { sendMessage, fetchMessages, getExistingChat } from '../../../backend/chatService';

const ChatRoom = ({ route }) => {
  const { contact, currentUserPhoneNumber } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const recipientPhoneNumber = contact.normalizedPhoneNumbers[0]; // Use the first normalized phone number

  useEffect(() => {
    const loadMessages = async () => {
      console.log(currentUserPhoneNumber)
      console.log(contact.id)
      const existingChat = await getExistingChat(currentUserPhoneNumber, recipientPhoneNumber);
      if (existingChat) {
        const chatId = existingChat.$id;
        console.log("existing chatId"+ existingChat.$id)
        const messages = await fetchMessages(chatId);
        setMessages(messages);
      }
    };
    loadMessages();
  }, [currentUserPhoneNumber, recipientPhoneNumber]);

  const handleSendMessage = async () => {
    if (messageText.trim()) {
      const response = await sendMessage(currentUserPhoneNumber, recipientPhoneNumber, messageText);
      if (response) {
        setMessages([...messages, response]);
        setMessageText('');
      }
    }
  };
// console.log(messages)
  return (
    <View>
      {messages.map((msg) => (
        <Text key={msg.$id}>{msg.messageText}</Text>
      ))}
      <TextInput
        value={messageText}
        onChangeText={setMessageText}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

export default ChatRoom;
