import { Ionicons,Feather, FontAwesome5   } from '@expo/vector-icons';


//document
<Ionicons name="document-text-outline" size={24} color="black" />

//gallery
<Ionicons name="images-outline" size={24} color="black" />

//audio
<Feather name="headphones" size={24} color="black" />

//location
<Ionicons name="location-outline" size={24} color="black" />

//contact
<FontAwesome5 name="user" size={24} color="black" />

//poll
<Ionicons name="bar-chart-outline" size={24} color="black" />
const sendMessage = async (senderId, receiverId, messageText = '', mediaUri = '', type = 'text') => {
  try {
    let chatRoom = await getExistingChat(senderId, receiverId);
    if (!chatRoom) {
      chatRoom = await createChat(senderId, receiverId);
    }
    const chatId = chatRoom.$id;

    let mediaUrl = '';

    // If there's a mediaUri, upload the media and get the URL
    if (mediaUri) {
      console.log("media uri: ",mediaUri)
      const formData = new FormData();
      formData.append('fileId', ID.unique());
      formData.append('file', {
        uri: mediaUri,
        name: `chatMedia_${senderId}_${new Date().getTime()}.jpg`,
        type: 'image/jpeg', // Adjust MIME type according to your media type
      });
      // console.log("formData: ",formData)

      const uploadResponse = await fetch(
        'https://cloud.appwrite.io/v1/storage/buckets/synk_bucket/files',
        {
          method: 'POST',
          headers: {
            'X-Appwrite-Project': '66992806000309150f65',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );
      console.log("uploaded response: ",uploadResponse)
      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || 'Failed to upload media');
      }

      mediaUrl = `https://cloud.appwrite.io/v1/storage/buckets/synk_bucket/files/${uploadData.$id}/view?project=66992806000309150f65`;
    }
    console.log("mediaUrl uploaded: ",mediaUrl)
    const response = await databases.createDocument(
      'database_id',
      'chats',
      ID.unique(),
      {
        chatId,
        senderId,
        receiverId,
        messageText,
        mediaUrl,
        type,
        createdAt: new Date().toISOString(),
      }
    );

    await addMessagedContact(senderId, receiverId);

    return response;
  } catch (error) {
    console.log(error)
    // handleNetworkError(error);
    return null;
  }
};



  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage({ text: messageText, mediaUri: '' }); // Call the prop function to send message
      setMessageText(''); // Clear input after sending message
    }
  };


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



messageText: {
    fontSize: 16,
    color: 'white',
    marginRight:25
  },
  timeText: {
    color: 'white',
    fontSize: wp('3%'),
    alignSelf: 'flex-end',
  },
  mediaImage: {
    width: wp("56%"),
    height:hp('30%'), // Set your desired height
    borderRadius: 10,
    marginBottom: 5,
  },
});



{item.messageText ? (
    <Text style={styles.messageText}>{item.messageText}</Text>
  ) : null}
  {item.mediaUrl && item.type === 'image' ? (
    <TouchableWithoutFeedback onPress={() => handleMediaPress(item.mediaUrl, 'image')}>
      <Image source={{ uri: item.mediaUrl }} style={styles.media} />
    </TouchableWithoutFeedback>
  ) : item.mediaUrl && item.type === 'video' ? (
    <TouchableWithoutFeedback onPress={() => handleMediaPress(item.mediaUrl, 'video')}>
      <View style={styles.mediaContainer}>
        <Video
          source={{ uri: item.mediaUrl }}
          style={styles.media}
          resizeMode="contain"
          isMuted
        />
        <Text style={styles.playIcon}>▶</Text>
      </View>
    </TouchableWithoutFeedback>
  ) : null}




  import React, { useRef, useEffect ,useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback,Image  } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { primaryColors } from '../constants/colors';
import DateTime from './DateTime';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

const ChatList = ({ messages, currentUserPhoneNumber }) => {
  const flatListRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

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
          <View
            style={[
              styles.message,
              isCurrentUser ? styles.currentUserMessage : styles.recipientMessage,
            ]}
          >{item.type === 'text' ? (
              <Text style={styles.messageText}>{item.messageText}</Text>
            ) : item.type === '{image' || 'text' ? (
              <Image source={{ uri: item.mediaUrl }} style={styles.mediaImage}  />
            ) : null}
            {/* <Text style={styles.messageText}>{item.messageText}</Text> */}
            {/* {item.type === 'text'} */}
            <Text style={styles.timeText}>{DateTime(item.$createdAt)}</Text>
          </View>
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
      onContentSizeChange={() => {
        if (isAutoScrolling && flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }}
      onScrollBeginDrag={() => setIsAutoScrolling(false)}
      onMomentumScrollEnd={() => setIsAutoScrolling(true)}
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
    padding: 5,
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
    marginRight:25
  },
  timeText: {
    color: 'white',
    fontSize: wp('3%'),
    alignSelf: 'flex-end',
  },
  mediaImage: {
    width: wp("56%"),
    height:hp('30%'), // Set your desired height
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default ChatList;



import { ID } from 'appwrite';

// Helper function to determine media type and extension
const getMediaTypeAndExtension = (mediaUri) => {
  const extension = mediaUri.split('.').pop().toLowerCase();
  let mediaType = '';
  let mimeType = '';

  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      mediaType = 'image';
      mimeType = `image/${extension === 'jpg' ? 'jpeg' : extension}`;
      break;
    case 'mp4':
    case 'mov':
    case 'mkv':
      mediaType = 'video';
      mimeType = `video/${extension}`;
      break;
    default:
      throw new Error('Unsupported media type');
  }

  return { mediaType, mimeType, extension };
};

// Updated sendMessage function
const sendMessage = async (senderId, recipientId, messageText, mediaUri, mediaType) => {
  const payload = {
    senderId,
    recipientId,
    messageText,
    timestamp: new Date().toISOString(),
  };

  if (mediaUri) {
    console.log("media uri: ", mediaUri);
    const { mimeType, extension } = getMediaTypeAndExtension(mediaUri);
    const formData = new FormData();
    formData.append('fileId', ID.unique());
    formData.append('file', {
      uri: mediaUri,
      name: `chatMedia_${senderId}_${new Date().getTime()}.${extension}`,
      type: mimeType,
    });

    try {
      const response = await fetch('YOUR_MEDIA_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload media');
      }

      const responseData = await response.json();
      payload.mediaUri = responseData.fileUrl; // Adjust this based on your API response
      payload.mediaType = mediaType;
    } catch (error) {
      console.error('Media upload error:', error);
      return null;
    }
  }

  // Send the message payload to your backend
  try {
    const response = await fetch('YOUR_MESSAGE_SEND_ENDPOINT', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Message send error:', error);
    return null;
  }
};
import { databases } from '../backend/appwrite';
import { useContacts } from '../backend/contacts ';


useEffect(() => {
  const checkSession = async () => {
    const storedSession = await AsyncStorage.getItem('session');
    if (storedSession || session) {
      const session = JSON.parse(storedSession);
      setSession(session);
      setIsLoading(false);
      console.log(session)
      navigationRef.current?.navigate('Tabs');
    } else {
      navigationRef.current?.navigate('welcome');
    }
  };

  checkSession();
}, [setSession]);





import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { Video } from 'expo-av';
import { primaryColors } from '../constants/colors';
import DateTime from './DateTime';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import FullScreenMediaModal from './FullScreenMediaModal ';
import { fetchUserName } from '../backend/userService';

const GroupChatList = ({ messages, currentUserPhoneNumber, contacts }) => {
    // cconsloe
  const flatListRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMediaUri, setSelectedMediaUri] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const listRef = useRef(null);
  const scrollOffsetY = useRef(0);

  console.log("group data: ", messages);
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
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

  const getContactName = (phoneNumber) => {
    const contact = contacts.find(c => c.normalizedPhoneNumbers && c.normalizedPhoneNumbers.includes(phoneNumber));
    return contact ? contact.name : null;
  };

  const renderItem = ({ item }) => {
    const isCurrentUser = item.senderId === currentUserPhoneNumber;
    const contactName = getContactName(item.senderId);
    const displayName = contactName || (item.username || item.senderId);
    const profilePicture = item.profilePicture && typeof item.profilePicture === 'string' ? item.profilePicture : require('../assets/Avator.jpg');
        console.log("profile url: ",profilePicture)
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
              styles.messageContainer,
              isCurrentUser ? styles.currentUserContainer : styles.recipientContainer,
            ]}
          >
            {!isCurrentUser && (
              <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
            )}
            <View
              style={[
                styles.message,
                isCurrentUser ? styles.currentUserMessage : styles.recipientMessage,
              ]}
            >
              {!isCurrentUser && <Text style={styles.senderName}>{displayName}</Text>}
              {item.mediaUrl ? (
                <>
                  {item.type === 'image' ? (
                    <TouchableWithoutFeedback onPress={() => handleMediaPress(item.mediaUrl, 'image', item.messageText)}>
                      <Image source={{ uri: item.mediaUrl }} style={styles.media} />
                    </TouchableWithoutFeedback>
                  ) : item.type === 'video' ? (
                    <TouchableWithoutFeedback onPress={() => handleMediaPress(item.mediaUrl, 'video', item.messageText)}>
                      <View style={styles.mediaContainer}>
                        <Video
                          source={{ uri: item.mediaUrl }}
                          style={styles.media}
                          resizeMode="contain"
                          isMuted
                        />
                        <Text style={styles.playIcon}>▶</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ) : null}
                </>
              ) : null}
              {item.messageText ? (
                <Text style={styles.messageText}>{item.messageText} </Text>
              ) : null}
              <Text style={styles.timeText}>{DateTime(item.$createdAt)} </Text>
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
    alignItems: 'center',
    marginBottom: 10,
  },
  currentUserContainer: {
    alignSelf: 'flex-end',
  },
  recipientContainer: {
    alignSelf: 'flex-start',
  },
  profilePicture: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: 25,
    marginRight: 10,
  },
  message: {
    maxWidth: '80%',
    padding: 7,
    borderRadius: 10,
  },
  currentUserMessage: {
    backgroundColor: primaryColors.purple,
  },
  recipientMessage: {
    backgroundColor: '#3F3F46',
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    marginRight: 40,
  },
  timeText: {
    color: 'white',
    fontSize: wp('3%'),
    alignSelf: 'flex-end',
  },
  media: {
    width: wp('56%'),
    height: hp('30%'),
    borderRadius: 10,
    marginBottom: 5,
    overflow: 'hidden',
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

export default GroupChatList;
