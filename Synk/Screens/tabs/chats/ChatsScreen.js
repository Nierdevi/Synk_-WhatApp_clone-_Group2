import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getUser } from '../../../constants/userContext';
import Fab from '../../../components/fab';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { primaryColors } from '../../../constants/colors';
import { fetchMessagedContacts } from '../../../backend/chatService';
import { fetchAndNormalizeContacts, loadCachedContacts } from '../../../backend/contacts ';
import ChatRoom from './ChatRoom';


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

    const intervalId = setInterval(fetchMessagedContactsData, 10);

    return () => clearInterval(intervalId); // Clear interval on component unmount
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

  const renderMessagedContactItem = ({ item }) => {
    const contact = contacts.find(contact =>
      contact.normalizedPhoneNumbers?.includes(item.contactPhoneNumber)
    );

    if (!contact) return null;

    const handleContactPress = () => {
      navigation.navigate('ChatRoom', { contact, currentUserPhoneNumber: session.phoneNumber });
    };

    const lastMessage = item.messageText; // Assuming messageText is the last message
    const isNewMessage = item.senderId !== session.phoneNumber; // Assuming senderId is the id of the sender

    return (
      <TouchableOpacity style={styles.contactItem} onPress={handleContactPress}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{contact.name[0]}</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
          {isNewMessage && <View style={styles.newMessageIndicator} />}
        </View>
      </TouchableOpacity>
    );
  };

  if (!session) {
    navigation.replace("welcome");
    return null;
  }

  // Sort messagedContacts by updatedAt in descending order
  const sortedMessagedContacts = messagedContacts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedMessagedContacts}
        renderItem={renderMessagedContactItem}
        keyExtractor={(item) => item.contactPhoneNumber}
      />
      <Fab type="chats" handlePress={handleFetchContacts} />

      <Modal visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalHeader}>
          <Ionicons name="arrow-back-outline" size={24} color="black" onPress={() => setModalVisible(false)} />
          <Text style={styles.modalTitle}>Select contact</Text>
          <View style={styles.modalActions}>
            <Ionicons name="search" size={24} color="black" />
            <Pressable style={styles.dots}>
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
            renderItem={({ item }) => {
              const handleContactPress = () => {
                navigation.navigate('ChatRoom', { contact: item, currentUserPhoneNumber: session.phoneNumber });
                setModalVisible(false);
              };

              return (
                <TouchableOpacity style={styles.contactItem} onPress={handleContactPress}>
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{item.name[0]}</Text>
                  </View>
                  <View style={styles.contactDetails}>
                    <Text style={styles.contactName}>{item.name}</Text>
                    {item.note && <Text style={styles.contactStatus}>{item.note}</Text>}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View style={styles.noContactsView}>
            <Text style={{ fontSize: wp(5), textAlign: 'center' }}>No contacts found</Text>
          </View>
        )}
      </Modal>
    </View>
  );
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    margin: 10,
    borderRadius: 5,
  },
  contactItem: {
    padding: 10,
    width: wp('100%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: primaryColors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: 'gray',
  },
  newMessageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginLeft: 10,
  },
  newContact: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  dots: {
    padding: 5,
  },
  noContactsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatsScreen;
