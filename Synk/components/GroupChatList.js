import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { Video } from 'expo-av';
import { primaryColors } from '../constants/colors';
import DateTime from './DateTime';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import FullScreenMediaModal from './FullScreenMediaModal ';
import { getUserData } from '../backend/userService';  // Adjust this import based on your actual user data fetching function

const ChatList = ({ messages, currentUserPhoneNumber }) => {
  const flatListRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMediaUri, setSelectedMediaUri] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const listRef = useRef(null);
  const scrollOffsetY = useRef(0);
  const [userProfiles, setUserProfiles] = useState({});

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // console.log("messages in chatList: ",messages)

  useEffect(() => {
    const loadUserProfiles = async () => {
      const profiles = { ...userProfiles };  // Start with existing profiles
      for (const message of messages) {
        if (!profiles[message.senderId]) {
          try {
            const userData = await getUserData(message.senderId);
            profiles[message.senderId] = { profilePicture: userData.profilePicture, userName: userData.name };
          } catch (error) {
            console.error(`Failed to fetch data for user ${message.senderId}:`, error);
            profiles[message.senderId] = { profilePicture: '', userName: message.senderId };  // Use phone number if name fetching fails
          }
        }
      }
      setUserProfiles(profiles);
    };

    loadUserProfiles();
  }, [messages]);

  const handleLongPress = (message) => {
    console.log('Long press detected on message:', message.messageText);
  };

  const handleMediaPress = (uri, type, messageText) => {
    setSelectedMediaUri(uri);
    setSelectedMediaType(type);
    setSelectedText(messageText);
    setModalVisible(true);
  };

  const handleScroll = (event) => {
    scrollOffsetY.current = event.nativeEvent.contentOffset.y;
  };

  const renderItem = ({ item }) => {
    const isCurrentUser = item.senderId === currentUserPhoneNumber;
    const senderProfile = userProfiles[item.senderId] || {};

    // console.log("messages mediaUrl: ",item.mediaUrl)

    return (
      <LongPressGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            handleLongPress(item);
          }
        }}
      >
        <TouchableWithoutFeedback>
          <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserContainer : styles.recipientContainer]}>
            {!isCurrentUser && (
              <Image
                source={senderProfile.profilePicture ? { uri: senderProfile.profilePicture } : require('../assets/Avator.jpg')}
                style={styles.senderProfilePicture}
                cachePolicy="disk"
              />
            )}
            <View style={[styles.message, isCurrentUser ? styles.currentUserMessage : styles.recipientMessage]}>
              {!isCurrentUser && (
                <Text style={styles.senderName}>{senderProfile.userName || item.senderId}</Text>
              )}
              {item.mediaUrl ? (
                <>
                  {item.type === 'image' ? (
                    <TouchableWithoutFeedback onPress={() => handleMediaPress(item.mediaUrl, 'image', item.messageText)}>
                      <Image source={{ uri: item.mediaUrl }} style={styles.media} />
                    </TouchableWithoutFeedback>
                  ) : item.type === 'video' ? (
                    <TouchableWithoutFeedback onPress={() => handleMediaPress(item.mediaUrl, 'video', item.messageText)}>
                      <View style={styles.mediaContainer}>
                        <Video source={{ uri: item.mediaUrl }} style={styles.media} resizeMode="contain" isMuted />
                        <Text style={styles.playIcon}>▶</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ) : null}
                </>
              ) : null}
              {item.messageText ? (
                <Text style={styles.messageText}>{item.messageText}</Text>
              ) : null}
              <Text style={styles.timeText}>{DateTime(item.$createdAt)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </LongPressGestureHandler>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={listRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id}
        inverted
        contentContainerStyle={styles.flatListContainer}
        onScroll={handleScroll}
        onContentSizeChange={() => listRef.current.scrollToOffset({ offset: scrollOffsetY.current, animated: false })}
      />
      <FullScreenMediaModal
        visible={modalVisible}
        mediaUri={selectedMediaUri}
        mediaType={selectedMediaType}
        onClose={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        messageText={selectedText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  currentUserContainer: {
    justifyContent: 'flex-end',
  },
  recipientContainer: {
    justifyContent: 'flex-start',
  },
  senderProfilePicture: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    marginRight: 10,
  },
  message: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: primaryColors.purple,
  },
  recipientMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#3F3F46',
  },
  senderName: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  timeText: {
    color: 'white',
    fontSize: wp('3%'),
    alignSelf: 'flex-end',
  },
  media: {
    width: wp("56%"),
    height: hp('30%'),
    borderRadius: 10,
    marginBottom: 5,
    overflow: 'hidden'
  },
  mediaContainer: {
    position: 'relative',
    width: wp('80%'),
    height: wp('80%'),
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    position: 'absolute',
    fontSize: 30,
    color: 'white',
  },
});

export default ChatList;
