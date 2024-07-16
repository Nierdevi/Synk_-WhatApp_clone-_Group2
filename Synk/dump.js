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

const sendMessage = async (senderId, receiverId, messageText = '', mediaUrl = '', type = 'text') => {
    try {
      let chatRoom = await getExistingChat(senderId, receiverId);
      if (!chatRoom) {
        chatRoom = await createChat(senderId, receiverId);
      }
      const chatId = chatRoom.$id;
  
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
      handleNetworkError(error);
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
