import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CameraStatusScreen = () => {
  const [facing, setFacing] = useState('back');
  const [mode, setMode] = useState('picture');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const cameraMode = () => {
    setMode(current => (current === 'picture' ? 'video' : 'picture'));
  };

  const takePicture = async () => {
    if (cameraRef.current && mode === 'picture') {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri); // Use this URI to display or send the photo
    }
  };

  const recordVideo = async () => {
    try{
    if (cameraRef.current && mode === 'video') {
      if (cameraRef.current.isRecording) {
        cameraRef.current.stopRecording();
      } else {
        let video = await cameraRef.current.recordAsync();
        console.log(video.uri); // Use this URI to display or send the video
      }
    }
  }catch(error){
    console.log("couldnt record video: ",error)
  }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        mode={mode}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <MaterialIcons name="flip-camera-android" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={cameraMode}>
            <MaterialIcons
              name={mode === 'picture' ? 'photo-camera' : 'videocam'}
              size={40}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={mode === 'picture' ? takePicture : recordVideo}
          >
            <MaterialIcons
              name={mode === 'picture' ? 'camera' : 'videocam'}
              size={40}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    justifyContent: 'space-around',
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CameraStatusScreen;
