import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Modal, Alert, Linking, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getUser } from '../../../constants/userContext';
import Fab from '../../../components/fab';
import { databases } from '../../../backend/appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Query } from 'appwrite';
import * as Contacts from 'expo-contacts';
import ChatListItem from './ChatListItem';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { primaryColors } from '../../../constants/colors';

const chatsData = require('../../../assets/data/chats.json');

const STORAGE_KEY = '@MyApp:cachedContacts';
const PAGE_SIZE = 50;

const ChatsScreen = ({ navigation }) => {
  const { session, setSession } = getUser();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState({ inApp: [], notInApp: [] });
  const [modalVisible, setModalVisible] = useState(false);
  const [contactsCached, setContactsCached] = useState(false);

  const fetchContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access contacts was denied');
        return [];
      }
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      return data;
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      return [];
    }
  };

  const isUserInApp = async (phoneNumber) => {
    try {
      const response = await databases.listDocuments(
        '6682d430002d49900dfb',
        '668318c2002986810f9a',
        [Query.equal('phoneNumber', phoneNumber)]
      );
      return response.documents.length > 0;
    } catch (error) {
      console.error('Failed to check user in the database:', error);
      return false;
    }
  };

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

  const handleFetchContacts = async () => {
    setModalVisible(true);
    await fetchContactsIfNeeded();
  };

  useEffect(() => {
    if (modalVisible) {
      fetchContactsIfNeeded();
    }
  }, [modalVisible]);

  const clearCache = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setContactsCached(false);
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity style={styles.contactItem} onPress={() => {}}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.contactDetails}>
        <Text style={styles.contactName}>{item.name}</Text>
        {item.note && <Text style={styles.contactStatus}>{item.note}</Text>}
        {!filteredContacts.inApp.includes(item) && (
          <Text style={styles.inviteText}>Invite</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (!session) {
    return (
      <View style={{flex: 1,}}>
        <ScrollView style={styles.container}>
          <FlatList
            data={chatsData}
            renderItem={({ item }) => <ChatListItem chat={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
            <Modal visible={modalVisible} animationType="slide">
              <View style={styles.modalHeader}>
                <Ionicons
                  name="arrow-back-outline"
                  size={24}
                  color="black"
                  style={styles.modalBackIcon}
                  onPress={() => setModalVisible(false)}
                />
                <Text style={styles.modalTitle}>Select contact</Text>
                <View style={styles.modalActions}>
                  <Ionicons name="search" size={24} color="black" />
                  <Pressable style={styles.dots} onPress={() => setMenuVisible(true)}>
                    <Entypo name="dots-three-vertical" size={20} />
                  </Pressable>
                </View>
              </View>
              <TouchableOpacity style={styles.newContactButton}>
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
                  ListEmptyComponent={() => (
                    <Text>No contacts on your phone currently use Synk</Text>
                  )}
                />
                <Text style={[styles.sectionTitle, { marginTop: 50 }]}>Invite to Synk</Text>
                <FlatList
                  data={filteredContacts.notInApp}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderContactItem}
                  initialNumToRender={50}
                />
              </View>
            </Modal>
        </ScrollView>
        <Fab type="chats" handlePress={handleFetchContacts}/>
      </View>
    );
  } else {
    navigation.replace('welcome');
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  modalBackIcon: {
    marginRight: 10,
    marginTop: 6,
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
  dots: {
    padding: 5,
  },
  newContactButton: {
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
  },
  sectionTitle: {
    textAlign: 'left',
    width: wp('95%'),
    fontSize: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactStatus: {
    fontSize: 14,
    color: 'gray',
  },
  inviteText: {
    fontSize: 14,
    color: 'blue',
  },
});

export default ChatsScreen;
