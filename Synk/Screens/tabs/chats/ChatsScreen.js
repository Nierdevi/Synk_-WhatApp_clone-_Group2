import { Entypo, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fetchMessagedContacts, } from '../../../backend/chatService';
import Fab from '../../../components/fab';


const chatsData = require('../../../assets/data/chats.json')

import { primaryColors } from '../../../constants/colors';
import { getUser } from '../../../constants/userContext';

import { fetchAndNormalizeContacts, loadCachedContacts } from '../../../backend/contacts ';

const FILTEREDCONTACTS = '@MyApp:filteredContacts';
const chatsData = require('../../../assets/data/chats.json');

const ChatsScreen = ({ navigation }) => {
  const { session, setSession } = getUser();
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [messagedContacts, setMessagedContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      const cachedContacts = await loadCachedContacts();
      if (cachedContacts) {
        setContacts(cachedContacts);
      }
      // console.log(cah)
    };

    const fetchContacts = async () => {
      const fetchedContacts = await fetchAndNormalizeContacts();
      if (fetchedContacts) {
        setContacts(fetchedContacts);
      }
      // console.log(fetchedContacts)
      // console.log(contacts)
    };

    const initializeContacts = async () => {
      await loadContacts();
      fetchContacts();
    }

    initializeContacts();
    // const unsubscribe = subscribeToDatabaseChanges(setContacts);
    // return () => unsubscribe();
  }, [session]);

  useEffect(() => {
    const fetchMessagedContactsData = async () => {
      if (session && session.phoneNumber) {
        const messagedContactsData = await fetchMessagedContacts(session.phoneNumber);
        setMessagedContacts(messagedContactsData);
        // console.log(messagedContactsData)
      }
      // console.log(messagedContacts)
    };

    fetchMessagedContactsData();
  }, [session]);

  useEffect(() => {
    if (!modalVisible) {
      setSearchQuery('');
    }
  }, [modalVisible]);

  // useEffect(() => {
  //   const fetchUserMessagedContacts = async () => {
  //     const userMessagedContacts = await fetchMessagedContacts(session.phoneNumber);
  //     setMessagedContacts(userMessagedContacts);
  //     // console.log(userMessagedContacts)
  //   };
  //   // console.log(messagedContacts)
  //   if (session) {
  //     fetchUserMessagedContacts();
  //   }
  // }, [session]);

  const handleFetchContacts = () => {
    setModalVisible(true);
  };

  useEffect(()=>{
    // console.log(contacts)
    // console.log("messaged contacts "+messagedContacts)
  })

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const renderContactItem = ({ item }) => {
    const handleContactPress = async (contact) => {
      try {
        const currentPhoneNumber = session.phoneNumber;

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
        </View>
      </TouchableOpacity>
    );
  };

  
  const renderMessagedContactItem = ({ item }) => {
    // console.log("Item:", item); // Log item to understand its structure and value
  
    // Find the contact in your contacts list based on any normalized phone number
    const contact = contacts.find(contact => {
      // Ensure contact.normalizedPhoneNumbers exists and is an array
      if (contact.normalizedPhoneNumbers && Array.isArray(contact.normalizedPhoneNumbers)) {
        return contact.normalizedPhoneNumbers.includes(item);
      }
      return false;
    });
  
    // console.log("Contact:", contact); // Log contact to understand why it might be undefined
  
    if (!contact) {
      console.warn(`No contact found for ${item}`);
      return null;
    }
  
    return renderContactItem({ item: contact });
  };
  


  if (!session) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.searchButton} onPress={() => Alert.alert('Search button pressed')}>
          <Text style={styles.searchButtonText}>Ask Synk Ai or Search</Text>
        </TouchableOpacity>
        <FlatList
          data={messagedContacts}
          renderItem={renderMessagedContactItem}
          keyExtractor={(item) => item.$id}
        />
        <Fab type="chats" handlePress={handleFetchContacts} />

        <Modal visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
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
            <Text style={styles.contactName}>New contact </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {filteredContacts.length > 0 ? (
            <FlatList
              data={filteredContacts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderContactItem}
            />
          ) : (
            <View style={styles.noContactsView}>
              <Text style={{fontSize:wp(5),textAlign:'center'}}>No contacts found</Text>
            </View>
          )}
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
  searchButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  searchButtonText: {
    color: 'grey',
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
    // margin: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    width: wp("100%"),
    // marginTop:-10,
  },
  contactItem: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    width: wp("100%"),
    flexDirection:'row'

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
    marginLeft:250,
    marginTop:-10,
  },
});

export default ChatsScreen;
