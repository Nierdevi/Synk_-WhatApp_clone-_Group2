import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import ImageDraw from 'react-native-image-draw';
import ImageCropPicker from 'react-native-image-crop-picker';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const ImageEditingComponent = ({ isVisible, imageUri, onClose, onSave }) => {
  const [currentMode, setCurrentMode] = useState('draw');
  const [textInput, setTextInput] = useState('');
  const [texts, setTexts] = useState([]);
  const [editedImageUri, setEditedImageUri] = useState(imageUri);
  const imageDrawRef = useRef(null);

  const handleSave = async () => {
    try {
      const savedImage = await imageDrawRef.current.save();
      onSave(savedImage);
    } catch (error) {
      Alert.alert('Error', 'Could not save the image.');
    }
  };

  const handleTextAdd = () => {
    if (textInput) {
      setTexts([...texts, textInput]);
      setTextInput('');
    }
  };

  const handleCrop = () => {
    if(editedImageUri){
    ImagePicker.openCropper({
      path: editedImageUri,
      cropping: true,
    })
      .then((image) => {
        setEditedImageUri(image.path);
      })
      .catch((error) => {
        console.error(error);
      });
    }else return
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose}>
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
            <MaterialCommunityIcons name="pencil" size={30} color={currentMode === 'draw' ? 'yellow' : 'white'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCrop}>
            <MaterialCommunityIcons name="crop" size={30} color="white" />
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
    backgroundColor: '#000',
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
