import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, Modal, TouchableOpacity, Alert,StatusBar } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Camera, CameraView } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';
import { primaryColors } from '../constants/colors';

const CameraComponent = ({ isVisible, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [facing, setFacing] = useState('back');
  const [mode, setMode] = useState('picture');
  const [flash, setFlash] = useState('off');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const cameraRef = useRef(null);
  const timerRef = useRef(null);

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

  const saveFile = async (uri, type) => {
    const directory = type === 'picture' ? FileSystem.documentDirectory + 'photos/' : FileSystem.documentDirectory + 'videos/';
    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    const fileName = uri.split('/').pop();
    const newPath = directory + fileName;
    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });
    console.log(`File saved to: ${newPath}`);
  };

  const handlePickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Accept images and videos
      allowsEditing: false, // Disable editing to avoid cropping
      aspect: [1, 1],
      quality: 1, // Use full quality
    });

    if (result && !result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      // setMediaUri(uri)
      // setModalVisible(true);
      console.log("uri: ",uri)
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && mode === 'picture') {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri); // Use this URI to display or send the photo
      await saveFile(photo.uri, 'picture');
    }
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      timerRef.current = setInterval(() => {
        setRecordTime((prevTime) => prevTime + 1);
      }, 1000);
      let video = await cameraRef.current.recordAsync();
      clearInterval(timerRef.current);
      setRecordTime(0);
      setIsRecording(false);
      console.log(video.uri); // Use this URI to display or send the video
      await saveFile(video.uri, 'video');
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
      clearInterval(timerRef.current);
      setRecordTime(0);
    }
  };

  const handleCapture = () => {
    if (mode === 'picture') {
      takePicture();
    } else {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    }
  };
  const flipCamera=()=> {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const toggleCameraMode = () => {
    setMode(current => (current === 'picture' ? 'video' : 'picture'));
  };
  const switchMode = (selectedMode) => {
    if (selectedMode !== mode) {
      setMode(selectedMode);
    }
  };

  const toggleFlash = () => {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
    <StatusBar  backgroundColor="#27272A" barStyle="light-content" />
      <View style={styles.container}>
      <View style={styles.topComp}>
        <TouchableOpacity style={styles.button} onPress={onClose}>
            <MaterialIcons name="close" size={30} color="white" />
        </TouchableOpacity>
        {mode=='video'? (
          <View style={[styles.recordingIndicator,isRecording ? { color: 'red' } : {}]}>
            <Text style={styles.recordingText}> {recordTime}s </Text>
          </View>
        ):<View></View>}
        <TouchableOpacity style={styles.button} onPress={toggleFlash}>
            <MaterialCommunityIcons  name={flash ==='off'?'flash' :'flash-off'} size={30} color="white" />
        </TouchableOpacity>
      </View>
        <CameraView
          style={styles.camera}
          facing={facing}
          mode={mode}
          ref={cameraRef}
          flash={flash}
        />
        <View style={styles.compContainer}>
          <View style={styles.upperItmes}>
            <TouchableOpacity style={styles.button} onPress={handlePickMedia}>
              <MaterialCommunityIcons  name="image" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleBtn} onPress={handleCapture}>
              <MaterialCommunityIcons  name={mode === 'picture' ? 'camera-iris' : isRecording ? 'stop' : 'record-circle-outline'} size={65} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={flipCamera}>
              <MaterialIcons name="flip-camera-android" size={30} color="white" />
            </TouchableOpacity>
          </View>
            <View style={styles.lowerItems}>
              <View style={styles.modeContainer}>
                <TouchableOpacity onPress={() => switchMode('picture')} style={[mode === 'picture' ? styles.selectedModeBackground : null,{paddingHorizontal:2,paddingVertical:4}]}> 
                  <Text style={[styles.modeText, mode === 'picture' && styles.selectedMode]}>Photo </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchMode('video')} style={[mode === 'video' ? styles.selectedModeBackground : null,{paddingHorizontal:2,paddingVertical:4}]}>
                  <Text style={[styles.modeText, mode === 'video' && styles.selectedMode]}>Video </Text>
                </TouchableOpacity>
              </View>
            </View>
          {/* <TouchableOpacity style={styles.button} onPress={toggleCameraMode}>
            <MaterialIcons
              name={mode === 'picture' ? 'photo-camera' : 'videocam'}
              size={40}
              color="white"
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position:'relative'
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  compContainer: {
    // flexDirection: 'row',
    backgroundColor: '#27272A',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
    height:hp("20%")
  },
  topComp:{
    backgroundColor:'#27272A',
    height:hp('5%'),
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:"space-between",
  },
  upperItmes:{
    height:hp('3%'),
    // backgroundColor:'yellow',
    flex:1,
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1
  },
  lowerItems:{
    flex:1
  },
  button: {
    paddingHorizontal:10
    
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    gap:20
  },
  modeText: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 10,
  },
  selectedMode: {
    fontWeight: 'bold',
    textAlign:'center'
    // textDecorationLine: 'underline',
  },
  selectedModeBackground:{
    backgroundColor:primaryColors.purple,
    paddingHorizontal:7,
    paddingVerticalL:10,
    borderRadius:20
  },
  recordingIndicator:{
    // backgroundColor:'white',
    flex:1,
  },
  recordingText:{
    alignSelf:'center',
    fontSize:22,
    color:'white',
  }
});

export default CameraComponent;
