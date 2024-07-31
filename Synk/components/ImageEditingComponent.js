import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Alert, Button, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageDraw from 'react-native-image-draw';

const ImageEditingComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [isEditingVisible, setIsEditingVisible] = useState(false);
  const [currentMode, setCurrentMode] = useState('draw');
  const [textInput, setTextInput] = useState('');
  const [texts, setTexts] = useState([]);
  const imageDrawRef = useRef(null);

  const handleCapture = () => {
    ImagePicker.openCamera({
      cropping: true,
    })
      .then(image => {
        console.log('Captured image URI:', image.path); // Log the image URI
        setImageUri(image.path);
        setIsEditingVisible(true); // Show the editing component
      })
      .catch(error => {
        console.error('Capture error:', error);
        Alert.alert('Error', 'Could not capture the image.');
      });
  };

  const handleSave = async () => {
    try {
      if (imageDrawRef.current) {
        const savedImage = await imageDrawRef.current.save();
        console.log('Saved image:', savedImage); // Log the saved image
        setImageUri(savedImage);
        setIsEditingVisible(false); // Close the editing component
      } else {
        console.error('ImageDraw ref is null');
        Alert.alert('Error', 'ImageDraw ref is not set.');
      }
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Could not save the image.');
    }
  };

  const handleTextAdd = () => {
    if (textInput) {
      setTexts([...texts, textInput]);
      setTextInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Picture" onPress={handleCapture} />
      {imageUri && (
        <Modal visible={isEditingVisible} animationType="slide" onRequestClose={() => setIsEditingVisible(false)}>
          <View style={styles.container}>
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => setIsEditingVisible(false)}>
                <MaterialIcons name="close" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <MaterialIcons name="check" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              {currentMode === 'draw' ? (
                <ImageDraw
                  ref={imageDrawRef}
                  image={imageUri}
                  style={styles.imageDraw}
                  strokeColor={'black'}
                  strokeWidth={7}
                />
              ) : (
                <Image source={{ uri: imageUri }} style={styles.image} />
              )}
            </View>
            <View style={styles.bottomBar}>
              <TouchableOpacity onPress={() => setCurrentMode('draw')}>
                <MaterialCommunityIcons name="pencil" size={30} color={currentMode === 'draw' ? 'yellow' : 'white'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentMode('view')}>
                <MaterialCommunityIcons name="image" size={30} color={currentMode === 'view' ? 'yellow' : 'white'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleTextAdd}>
                <MaterialCommunityIcons name="text" size={30} color="white" />
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                value={textInput}
                onChangeText={setTextInput}
                placeholder="Enter text"
                placeholderTextColor="gray"
              />
            </View>
            {texts.map((text, index) => (
              <Text key={index} style={styles.text}>{text}</Text>
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27272A',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#000',
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDraw: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
    width: '100%',
  },
  textInput: {
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    position: 'absolute',
  },
});

export default ImageEditingComponent;
