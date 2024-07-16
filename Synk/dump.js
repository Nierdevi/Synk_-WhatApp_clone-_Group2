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
        'https://cloud.appwrite.io/v1/storage/buckets/669270af0034381c55c3/files',
        {
          method: 'POST',
          headers: {
            'X-Appwrite-Project': '66795f4000158aa9d802',
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

      mediaUrl = `https://cloud.appwrite.io/v1/storage/buckets/669270af0034381c55c3/files/${uploadData.$id}/view?project=66795f4000158aa9d802`;
    }
    console.log("mediaUrl uploaded: ",mediaUrl)
    const response = await databases.createDocument(
      '6685cbc40036f4c6a5ad',
      '6685e691003e5ceef040',
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
