import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback  } from 'react-native';
import { primaryColors } from '../constants/colors';
import DateTime from './DateTime';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

const ChatList = ({ messages, currentUserPhoneNumber }) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleLongPress = (message) => {
    // Implement your logic for handling long press (e.g., show options like copy, pin, forward)
    console.log('Long press detected on message:', message.messageText);
  };

  const renderItem = ({ item }) => {
    const isCurrentUser = item.senderId === currentUserPhoneNumber;

    return (
      <LongPressGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            handleLongPress(item);
          }
        }}
      >
        <TouchableWithoutFeedback>
          <View
            style={[
              styles.message,
              isCurrentUser ? styles.currentUserMessage : styles.recipientMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.messageText}</Text>
            <Text style={styles.timeText}>{DateTime(item.$createdAt)}</Text>
          </View>
        </TouchableWithoutFeedback>
      </LongPressGestureHandler>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.$id}
      inverted
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal:10,
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
  timeText: {
    color: 'white',
    fontSize: wp('3%'),
    alignSelf: 'flex-end',
  },
});

export default ChatList;
