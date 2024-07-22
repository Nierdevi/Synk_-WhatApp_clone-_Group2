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
