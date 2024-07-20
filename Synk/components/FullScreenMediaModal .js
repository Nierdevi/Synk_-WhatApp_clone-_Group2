import React from 'react';
import { Modal, View, StyleSheet, Image, TouchableOpacity, Text, StatusBar } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


const FullScreenMediaModal = ({ visible, mediaUri, mediaType, messageText, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose} >
    {/* {    console.log("selected Text:, ",messageText) } */}
      <StatusBar backgroundColor='black' />
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        {mediaType === 'image' ? (
          <Image source={{ uri: mediaUri }} style={styles.media} resizeMode="contain" />
        ) : mediaType === 'video' ? (
          <Video
            source={{ uri: mediaUri }}
            style={styles.media}
            resizeMode="contain"
            shouldPlay
            useNativeControls
          />
        ) : null}
        {messageText ? (
          <Text style={styles.messageText}>{messageText} </Text>
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  media: {
    width: '100%',
    height: '70%',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    // backgroundColor:'red',
    fontSize:wp("6%")
  },
});

export default FullScreenMediaModal;
