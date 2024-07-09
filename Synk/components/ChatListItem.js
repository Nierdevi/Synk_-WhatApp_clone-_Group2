import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { primaryColors } from '../constants/colors';

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
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.$id.toString()}
      contentContainerStyle={styles.messagesContainer}
      onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
    />
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    padding: 10,
    flexGrow: 1,
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
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
