import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity, Pressable, Alert,StatusBar } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getUser } from '../../../constants/userContext';
import Fab from '../../../components/fab';

const chatsData = require('../../../assets/data/chats.json');

import { Ionicons, Entypo } from '@expo/vector-icons';
import { primaryColors } from '../../../constants/colors';
import { fetchMessagedContacts } from '../../../backend/chatService';
import { fetchAndNormalizeContacts, loadCachedContacts } from '../../../backend/contacts ';
import DateTime from '../../../components/DateTime';

const useContacts = (session) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const cachedContacts = await loadCachedContacts();
        if (cachedContacts) setContacts(cachedContacts);

        const fetchedContacts = await fetchAndNormalizeContacts();
        if (fetchedContacts) setContacts(fetchedContacts);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
        if (error.message.includes('Network request failed')) {
          Alert.alert('Network Error', 'Please check your network connection and try again.');
        }
      }
    };

    if (session) {
      loadContacts();
    }
  }, [session]);

  return contacts;
};

useEffect(()=>{
  console.log("all good🥧")
})

const useMessagedContacts = (session) => {
  const [messagedContacts, setMessagedContacts] = useState([]);

  useEffect(() => {
    const fetchMessagedContactsData = async () => {
      try {
        if (session && session.phoneNumber) {
          const messagedContactsData = await fetchMessagedContacts(session.phoneNumber);
          setMessagedContacts(messagedContactsData);
        }
      } catch (error) {
        console.error('Failed to fetch messaged contacts:', error);
        if (error.message.includes('Network request failed')) {
          Alert.alert('Network Error', 'Please check your network connection and try again.');
        }
      }
    };

    fetchMessagedContactsData();
  }, [session]);

  return messagedContacts;
};

const ChatsScreen = ({ navigation }) => {
  const { session } = getUser();
  const contacts = useContacts(session);
  const messagedContacts = useMessagedContacts(session);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!modalVisible) setSearchQuery('');
  }, [modalVisible]);

  const handleFetchContacts = () => setModalVisible(true);

  const handleSearch = (query) => setSearchQuery(query);

  const checkIfContactExistsInDatabase = async (phoneNumber) => {
    // Replace with actual database check logic
    const response = await fetch(`https://example.com/check-contact?phoneNumber=${phoneNumber}`);
    const result = await response.json();
    return result.exists;
  };

  const handleContactPress = async (item) => {
    const contactExists = await checkIfContactExistsInDatabase(item.phoneNumber);
    if (contactExists) {
      navigation.navigate('ChatRoom', { contact: item, currentUserPhoneNumber: session.phoneNumber });
      setModalVisible(false);
    } else {
      Alert.alert('Contact Not Found', 'The selected contact is not available in the database.');
    }
  };

  const renderContactItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress(item)}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.name} </Text>
          {item.note && <Text style={styles.contactStatus}>{item.note}</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  const renderMessagedContactItem = ({ item }) => {
    const contact = contacts.find(contact =>
      contact.normalizedPhoneNumbers?.includes(item.contactPhoneNumber)
    );

    if (!contact) return null;

    return (
      <TouchableOpacity style={styles.contactItem} onPress={() => navigation.navigate('ChatRoom', { contact, currentUserPhoneNumber: session.phoneNumber })}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{contact.name[0]}</Text>
        </View>
        <View style={styles.contactDetails}>
          <View style={styles.upperContactdetails}>
            <Text style={styles.contactName}>{contact.name} </Text>
            {item.lastMessage && <Text style={styles.lastMessageTime}>{DateTime(item.lastMessage.$createdAt)} </Text>}
          </View>
          {item.lastMessage && <Text style={styles.lastMessageText} numberOfLines={1} ellipsizeMode='tail'>{item.lastMessage.messageText} </Text>}
        </View>
      </TouchableOpacity>
    );
  };

  if (!session) {
    navigation.replace("welcome");
    return null;
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messagedContacts}
        renderItem={renderMessagedContactItem}
        keyExtractor={(item) => item.contactPhoneNumber}
      />
      <Fab type="chats" handlePress={handleFetchContacts} />

      <Modal visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalHeader}>
          <Ionicons name="arrow-back-outline" size={24} color="black" onPress={() => setModalVisible(false)} />
          <Text style={styles.modalTitle}>Select contact</Text>
          <View style={styles.modalActions}>
            <Pressable style={styles.dots}>
              <Entypo name="dots-three-vertical" size={20} />
            </Pressable>
          </View>
        </View>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <FlatList
          data={filteredContacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={filteredContacts.length === 0 && <Text style={{ fontSize: hp('2.5%'), textAlign: 'center' }}>No Contacts Found </Text>}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    width:wp('100%'),
    paddingRight:10,

  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    // backgroundColor:'yellow',
  },
  avatarContainer: {
    width: wp('13%'),
    height: hp('6.5%'),
    borderRadius: 30,
    backgroundColor: primaryColors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  avatarText: {
    fontSize: hp('3%'),
    color: 'white',
  },
  contactDetails: {
    justifyContent: 'center',
  },
  upperContactdetails:{
    justifyContent:'space-between',
    flexDirection:'row',
    width:'90%'
  },
  contactName: {
    fontSize: hp('2.5%'),
  },
  lastMessageText: {
    fontSize: hp('2%'),
    color: 'gray',
    width:wp("70%")
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactItem: {
    padding: 10,
    width: wp("100%"),
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
  dots: {
    marginRight: 10,
  },
  searchInputContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: primaryColors.purple,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: wp('4%'),
  },
});

export default ChatsScreen;
