import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import ImageDraw from 'react-native-image-draw';
import ImageCropPicker from 'react-native-image-crop-picker';

const ImageEditingComponent = ({ isVisible, imageUri, onClose, onSave }) => {
  const [currentMode, setCurrentMode] = useState('draw');
  const [textInput, setTextInput] = useState('');
  const [texts, setTexts] = useState([]);
  const [editedImageUri, setEditedImageUri] = useState(imageUri);
  const imageDrawRef = useRef(null);

  const handleSave = async () => {
    const savedImage = await imageDrawRef.current.save();
    onSave(savedImage);
  };

  const handleTextAdd = () => {
    if (textInput) {
      setTexts([...texts, textInput]);
      setTextInput('');
    }
  };

  const handleCrop = () => {
    ImageCropPicker.openCropper({
      path: editedImageUri,
      cropping: true,
    }).then((image) => {
      setEditedImageUri(image.path);
    }).catch((error) => {
      console.error(error);
      Alert.alert('Error', 'Failed to crop the image.');
    });
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.topBarText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.topBarText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          {currentMode === 'draw' ? (
            <ImageDraw
              ref={imageDrawRef}
              image={editedImageUri}
              style={styles.imageDraw}
              strokeColor={'black'}
              strokeWidth={7}
            />
          ) : (
            <Image source={{ uri: editedImageUri }} style={styles.image} />
          )}
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={() => setCurrentMode('draw')}>
            <Text style={[styles.bottomBarText, currentMode === 'draw' && styles.selected]}>Draw</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCrop}>
            <Text style={styles.bottomBarText}>Crop</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTextAdd}>
            <Text style={styles.bottomBarText}>Add Text</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            value={textInput}
            onChangeText={setTextInput}
            placeholder="Enter text"
          />
        </View>
        {texts.map((text, index) => (
          <Text key={index} style={styles.text}>{text}</Text>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27272A',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  topBarText: {
    color: 'white',
    fontSize: 18,
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
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  bottomBarText: {
    color: 'white',
    fontSize: 18,
  },
  selected: {
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
    position: 'absolute',
  },
});

export default ImageEditingComponent;
