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



  import React, { useEffect, useState, useRef } from 'react';
  import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Animated, LogBox, Dimensions } from 'react-native';
  import { Video } from 'expo-av';
  import { getStatusesByPhoneNumber } from '../backend/statusService';
  import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
  
  
  // Ignore warnings related to Animated API
  LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
  
  const ViewStatus = ({ route,navigation }) => {
    const { userData } = route.params;
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const progressAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      const fetchStatuses = async () => {
        try {
          const fetchedStatuses = await getStatusesByPhoneNumber(userData.phoneNumber);
          console.log("formatted stat: ", fetchedStatuses);
          setStatuses(fetchedStatuses);
        } catch (error) {
          console.error('Error fetching statuses:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchStatuses();
    }, [userData.phoneNumber]);
  
    // useEffect(() => {
    //   if (statuses.length > 0) {
    //     const currentStatus = statuses[currentIndex];
    //     let duration = 10000; // Default 10 seconds for images
    //     if (currentStatus.media[0].mediaType === 'video') {
    //       duration = 30000; // Maximum 30 seconds for videos
    //     }
  
    //     Animated.timing(progressAnim, {
    //       toValue: 1,
    //       duration: duration,
    //       useNativeDriver: false,
    //     }).start(({ finished }) => {
    //       if (finished) {
    //         handleNext();
    //       }
    //     });
    //   }
    // }, [currentIndex, statuses]);
  
    useEffect(() => {
      getStatusesByPhoneNumber(userData.phoneNumber).then((res)=>{
        const intervalId = setInterval(() => {
          setCurrentIndex((prevIndex) => {
            console.log("stat: ",statuses)
            const nextIndex =prevIndex + 1 ;
            if(nextIndex!==res.length)
              flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
            else
            {
              clearInterval(intervalId)
              navigation.goBack()
            }
            console.log("next index: ",nextIndex)
            return nextIndex;
          });
        }, 10000); // 10 seconds
    
        // Clear interval on component unmount
        return () => clearInterval(intervalId);
      })
      
    }, []);
  
    const handleNext = () => {
      if (currentIndex < statuses.length - 1) {
        progressAnim.setValue(0);
        setCurrentIndex(currentIndex + 1);
        flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      }
    };
  
    const handlePrevious = () => {
      if (currentIndex > 0) {
        progressAnim.setValue(0);
        setCurrentIndex(currentIndex - 1);
        flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
      }
    };
  
    const renderItem = ({ item }) => {
      console.log("Current item:", item);
      const mediaItem = item.media[0]; // Assumes only one media item per status
      // const dimensions = mediaDimensions[index] || { width: Dimensions.get('window').width, height: 300 };
      return (
        <View style={styles.mediaContainer}>
               {mediaItem.mediaType === 'image' ? (
             <Image
               source={{ uri: mediaItem.mediaUrl }}
               style={styles.media}
               onError={() => console.log('Failed to load image:', mediaItem.mediaUrl)}
               resizeMode='contain'
             />
           ) : (
             <Video
               source={{ uri: mediaItem.mediaUrl }}
               style={styles.media}
               // useNativeContr/ols
              //  resizeMode="contain"
               isLooping={false}
               onPlaybackStatusUpdate={(status) => {
                 if (status.didJustFinish) {
                   handleNext();
                 }
               }}
               onError={(error) => console.log('Failed to load video:', error)}
             />
           )}
           {mediaItem.text && <Text style={styles.caption}>{mediaItem.text}</Text>}
        </View>
        // <>
        //   {mediaItem.mediaType === 'image' ? (
        //     <Image
        //       source={{ uri: mediaItem.mediaUrl }}
        //       style={styles.media}
        //       onError={() => console.log('Failed to load image:', mediaItem.mediaUrl)}
        //     />
        //   ) : (
        //     <Video
        //       source={{ uri: mediaItem.mediaUrl }}
        //       style={styles.media}
        //       // useNativeContr/ols
        //       resizeMode="contain"
        //       isLooping={false}
        //       onPlaybackStatusUpdate={(status) => {
        //         if (status.didJustFinish) {
        //           handleNext();
        //         }
        //       }}
        //       onError={(error) => console.log('Failed to load video:', error)}
        //     />
        //   )}
        //   {mediaItem.text && <Text style={styles.caption}>{mediaItem.text}</Text>}
        //   </>
      );
    };
  
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.timestamp}>
            {statuses.length > 0 && new Date(statuses[currentIndex]?.createdAt).toLocaleString()}
          </Text>
        </View>
        <View style={styles.progressContainer}>
          {statuses.map((_, index) => (
            <View key={index} style={styles.progressBarBackground}>
              {index === currentIndex ? (
                <Animated.View
                  style={[
                    styles.progressBarForeground,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              ) : (
                <View style={styles.progressBarForeground} />
              )}
            </View>
          ))}
        </View>
        <FlatList
          ref={flatListRef}
          data={statuses}
          renderItem={renderItem}
          // renderItem={()=>{
          //   return <Text style={{fontSize:70, margin:200}}>Nmsr </Text>
          // }}
          keyExtractor={(item) => item.$id}
          horizontal
          pagingEnabled
          // scrollEnabled={false} // Disable manual scrolling
          onScrollToIndexFailed={(info) => {
            console.error('Failed to scroll to index:', info);
          }}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      justifyContent: 'center',
      alignItems: 'center',
      width:"100%"
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    profilePicture: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    userName: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    timestamp: {
      color: 'gray',
      fontSize: 12,
      marginLeft: 'auto',
    },
    progressContainer: {
      flexDirection: 'row',
      width: '100%',
      height: 2,
      marginBottom: 10,
    },
    progressBarBackground: {
      flex: 1,
      height: 2,
      backgroundColor: 'gray',
      marginHorizontal: 1,
    },
    progressBarForeground: {
      height: 2,
      backgroundColor: 'white',
    },
    statusContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '80%',
    },
    mediaContainer: {
      width: wp('100%'),
      height: '90%',
      backgroundColor:'red',
      justifyContent:'center'
    },
    media: {
      alignSelf:'flex-start',
      width: wp('100%'),
      height: '100%',
    },
    caption: {
      color: 'white',
      textAlign: 'center',
      marginTop: 10,
      fontSize: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default ViewStatus;
  

  import React, { useState } from 'react';
import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo, Feather, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import AppLogo from '../../assets/AppLogo.png';
import { primaryColors } from '../../constants/colors';
import { useTheme } from '../../constants/themeContext';
import CameraComponent from '../CameraComponent';
import { PopupMenu } from '../PopupMenu';

const isIOS = Platform.OS === 'ios';

export default function ChatsHeader() {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [isEventsListModalVisible, setIsEventsListModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [events, setEvents] = useState([]);
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const openCamera = () => setIsCameraVisible(true);
  const closeCamera = () => setIsCameraVisible(false);

  const openEventModal = () => setIsEventModalVisible(true);
  const closeEventModal = () => setIsEventModalVisible(false);

  const openEventsListModal = () => setIsEventsListModalVisible(true);
  const closeEventsListModal = () => setIsEventsListModalVisible(false);

  const handleSelectDate = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleSubmitEvent = () => {
    const newEvent = { date: selectedDate, title: eventTitle, description: eventDescription };
    setEvents([...events, newEvent]);
    setSelectedDate('');
    setEventTitle('');
    setEventDescription('');
    closeEventModal();
  };

  const menuItems = [
    { label: 'New broadcast', onPress: () => {} },
    { label: 'Linked Devices', onPress: () => handleNavigateToLinked() },
    { label: 'Settings', onPress: () => handleNavigateToSettings() },
    { label: 'Switch accounts', onPress: () => toggleDrawer() },
  ];

  const handleNavigateToSettings = () => {
    setMenuVisible(false);
  };

  const handleNavigateToLinked = () => {
    // Handle navigation to Linked Devices
  };

  const toggleDrawer = () => setIsDrawerVisible(!isDrawerVisible);

  const closeModal = () => setIsDrawerVisible(false);

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  // Define icon colors
  const calendarIconColor = theme === 'dark' ? primaryColors.blue : primaryColors.green;
  const cameraIconColor = theme === 'dark' ? primaryColors.red : primaryColors.orange;
  const dotsIconColor = theme === 'dark' ? primaryColors.purple : primaryColors.gray;

  return (
    <View style={[{ paddingTop: isIOS ? insets.top : insets.top + 10 }, styles.container, { backgroundColor: theme === 'dark' ? primaryColors.black : primaryColors.white }]}>
      <Text style={[styles.text, { color: theme === 'dark' ? primaryColors.white : primaryColors.black }]}>Chats</Text>
      <View style={styles.option}>
        <TouchableOpacity onPress={openEventModal} style={styles.calendarIcon}>
          <FontAwesome name="calendar-plus-o" size={22} color={calendarIconColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera} style={styles.cameraIcon}>
          <Feather name="camera" size={22} color={cameraIconColor} />
        </TouchableOpacity>
        <Pressable style={[styles.dots, { color: dotsIconColor }]} onPress={() => setMenuVisible(true)}>
          <PopupMenu visible={menuVisible} onClose={() => setMenuVisible(false)} menuItems={menuItems} style={styles.popupMenu} />
          <Entypo name="dots-three-vertical" size={20} color={dotsIconColor} />
        </Pressable>
        <CameraComponent isVisible={isCameraVisible} onClose={closeCamera} />
      </View>

      {/* Event Scheduling Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEventModalVisible}
        onRequestClose={closeEventModal}
      >
        <Pressable style={styles.modalContainer} onPress={closeEventModal}>
          <Pressable style={styles.eventModalContent} onPress={stopPropagation}>
            <View style={styles.eventHeader}>
              <Text style={styles.eventTitle}>Event Scheduling</Text>
              <TouchableOpacity onPress={openEventsListModal} style={styles.viewEventsIcon}>
                <FontAwesome name="eye" size={24} color={calendarIconColor} />
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={handleSelectDate}
              markedDates={{ [selectedDate]: { selected: true, marked: true, dotColor: primaryColors.primary } }}
              style={styles.calendar}
            />
            <View style={styles.eventDetails}>
              <Text style={styles.eventText}>Event Title:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event title"
                value={eventTitle}
                onChangeText={setEventTitle}
              />
              <Text style={styles.eventText}>Event Description:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event description"
                value={eventDescription}
                onChangeText={setEventDescription}
                multiline
              />
            </View>
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: primaryColors.purple }]} onPress={handleSubmitEvent}>
              <Text style={styles.saveButtonText}>Save Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.closeButton, { backgroundColor: primaryColors.purple }]} onPress={closeEventModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Events List Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEventsListModalVisible}
        onRequestClose={closeEventsListModal}
      >
        <Pressable style={styles.modalContainer} onPress={closeEventsListModal}>
          <Pressable style={styles.eventsListContent} onPress={stopPropagation}>
            <Text style={styles.eventTitle}>Events List</Text>
            <ScrollView>
              {events.map((event, index) => (
                <View key={index} style={styles.eventItem}>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  <Text style={styles.eventItemTitle}>{event.title}</Text>
                  <Text style={styles.eventDescription}>{event.description}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={[styles.closeButton, { backgroundColor: primaryColors.purple }]} onPress={closeEventsListModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Drawer Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDrawerVisible}
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalContainer} onPress={closeModal}>
          <Pressable style={styles.drawerContent} onPress={stopPropagation}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={AppLogo} style={styles.headerImage1} />
              <View style={styles.me}>
                <Text style={styles.drawerText}>Synk_User</Text>
                <Text style={styles.drawerText1}>+233 50 343 4750</Text>
              </View>
              <FontAwesome6 name="circle-check" size={24} style={styles.check} />
            </View>
            <TouchableOpacity style={styles.plus}>
              <Feather name="plus-circle" size={34} color="black" />
              <Text style={styles.drawerText}>Add account</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  text: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraIcon: {
    paddingHorizontal: 20,
  },
  calendarIcon: {
    paddingHorizontal: 20,
  },
  dots: {
    paddingHorizontal: 20,
  },
  headerImage1: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  me: {
    paddingLeft: 15,
  },
  drawerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    paddingLeft: 15,
  },
  drawerText1: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'gray',
    paddingLeft: 15,
  },
  check: {
    color: '#4169E1',
    marginLeft: 'auto',
  },
  plus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  eventModalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  eventsListContent: {
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewEventsIcon: {
    padding: 5,
  },
  calendar: {
    marginBottom: 10,
  },
  eventDetails: {
    marginBottom: 20,
  },
  eventText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  drawerContent: {
    width: '90%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  eventItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  popupMenu: {
    position: 'absolute',
    top: 25,
    right: 10,
    zIndex: 1,
  },
});
