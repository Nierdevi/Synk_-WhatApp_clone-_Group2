import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, Modal, TouchableOpacity, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

const CameraComponent = ({ isVisible, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [facing, setFacing] = useState('back');
  const [mode, setMode] = useState('picture');
  const cameraRef = useRef(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
      if (status !== 'granted' || audioStatus !== 'granted') {
        Alert.alert('Permission required', 'We need camera and microphone permissions to use this feature.');
      }
      setHasPermission(status === 'granted' && audioStatus === 'granted');
    };

    getCameraPermission();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && mode === 'picture') {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri); // Use this URI to display or send the photo
    }
  };

  const recordVideo = async () => {
    try {
      if (cameraRef.current && mode === 'video') {
        if (cameraRef.current.isRecording) {
          cameraRef.current.stopRecording();
        } else {
          let video = await cameraRef.current.recordAsync();
          console.log(video.uri); // Use this URI to display or send the video
        }
      }
    } catch (error) {
      console.log('Could not record video:', error);
    }
  };

  const flipCamera=()=> {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const toggleCameraMode = () => {
    setMode(current => (current === 'picture' ? 'video' : 'picture'));
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={facing}
          mode={mode}
          ref={cameraRef}
        />
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={flipCamera}>
              <MaterialIcons name="flip-camera-android" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraMode}>
              <MaterialIcons name={mode === 'picture' ? 'photo-camera' : 'videocam'} size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={mode === 'picture' ? takePicture : recordVideo}
            >
              <MaterialIcons name={mode === 'picture' ? 'camera' : 'videocam'} size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <MaterialIcons name="close" size={40} color="white" />
            </TouchableOpacity>
          </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CameraComponent;
