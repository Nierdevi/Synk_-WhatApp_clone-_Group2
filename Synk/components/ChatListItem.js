import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { Video } from 'expo-av';
import { primaryColors } from '../constants/colors';
import DateTime from './DateTime';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import FullScreenMediaModal from './FullScreenMediaModal ';
import { PopupMenu } from './PopupMenu';


const ChatList = ({ messages, currentUserPhoneNumber}) => {
  const flatListRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMediaUri, setSelectedMediaUri] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const listRef = useRef(null);
  const scrollOffsetY = useRef(0);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleLongPress = (message) => {
    console.log('Long press detected on message:', message.messageText);
  };

  const handleMediaPress = (uri, type,messageText) => {
    setSelectedMediaUri(uri);
    setSelectedMediaType(type);
    setSelectedText(messageText)
    setModalVisible(true);
  };

  const handleScroll = (event) => {
    scrollOffsetY.current = event.nativeEvent.contentOffset.y;
  };

  // console.log("selectedText: ",selectedText)
  const renderItem = ({ item }) => {
    const isCurrentUser = item.senderId === currentUserPhoneNumber;

    // console.log('Rendering item:', item.mediaUrl);


    return (
      <LongPressGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            handleLongPress(item);
          }
        }}
      >
        
        {/* <PopupMenu visible={menuVisible} onClose={close} menuItems={menuItems} style={styles.popupMenu} /> */}
        <TouchableWithoutFeedback>
          <View
            style={[
              styles.message,
              isCurrentUser ? styles.currentUserMessage : styles.recipientMessage,
            ]}
          >
            {item.mediaUrl ? (
              <>
                {item.type === 'image' ? (
                  <TouchableWithoutFeedback onPress={() => handleMediaPress(item.mediaUrl, 'image',item.messageText)}>
                    <Image source={{ uri: item.mediaUrl }} style={styles.media} />
                  </TouchableWithoutFeedback>
                ) : item.type === 'video' ? (
                  <TouchableWithoutFeedback onPress={() => handleMediaPress(item.mediaUrl, 'video',item.messageText)}>
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
  message: {
    maxWidth: '80%',
    padding: 7,
    marginBottom: 10,
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
  messageText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    marginRight:40
  },
  timeText: {
    color: 'white',
    fontSize: wp('3%'),
    alignSelf: 'flex-end',
  },
  media: {
    width: wp("56%"),
    height:hp('30%'), 
    borderRadius: 10,
    marginBottom: 5,
    overflow:'hidden'
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
