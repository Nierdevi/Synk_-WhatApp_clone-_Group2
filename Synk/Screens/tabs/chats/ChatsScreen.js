import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Modal, Alert, Linking, TouchableOpacity, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getUser } from '../../../constants/userContext';
import Fab from '../../../components/fab';
import { createChat,fetchChats } from '../../../backend/chatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { primaryColors } from '../../../constants/colors';
import { databases } from '../../../backend/appwrite';
import { Query } from 'appwrite';

import ChatListItem from './components/ChatListItem';

const chatsData = require('../../../assets/data/chats.json');

import { fetchAndNormalizeContacts, loadCachedContacts, startContactRefresh,subscribeToDatabaseChanges } from '../../../backend/contacts ';

const ChatsScreen = ({ navigation }) => {
  const { session, setSession } = getUser();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState({ inApp: [], notInApp: [] });
  const [modalVisible, setModalVisible] = useState(false);
  const [messagedContacts,setMessagedContacts]=useState([])


  useEffect(() => {
    const loadContacts = async () => {
      const cachedContacts = await loadCachedContacts();
      if (cachedContacts) {
        // console.log(cachedContacts)
        setContacts(cachedContacts);
        filterContacts(cachedContacts);
      }
    };


    loadContacts();
    startContactRefresh();
    const unsubscribe = subscribeToDatabaseChanges(setContacts);
    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [session]);


  const filterContacts = async (contacts) => {
    const inAppContacts = [];
    const notInAppContacts = [];

    for (const contact of contacts) {
      if (contact.normalizedPhoneNumbers && contact.normalizedPhoneNumbers.length > 0) {
        const isInApp = await isUserInApp(contact.normalizedPhoneNumbers[0]);
        // console.log(`Contact: ${contact.name}, isInApp: ${isInApp}`); // Log each contact's in-app status
        if (isInApp) {
          inAppContacts.push(contact);
        } else {
          notInAppContacts.push(contact);
        }
      }
    }
    // console.log('Filtered in-app contacts:', inAppContacts); // Log in-app contacts
    // console.log('Filtered not-in-app contacts:', notInAppContacts); // Log not-in-app contacts
    setFilteredContacts({ inApp: inAppContacts, notInApp: notInAppContacts });
  };

  const isUserInApp = async (phoneNumber) => {
    try {
      const response = await databases.listDocuments(
        '6685cbc40036f4c6a5ad',
        '6685cc6600212adefdbf',
        [Query.equal('phoneNumber', phoneNumber)]
      );
      // console.log('Database response:', response); // Log the full response
      if (response.documents.length > 0) {
        // console.log(`User found in database with ID: ${response.documents[0].$id}`);
        return response.documents[0].$id; // Return the user ID
      } else {
        return null;
      }
    } catch (error) {
      console.error('Failed to check user in the database:', error);
      return false;
    }
  };

  const fetchContactsIfNeeded = async () => {
    const cachedContacts = await loadCachedContacts();
    if (cachedContacts) {
      setContacts(cachedContacts);
      filterContacts(cachedContacts);
    }

      const fetchedContacts = await fetchAndNormalizeContacts();
      if (fetchedContacts) {
        setContacts(fetchedContacts);
        filterContacts(fetchedContacts);
      }
  };

  const handleFetchContacts = async () => {
    setModalVisible(true);
    await fetchContactsIfNeeded();
    // await AsyncStorage.removeItem(STORAGE_KEY);

  };


  useEffect(() => {
    fetchContactsIfNeeded();
    startContactRefresh();
    // const unsubscribe = subscribeToDatabaseChanges(setContacts);
    // return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);
  

  const renderContactItem = ({ item }) => {
      const handleContactPress = async (contact) => {
        try {
          // const recipientPhoneNumber = contact.normalizedPhoneNumbers[0];
          const currentPhoneNumber = session.phoneNumber; // Assuming session contains the current user's phone number

          navigation.navigate('ChatRoom', { contact, currentUserPhoneNumber: currentPhoneNumber });
          setModalVisible(false);
        } catch (error) {
          console.error('Failed to handle contact press:', error);
          Alert.alert('Error', 'An error occurred while trying to navigate to the chat room');
        }
      };


    return (
      <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress(item)}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.name} </Text>
          {item.note && <Text style={styles.contactStatus}>{item.note} </Text>}
          {!filteredContacts.inApp.includes(item) && (
            <Text style={styles.inviteText}>Invite </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Render component based on user session
  if (session) {
    console.log(session)
    return (
      <View style={styles.container}>
        <FlatList
          data={chatsData}
          renderItem={({ item }) => <ChatListItem chat={item} />}
          keyExtractor={(item) => item.id}
        />
        <Fab type="chats" handlePress={handleFetchContacts} />

        <Modal visible={modalVisible} animationType="slide" onRequestClose={()=>{setModalVisible(false)}}>
          <View style={styles.modalHeader}>
            <Ionicons name="arrow-back-outline" size={24} color="black" onPress={() => setModalVisible(false)} />
            <Text style={styles.modalTitle}>Select contact</Text>
            <View style={styles.modalActions}>
              <Ionicons name="search" size={24} color="black" />
              <Pressable style={styles.dots} onPress={() => setMenuVisible(true)}>
                <Entypo name="dots-three-vertical" size={20} />
              </Pressable>
            </View>
          </View>
          <TouchableOpacity style={styles.newContact}>
            <View style={[styles.avatarContainer, { backgroundColor: primaryColors.purple }]}>
              <Ionicons name="person-add" size={20} color="white" />
            </View>
            <Text style={styles.contactName}>New contact</Text>
          </TouchableOpacity>
          <View style={styles.modalContainer}>
            <Text style={styles.sectionTitle}>Contacts on Synk</Text>
            <FlatList
              data={filteredContacts.inApp}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderContactItem}
              ListEmptyComponent={() => <Text>No contact on your phone currently uses Synk</Text>}
            />

            <Text style={styles.sectionTitle}>Invite to Synk</Text>
            <FlatList
              data={filteredContacts.notInApp}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderContactItem}
              initialNumToRender={50}
            />
          </View>
        </Modal>
      </View>
    );
  } else {
    navigation.replace("welcome");
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalHeader: {
    width: wp('100%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: hp('7%'),
    elevation: 1,
  },
  modalTitle: {
    fontSize: 20,
    flexGrow: 1,
  },
  modalActions: {
    width: wp('13%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newContact: {
    width: wp('100%'),
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: hp('7%'),
    elevation: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    width: wp('100%'),
  },
  contactItem: {
    padding: 10,
    width: wp('100%'),
    flexDirection: 'row',
  },
  contactName: {
    fontSize: 18,
  },
  avatarContainer: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  inviteText: {
    fontSize: 17,
    marginLeft: 250,
    marginTop: -10,
  },
  sectionTitle: {
    textAlign: 'left',
    width: wp('95%'),
    fontSize: 16,
    // marginTop: 50,
  },
});

export default ChatsScreen;
