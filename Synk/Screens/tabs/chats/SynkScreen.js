import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, Modal, Pressable, SafeAreaView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { primaryColors } from '../../../constants/colors';

const Applogo = require('../../../assets/AppLogo.png');
const Verified = require('../../../assets/verified.png');
const WhatsAppBackground = require('../../../assets/synk-background.png');

const messages = [
  { id: '1', text: 'Understanding end-to-end encryption on Synk Your privacy is our priority. That’s why your personal messages are automatically end-to-end encrypted. This means only you and the person you’re talking to can read your conversations. No one else can see your messages — not even Synk.', date: '2024-07-01' },
  // Add more messages as needed
];

const options = [
  { id: '1', text: 'Media, links, docs' },
  { id: '2', text: 'Clear Chat' },
  { id: '3', text: 'Export Chat' },
  { id: '4', text: 'Add Shortcut' },
];

const SynkScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleShare = async (messageText) => {
    try {
      await Share.share({
        message: messageText,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <View style={{ flexDirection: "row", paddingLeft: 5 }}>
          <Image
            source={Applogo}
            style={styles.profilePicture}
            cachePolicy="disk"
          />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.headerTitle}>Synk</Text>
              <Image source={Verified} cachePolicy='memory-disk' style={styles.verify} tintColor="#7410d7" />
            </View>
            <Text style={styles.headerTitle1}>Official Synk Account</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => { setMenuVisible(true) }}
          >
            <Entypo name="dots-three-vertical" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ImageBackground source={WhatsAppBackground} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.messageContainer}>
          {/* Information Banner */}
          <TouchableOpacity style={styles.infoBanner} onPress={() => alert('Learn more about Synk')}>
            <Text style={styles.infoText}>This is an official account of Synk</Text>
            <Text style={styles.infoSubText}>Tap to learn more.</Text>
          </TouchableOpacity>

          {/* Messages */}
          {messages.map((message) => (
            <View key={message.id} style={styles.messageWrapper}>
              {/* Date Container */}
              <Text style={styles.dateText}>{formatDate(message.date)}</Text>

              {/* Message Content */}
              <View style={styles.messageContent}>
                {/* Synk name and verification badge */}
                <View style={styles.postHeader}>
                  <Text style={styles.synkName}>Synk</Text>
                  <Image source={Verified} style={styles.verify} tintColor="#7410d7" />
                </View>
                <Text style={styles.messageText}>{message.text}</Text>
                <TouchableOpacity style={styles.forwardButton} onPress={() => handleShare(message.text)}>
                  <MaterialCommunityIcons name="share-all" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.end}>
          <Text>Only Synk can send messages</Text>
        </View>
      </ImageBackground>

      {/* Options Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.optionButton}>
                  <Text style={styles.optionText}>{item.text}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderBottomColor: 'Lightgray',
    backgroundColor: 'white',
    paddingTop: 40,
    paddingLeft: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 5,
  },
  headerTitle1: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
  },
  profilePicture: {
    width: wp('13%'),
    height: hp('6%'),
    borderRadius: 50,
    marginBottom: 5,
  },
  verify: {
    width: wp('5%'),
    top: 3,
  },
  headerRight: {
    marginLeft: 'auto',
  },
  iconButton: {
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  messageContainer: {
    padding: 15,
  },
  infoBanner: {
    backgroundColor: primaryColors.purple,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  infoSubText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 2,
  },
  messageWrapper: {
    marginBottom: 10,
    padding: 15,
    marginRight: 55,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  synkName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  messageText: {
    fontSize: 16,
    flex: 1,
  },
  forwardButton: {
    padding: 5,
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    left: 260,
    top: 100,
  },
  end: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 'auto',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: wp('50%'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginTop: 60,
    marginRight: 10,
  },
  optionButton: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SynkScreen;
