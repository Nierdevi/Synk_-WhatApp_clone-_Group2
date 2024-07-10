import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { primaryColors } from '../constants/colors';
import DateTime from './DateTime';

const ChatList = ({ messages, currentUserPhoneNumber }) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderItem = ({ item }) => {
    const isCurrentUser = item.senderId === currentUserPhoneNumber;
    return (
      <View
        style={[
          styles.message,
          isCurrentUser ? styles.currentUserMessage : styles.recipientMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.messageText} </Text>
        <Text style={styles.messageText}>{DateTime(item.$createdAt)} </Text>
      </View>
    );
  };

  return (
    <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id}
    //   contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        inverted
        contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    flexGrow: 1, // Ensure the FlatList takes up all available space
    paddingTop: 10, // Adjust as needed
    paddingBottom: 10, // Adjust as needed
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    // flex:1,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: primaryColors.purple || '#6A1B9A',
  },
  recipientMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#3F3F46',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ChatList;
