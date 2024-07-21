import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { CropView } from 'react-native-image-crop-tools';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

const ImageEditingComponent = ({ isVisible, imageUri, onClose, onSave }) => {
  const [currentMode, setCurrentMode] = useState('crop');
  const [textInput, setTextInput] = useState('');
  const [texts, setTexts] = useState([]);
  const [editedImageUri, setEditedImageUri] = useState(imageUri);
  const [cropVisible, setCropVisible] = useState(false);
  const canvasRef = useRef(null);

  const handleSave = () => {
    // Save the edited image (implementation depends on your app's requirements)
    onSave(editedImageUri);
  };

  const handleTextAdd = () => {
    if (textInput) {
      setTexts([...texts, textInput]);
      setTextInput('');
    }
  };

  const handleCrop = () => {
    setCropVisible(true);
  };

  const onCropComplete = (croppedImageUri) => {
    setEditedImageUri(croppedImageUri);
    setCropVisible(false);
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
        {currentMode === 'crop' ? (
          <>
            <View style={styles.imageContainer}>
              <Image source={{ uri: editedImageUri }} style={styles.image} />
            </View>
            <TouchableOpacity style={styles.cropButton} onPress={handleCrop}>
              <Text style={styles.cropButtonText}>Crop Image</Text>
            </TouchableOpacity>
            {cropVisible && (
              <CropView
                sourceUrl={editedImageUri}
                style={styles.cropView}
                ref={(ref) => { this.cropViewRef = ref; }}
                onImageCrop={onCropComplete}
              />
            )}
          </>
        ) : (
          <SketchCanvas
            ref={canvasRef}
            style={styles.canvas}
            strokeColor={'black'}
            strokeWidth={7}
            localSourceImage={{ filename: editedImageUri, mode: 'AspectFill' }}
          />
        )}
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={() => setCurrentMode('crop')}>
            <Text style={[styles.bottomBarText, currentMode === 'crop' && styles.selected]}>Crop</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentMode('draw')}>
            <Text style={[styles.bottomBarText, currentMode === 'draw' && styles.selected]}>Draw</Text>
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
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cropButton: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  cropButtonText: {
    color: 'black',
    fontSize: 16,
  },
  cropView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  canvas: {
    flex: 1,
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
