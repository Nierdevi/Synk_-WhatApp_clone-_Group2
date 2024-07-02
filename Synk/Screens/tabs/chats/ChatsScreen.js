import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Modal, Alert, Linking } from 'react-native';
import { getUser } from '../../../constants/userContext';
import Fab from '../../../components/fab';
import { databases } from '../../../backend/appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Query } from 'appwrite';
import * as Contacts from 'expo-contacts';

const STORAGE_KEY = '@MyApp:cachedContacts';

const ChatsScreen = ({ navigation }) => {
  const { session, setSession } = getUser();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState({ inApp: [], notInApp: [] });
  const [modalVisible, setModalVisible] = useState(false);
  const [contactsCached, setContactsCached] = useState(false);

  // Fetch contacts from device
  const fetchContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access contacts was denied');
        // Alert already present here
        return [];
      }
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      console.log('Fetched Contacts:', data); // Log fetched contacts
      return data;
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      return [];
    }
  };
  

  // Check if user exists in the app database
  const isUserInApp = async (phoneNumber) => {
    try {
      console.log('Checking if user is in app:', phoneNumber);
      const response = await databases.listDocuments(
        '6682d430002d49900dfb',
        '668318c2002986810f9a',
        [Query.equal('phoneNumber', phoneNumber)]
      );
      console.log('Database response:', response);
      return response.documents.length > 0;
    } catch (error) {
      console.error('Failed to check user in the database:', error);
      return false;
    }
  };

  // Load cached contacts from AsyncStorage
  useEffect(() => {
    const loadCachedContacts = async () => {
      try {
        const cachedContacts = await AsyncStorage.getItem(STORAGE_KEY);
        if (cachedContacts) {
          const parsedContacts = JSON.parse(cachedContacts);
          setContacts(parsedContacts.contactsList);
          setFilteredContacts(parsedContacts.filteredContacts);
          setContactsCached(true);
        }
      } catch (error) {
        console.error('Failed to load cached contacts:', error);
      }
    };

    loadCachedContacts();
  }, []);

  // Fetch contacts when modal is visible
  const fetchContactsIfNeeded = async () => {
    try {
      if (!contactsCached) {
        const fetchedContacts = await fetchContacts();
        const inAppContacts = [];
        const notInAppContacts = [];
  
        for (const contact of fetchedContacts) {
          if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            const isInApp = await isUserInApp(contact.phoneNumbers[0].number);
            if (isInApp) {
              inAppContacts.push(contact);
            } else {
              notInAppContacts.push(contact);
            }
          }
        }
        const contactsToCache = {
          contactsList: fetchedContacts,
          filteredContacts: { inApp: inAppContacts, notInApp: notInAppContacts }
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contactsToCache));
        setContactsCached(true);
        setContacts(fetchedContacts);
        setFilteredContacts({ inApp: inAppContacts, notInApp: notInAppContacts });
      }
    } catch (error) {
      console.error('Failed to fetch and cache contacts:', error);
    }
  };
  

  // Handle fetching contacts and showing modal
  const handleFetchContacts = async () => {
    setModalVisible(true);
    await fetchContactsIfNeeded();
  };

  // Log filtered contacts for debugging
  useEffect(() => {
    if (modalVisible) {
      fetchContactsIfNeeded();
      // clearCache()
      
    console.log('Filtered Contacts In App:', filteredContacts.inApp);
    console.log('Filtered Contacts Not In App:', filteredContacts.notInApp);
    }
  }, [modalVisible]);

  const clearCache = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setContactsCached(false);
  };
  
  

  // Render component based on user session
  if (session) {
    return (
      <View style={styles.container}>
        <Text>Chat Screen</Text>
        <Button title='Tap' onPress={() => { navigation.navigate('ChatRoom') }} />
        <Fab
          type="chats"
          handlePress={handleFetchContacts}
        />

        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text>Contacts using the app:</Text>
            <FlatList
              data={filteredContacts.inApp}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Text>{item.name}</Text>}
            />

            <Text>Contacts not using the app:</Text>
            <FlatList
              data={filteredContacts.notInApp}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Text>{item.name}</Text>}
            />
            <Button title="Close" onPress={() => setModalVisible(false)} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
  },
});

export default ChatsScreen;
