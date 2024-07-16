import React from 'react';
import { Modal, View, StyleSheet, Image, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Video } from 'expo-av';
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import { primaryColors } from '../constants/colors';


const MediaReviewModal = ({ visible, mediaUri, messageText, onClose, onSend, onChangeText,contactName  }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <StatusBar backgroundColor='black' />
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        {mediaUri ? (
          mediaUri.endsWith('.mp4') || mediaUri.endsWith('.mov') || mediaUri.endsWith('.mkv') ? (
            <Video source={{ uri: mediaUri }} style={styles.media} resizeMode="contain" shouldPlay useNativeControls />
          ) : (
            <Image source={{ uri: mediaUri }} style={styles.media} resizeMode="contain" />
          )
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Add a caption..."
          value={messageText}
          onChangeText={onChangeText}
        />
        <View style={styles.bottomComp}>
            <Text style={styles.text}>Send to {contactName } </Text>
            <TouchableOpacity style={styles.sendButton} onPress={onSend}>
                <MaterialCommunityIcons name="send-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  media: {
    width: '100%',
    height: '70%',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    width: '80%',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    width: 45,
    height: 45,
    backgroundColor: primaryColors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 50,
  },
  sendButtonText: {
    color: 'white',
  },
  bottomComp:{
    flexDirection:'row',
    // backgroundColor:'pink',
    width:wp('70%'),
    justifyContent:"space-between",
    alignItems:'center'
  },
  text:{
    fontSize:wp('5%'),
    color:'white'
  }
});

export default MediaReviewModal;
