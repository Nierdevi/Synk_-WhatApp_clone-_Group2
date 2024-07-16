// InputBox.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { primaryColors, SecondaryColors } from '../constants/colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import MediaReviewModal from './MediaReviewModal ';

const InputBox = ({ onSendMessage, contactName  }) => {
  const [messageText, setMessageText] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputHeight, setInputHeight] = useState(40); 
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSendMessage = () => {
    if (messageText.trim() || mediaUri) {
      onSendMessage({ text: messageText, mediaUri }); // Call the prop function to send message
      setMessageText(''); // Clear input after sending message
      setMediaUri(null); // Clear media URI after sending message
      setModalVisible(false);
    }
  };

  const handlePickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Accept images and videos
      allowsEditing: false, // Disable editing to avoid cropping
      aspect: [4, 3],
      quality: 1, // Use full quality
    });

    const onRequestCloseModal =()=>{
      setMessageText(''); // Clear input after sending message
      setMediaUri(null);
      setMenuVisible(false);
    }
    // if (!result.canceled) {
    //   console.log("media url being sent: ",result.url)
    //   setMediaUri(result.uri);
    // }

    if (result && !result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setMediaUri(uri)
      setModalVisible(true);
      console.log("uri: ",uri)
    }
  };

  // console.log("messageText: ",messageText)
  // console.log("mediaUri: ",mediaUri)
  // const attachmentItem = [
  //   { label: 'Pick Image', icon: 'image', onPress: handlePickImage },
  //   // Add more attachment options here
  // ];
  console.log("contact name in input box",contactName)

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { height: Math.max(40, inputHeight) }]}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="message"
          cursorColor={primaryColors.purple}
          selectionColor={SecondaryColors.secPurple}
          multiline
          onContentSizeChange={(event) => {
            setInputHeight(event.nativeEvent.contentSize.height);
          }}
        />
        <TouchableOpacity style={styles.attachment} onPress={handlePickMedia}>
          <Ionicons name="attach" size={24} color="black" />
        </TouchableOpacity>
          <TouchableOpacity style={styles.audioInput} onPress={handleSendMessage}>
            <MaterialCommunityIcons name="send-outline" size={24} color="black" />
          </TouchableOpacity>
        {/* {messageText ? (
          <TouchableOpacity style={styles.audioInput} onPress={handleSendMessage}>
            <MaterialCommunityIcons name="send-outline" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.audioInput}>
            <MaterialCommunityIcons name="microphone" size={24} color="black" />
          </TouchableOpacity>
        )} */}
      </View>
      <MediaReviewModal 
        visible={modalVisible}
        mediaUri={mediaUri}
        messageText={messageText}
        onClose={() => setModalVisible(false)}
        onSend={handleSendMessage}
        onChangeText={setMessageText}
        contactName={contactName}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    // padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CCCCCC',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'none',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: primaryColors.purple,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 50,
    marginRight: 10,
    fontSize: wp(4.3),
  },
  audioInput: {
    width: 45,
    height: 45,
    backgroundColor: primaryColors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 50,
  },
  attachment: {
    position: 'absolute',
    right: wp(20),
  },
});

export default InputBox;
