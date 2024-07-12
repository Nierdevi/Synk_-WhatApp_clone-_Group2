// InputBox.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';
import { primaryColors } from '../constants/colors';
import { widthPercentageToDP  as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { PopupMenu } from './PopupMenu';

const InputBox = ({ onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const attachmentItem=[
    { label: 'New broadcast', onPress: () => {} },
    { label: 'New broadcast', onPress: () => {} },
    { label: 'New broadcast', icon:'',  onPress: () => {} },
  ]

  const renderAttachments = () => {
    return attachmentItem.map((item, index) => (
      <TouchableOpacity key={index} style={styles.attachmentItem} onPress={item.onPress}>
        <Ionicons name={item.icon} size={24} color="black" style={styles.attachmentIcon} />
      </TouchableOpacity>
    ));
  };
  

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText); // Call the prop function to send message
      setMessageText(''); // Clear input after sending message
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={messageText}
        onChangeText={setMessageText}
        placeholder="message"
        cursorColor={primaryColors.purple}
      />
      <TouchableOpacity style={styles.attachement} onPress={() => setMenuVisible(true)}>
        <PopupMenu visible={menuVisible} onClose={() => setMenuVisible(false)} menuItems={attachmentItem} style={styles.popupMenu} />
        <Ionicons name="attach" size={24} color="black" />
      </TouchableOpacity>
      {messageText &&
        <TouchableOpacity style={styles.audioInput} onPress={handleSendMessage}>
          <MaterialCommunityIcons name="send-outline" size={24} color="black" />
        </TouchableOpacity>
      }
      {!messageText &&
        <TouchableOpacity style={styles.audioInput}>
          <MaterialCommunityIcons name="microphone" size={24} color="black" />
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopWidth: 1,
    borderColor: '#CCCCCC',
    paddingVertical: 10,
    paddingHorizontal:12,
    // height:hp('5%')
    // height:50
    backgroundColor:'none'
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: primaryColors.purple,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight:50,
    marginRight: 10,
    borderRadius:20,
    fontSize:wp(4.3)
  },
  audioInput:{
    width:45,
    height:45,
    backgroundColor:primaryColors.purple,
    justifyContent:'center',
    alignItems:'center',
    padding:6,
    borderRadius:50
  },
  attachement:{
    position:'absolute',
    right:wp(20)
  }
});

export default InputBox;
