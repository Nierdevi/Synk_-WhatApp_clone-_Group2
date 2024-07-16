import React from 'react';
import { Modal, View, StyleSheet, Image, TouchableOpacity, Text,StatusBar } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const FullScreenMediaModal = ({ visible, mediaUri, mediaType, onClose,onRequestClose }) => {
  return (
    
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onRequestClose}>
    <StatusBar backgroundColor='black'  />
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose} >
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
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  media: {
    width: '100%',
    height: '100%',
  },
});

export default FullScreenMediaModal;
