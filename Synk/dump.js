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







260b731b9e807e5b42463dc1d05fee1da556ad5aeac46f559a4dbb164797a130a7d37daa43a6287a92fa3ac59068ec47
3b36072e37bb10b956a9571e2157e179
06c7648469946ea2d1c768a6f9277061



import React, { useEffect, useState } from "react";
import {
Alert,
FlatList,
Modal,
Pressable,
StyleSheet,
Text,
TextInput,
TouchableOpacity,
View,
} from "react-native";
import {
heightPercentageToDP as hp,
widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { primaryColors } from "../constants/colors";
import DateTime from "./DateTime";
import { databases } from "../backend/appwrite";
import { Query } from "appwrite";





import { CameraView } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const CameraStatusScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState('back');
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri); // Use this URI to display or send the photo
    }
  };

  useEffect(() => {
    console.log('Camera Object:', Camera);
  }, []);
  

  // const flipCamera = () => {
  //   setType(
  //     type === Camera.Constants.Type.back
  //       ? Camera.Constants.Type.front
  //       : Camera.Constants.Type.back
  //   );
  // };

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} type={type} ref={cameraRef} />
      <Button title="Flip Camera" onPress={flipCamera} />
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});

export default CameraComponent;


const viewStatus = async (statusId, viewerPhoneNumber) => {
  try {
      // Fetch the status document
      const status = await databases.getDocument('database_id', 'status', statusId);

      // Update the viewers list
      const viewers = status.viewers || [];
      if (!viewers.includes(viewerPhoneNumber)) {
          const updatedViewers = [...viewers, viewerPhoneNumber];
          await databases.updateDocument('database_id', 'status', statusId, { viewers: updatedViewers });
      }
  } catch (error) {
      console.error('Failed to update status viewers:', error);
  }
};

const getStatuses = async (phoneNumbers) => { // Modified to take an array of phone numbers
  try {
      const response = await databases.listDocuments('database_id', 'status', [
          Query.contains('phoneNumber', phoneNumbers), // Changed to Query.in for multiple phone numbers
          // Query.greaterThan('expiryAt', Date.now())
      ]);
      console.log("statuses: ",response.documents)
      return response.documents;
  } catch (error) {
      console.error("Failed to get statuses:", error);
  }
};



import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatuses } from '../backend/statusService';
import { useContacts } from '../backend/contacts ';
import { getUser } from '../constants/userContext';

const StatusList = () => {
  const [statuses, setStatuses] = useState([]);
  const { session } = getUser();
  const contacts = useContacts(session);

  useEffect(() => {
    const fetchStatuses = async () => {
        try {
          const allStatuses = await getStatuses();
          console.log("All statuses:", allStatuses);
      
          const normalizedPhoneNumbers = contacts.flatMap(contact => 
            Array.isArray(contact.normalizedPhoneNumbers) ? contact.normalizedPhoneNumbers : []
          );
          const filteredStatuses = allStatuses.filter(status =>
            status && status.phoneNumber &&
            normalizedPhoneNumbers.includes(status.phoneNumber)
          );
      
          console.log("Filtered statuses:", filteredStatuses);
          setStatuses(filteredStatuses);
        } catch (error) {
          console.error('Error fetching statuses:', error);
        }
      };

    fetchStatuses();
  }, [contacts]);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <Image source={{ uri: item.mediaUrl }} style={styles.thumbnail} />
      <Text style={styles.phoneNumber}>{item.currentUserPhoneNumber}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={statuses}
      renderItem={renderItem}
      keyExtractor={item => item.$id}
      horizontal
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
  },
  itemContainer: {
    marginHorizontal: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  phoneNumber: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default StatusList;



const fetchMessages = async (chatId) => {
  try {
    const response = await databases.listDocuments(
      'database_id',
      'chats',
      [Query.equal('chatId', chatId),
        Query.orderDesc('createdAt'),
      ]
    );

    return response.documents;
  } catch (error) {
    // handleNetworkError(error);
    return [];
  }
};

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const existingChat = await getExistingChat(currentUserPhoneNumber, recipientPhoneNumber);
  //     if (existingChat) {
  //       const chatId = existingChat.$id;
  //       const fetchedMessages = await fetchMessages(chatId);
  //       const sortedMessages = fetchedMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  //       setMessages(sortedMessages);
  //       try {
  //         const lastMessageData = await fetchLastMessage(chatId);
  //         setLastMessage(lastMessageData);
  //       } catch (error) {
  //         console.error('Failed to fetch last message:', error);
  //       }
  //     }
  //   };

  //   const intervalId = setInterval(fetchData, 1000); // Fetch messages every 3 seconds

  //   return () => clearInterval(intervalId); // Clean up the interval on component unmount
  // }, [currentUserPhoneNumber, recipientPhoneNumber]);



  import React, { useState, useEffect ,useLayoutEffect} from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text,TouchableOpacity,StatusBar,ActivityIndicator  } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { sendMessage, fetchMessages, getExistingChat,checkForNewMessages,fetchLastMessage } from '../../../backend/chatService';
import { Image } from 'expo-image';
import InputBox from '../../../components/InputBox';
import ChatList from '../../../components/ChatListItem';
import {Feather,Ionicons ,MaterialIcons } from '@expo/vector-icons'
import { PopupMenu } from '../../../components/PopupMenu';
import { getcurrentUserData,getUserData } from '../../../backend/userService';
import { useFocusEffect } from '@react-navigation/native';
import { primaryColors } from '../../../constants/colors';






const ChatRoom = ({ route,navigation }) => {
  const { contact, currentUserPhoneNumber, profilePicture } = route.params;
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const recipientPhoneNumber = contact.normalizedPhoneNumbers[0];

// console.log(contact.name)
  const menuItems = [
    { label: 'Report or Block', onPress: () => {} },
    { label: 'Search', onPress: () => {} },
    { label: 'Mute notifications', onPress: () => {} },
    { label: 'Disappering messages', onPress: () => handleNavigateToSettings() }, // Navigate to SettingsScreen
    { label: 'Media,Links and docs', onPress: () => {} },
    { label: 'Clear chat', onPress: () => {} },
  ];
// console.log("user data: ",userData)
// console.log("user data: ",profilePicture)

useFocusEffect(
  React.useCallback(() => {
    setIsFocused(true);

    return () => {
      setIsFocused(false);
    };
  }, [])
);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerStyle:{height:hp('10%'),elevation:10,},
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={()=>{navigation.goBack()}}>
          <Ionicons name="arrow-back-outline" size={24} color="black" style={{marginRight:6}}/>
          </TouchableOpacity>
            <Image
                source={profilePicture ? { uri: profilePicture } : require('../../../assets/Avator.jpg')} 
                style={styles.profilePicture}
                cachePolicy='disk'
            />
          <TouchableOpacity 
            style={styles.usenameContainer} 
            onPress={()=>{navigation.navigate(
              'ChatInfo',
              {messages,
              recipientPhoneNumber,
              profilePicture,
              contact
              })}}>
            <Text style={styles.name}>{contact.name}  </Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="call" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="video" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={()=>{setMenuVisible(true)}}>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);


  // console.log(currentUserPhoneNumber)
  // console.log(recipientPhoneNumber)
  // console.log(messages)
  useEffect(() => {
    const loadMessages = async () => {
      if (isFocused) {
        setLoadingMessages(true);
        const existingChat = await getExistingChat(currentUserPhoneNumber, recipientPhoneNumber);
  
        if (existingChat) {
          const chatId = existingChat.$id;
          const { messages: cachedMessages, lastMessageId } = await fetchMessages(chatId);
          setMessages(cachedMessages);
  
          const newMessages = await checkForNewMessages(chatId, lastMessageId);
          if (newMessages) {
            setMessages(newMessages);
          }
          
          try {
            const lastMessageData = await fetchLastMessage(chatId);
            setLastMessage(lastMessageData);
          } catch (error) {
            console.error('Failed to fetch last message:', error);
          }
        }
        setLoadingMessages(false);
      }
    };
  
    loadMessages();
  }, [currentUserPhoneNumber, recipientPhoneNumber, isFocused]);
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const existingChat = await getExistingChat(currentUserPhoneNumber, recipientPhoneNumber);
  //     if (existingChat) {
  //       const chatId = existingChat.$id;
  //       const fetchedMessages = await fetchMessages(chatId);
  //       const sortedMessages = fetchedMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  //       setMessages(sortedMessages);
  //       try {
  //         const lastMessageData = await fetchLastMessage(chatId);
  //         setLastMessage(lastMessageData);
  //       } catch (error) {
  //         console.error('Failed to fetch last message:', error);
  //       }
  //     }
  //   };

  //   const intervalId = setInterval(fetchData, 1000); // Fetch messages every 3 seconds

  //   return () => clearInterval(intervalId); // Clean up the interval on component unmount
  // }, [currentUserPhoneNumber, recipientPhoneNumber]);

  // const handleSendMessage = async (messageText) => {
  //   if (messageText.trim()) {
  //     const response = await sendMessage(currentUserPhoneNumber, recipientPhoneNumber, messageText);
  //     if (response) {
  //       setMessages((prevMessages) => [response, ...prevMessages]);
  //       setLastMessage(response); // Update last message after sending new message
  //     }
  //   }
  // };

// console.log(messages)

  const handleSendMessage = async ({ text, mediaUri }) => {
    console.log(mediaUri)
    let mediaType = 'text';
  
    if (mediaUri) {
      const fileExtension = mediaUri.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        mediaType = 'image';
      } else if (['mp4', 'mov', 'mkv'].includes(fileExtension)) {
        mediaType = 'video';
      }
    }
    console.log("media type: ",mediaType)
    const response = await sendMessage(currentUserPhoneNumber, recipientPhoneNumber, text, mediaUri, mediaType);
    
    if (response) {
      setMessages((prevMessages) => [response, ...prevMessages]);
      setLastMessage(response);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 0}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <PopupMenu visible={menuVisible} onClose={() => setMenuVisible(false)} menuItems={menuItems} style={styles.popupMenu} />
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
          />
          <ChatList messages={messages} currentUserPhoneNumber={currentUserPhoneNumber} contactName={contact} />
          <InputBox onSendMessage={handleSendMessage} />
          {/* {loadingMessages ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={primaryColors.purple} />
        </View>
      ) : (
        <>
        </>
      )} */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'pink',
    position:'relative',
    width:wp('100%')
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow:1,
    width:wp('75%')
    // padding: wp('4%'), 
  },
  profilePicture: {
    width: wp('10.5%'),
    height: hp('5%'),
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    fontSize: wp('5%'),
    fontWeight: '500',
    textAlign:'left',
    alignSelf:'flex-start',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    flex:1,
    marginHorizontal: 15,
    width:wp('25%')
  },
  usenameContainer:{
    flex:1,
    height:'100%',
    justifyContent:'center',
  },
  popupMenu: {
    position: 'absolute',
    marginTop: 20,
    backgroundColor: 'white',
    width: wp("47%"),
    borderRadius: 10,
    elevation: 2,
    justifyContent:'flex-end'
  },
});

export default ChatRoom;
