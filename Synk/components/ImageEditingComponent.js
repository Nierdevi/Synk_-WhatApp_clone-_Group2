import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { CropView } from 'react-native-image-crop-tools';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

const ImageEditingComponent = ({ isVisible, imageUri, onClose, onSave }) => {
  const [currentMode, setCurrentMode] = useState('crop');
  const [textInput, setTextInput] = useState('');
  const [texts, setTexts] = useState([]);
  const cropViewRef = useRef(null);

  const handleSave = () => {
    // Save the edited image (implementation depends on your app's requirements)
    onSave(imageUri);
  };

  const handleTextAdd = () => {
    if (textInput) {
      setTexts([...texts, textInput]);
      setTextInput('');
    }
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
          <CropView
            sourceUrl={imageUri}
            style={styles.image}
            ref={cropViewRef}
            onImageCrop={(res) => console.log(res)}
          />
        ) : (
          <SketchCanvas
            style={styles.canvas}
            strokeColor={'black'}
            strokeWidth={7}
            localSourceImage={{ filename: imageUri, mode: 'AspectFill' }}
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
  image: {
    flex: 1,
    backgroundColor: 'black',
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
