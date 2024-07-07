import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChatListItem = ({ chat, navigation }) => {
  const handlePress = () => {
    navigation.navigate('ChatRoom', {
      chatId: chat.$id,
      contact: chat.receiverId === chat.senderId ? chat.receiverId : chat.senderId,
      currentUserPhoneNumber: chat.senderId,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.chatName}>{chat.receiverId === chat.senderId ? chat.receiverId : chat.senderId}</Text>
      <Text style={styles.chatMessage}>{chat.messageText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatMessage: {
    fontSize: 16,
    color: '#666',
  },
});

export default ChatListItem;
