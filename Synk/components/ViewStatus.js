import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const ViewStatus = ({ route }) => {
  const { status } = route.params;

  return (
    <View style={styles.container}>
      {status.type === 'image' ? (
        <Image source={{ uri: status.mediaUrl }} style={styles.media} />
      ) : (
        <Video
          source={{ uri: status.mediaUrl }}
          style={styles.media}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay
        />
      )}
      <Text style={styles.caption}>{status.currentUserPhoneNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '80%',
  },
  caption: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});

export default ViewStatus;
