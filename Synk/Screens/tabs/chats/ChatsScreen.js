import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getUser } from '../../../constants/userContext';
import Fab from '../../../components/fab';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { primaryColors } from '../../../constants/colors';
import { fetchMessagedContacts } from '../../../backend/chatService';
import { fetchAndNormalizeContacts, loadCachedContacts } from '../../../backend/contacts ';

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

    const intervalId = setInterval(fetchMessagedContactsData, 10000); // refresh every 10 seconds

    return () => clearInterval(intervalId); // cleanup on unmount
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

  const renderContactItem = ({ item }) => {
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
          <Text style={styles.contactName}>{contact.name}</Text>
          {item.lastMessage && <Text style={styles.lastMessageText}>{item.lastMessage.messageText}</Text>}
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
            <Ionicons name="search" size={24} color="black" />
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
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
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
  contactName: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  lastMessageText: {
    fontSize: hp('2%'),
    color: 'gray',
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
  dots: {
    marginLeft: 10,
  },
  searchInputContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default ChatsScreen;
