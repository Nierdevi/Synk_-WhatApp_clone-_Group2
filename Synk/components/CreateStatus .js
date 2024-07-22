import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addStatus } from '../backend/statusService';
// import { useAppwrite } from '../appwrite';
// import { addStatus } from '../statusUtils';


const CreateStatus = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { storage, currentUser } = useAppwrite();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const uploadStatus = async () => {
    if (!selectedImage) return;
    
    setUploading(true);
    
    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const fileExtension = selectedImage.split('.').pop().toLowerCase();
      const mimeType = blob.type;
      const formData = new FormData();
      formData.append('fileId', ID.unique());
      formData.append('file', {
        uri: selectedImage,
        name: `statusMedia_${currentUser.$id}_${new Date().getTime()}.${fileExtension}`,
        type: mimeType
      });

      const uploadResponse = await fetch(
        'https://cloud.appwrite.io/v1/storage/buckets/status_bucket/files',
        {
          method: 'POST',
          headers: {
            'X-Appwrite-Project': 'your_project_id',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || 'Failed to upload media');
      }

      const mediaUrl = `https://cloud.appwrite.io/v1/storage/buckets/status_bucket/files/${uploadData.$id}/view?project=your_project_id`;
      await addStatus(currentUser.phoneNumber, mediaUrl, mimeType.startsWith('image/') ? 'image' : 'video');

    } catch (error) {
      console.error('Error uploading status:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image" onPress={pickImage} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <Button title="Upload Status" onPress={uploadStatus} disabled={uploading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default CreateStatus;
