import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Video } from 'expo-av';
import { SecondaryColors } from '../constants/colors';

const MediaGrid = ({ media, visible, onClose }) => {
  const renderMediaItem = ({ item }) => {
    const isVideo = item.type === 'video'; // Determine if the media item is a video

    return (
      <View style={styles.mediaItem}>
        {isVideo ? (
          <Video
            source={{ uri: item.mediaUrl }}
            style={styles.media}
            resizeMode="cover" // Ensure the video covers the fixed size area
            shouldPlay={false} // Disable autoplay to avoid playback controls
            isMuted={true} // Mute the video to avoid sound if autoplay is enabled
          />
        ) : (
          <Image
            source={{ uri: item.mediaUrl }}
            style={styles.media}
          />
        )}
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <FlatList
          data={media}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMediaItem}
          contentContainerStyle={styles.mediaGrid}
          numColumns={3} // Remove this line for flex-wrap effect
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  mediaGrid: {
    // flexGrow: 1,
    justifyContent: 'space-between',// Distribute space evenly between items
  },
  mediaItem: {
    width: '30%', // Adjust to control the size of each item
    marginBottom: 10, // Space between rows
    marginHorizontal: '1%', // Space between columns
    marginTop:20
  },
  media: {
    width: 100, // Fill the width of the container
    height: 100, // Fixed height
  },
});

export default MediaGrid;
