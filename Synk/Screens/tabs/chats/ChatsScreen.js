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

const useContacts = (session) => {
  const [contacts, setContacts] = useState([]);

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

  return contacts;
};

const useMessagedContacts = (session) => {
  const [messagedContacts, setMessagedContacts] = useState([]);

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


  //displays the contacts on your phone in the modal
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
      <TouchableOpacity style={styles.contactItem} onPress={handleContactPress}>
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


  //Display contacts u have message with
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
          <Text style={styles.contactName}>{contact.name} </Text>
          <View style={styles.lastMessageConatiner}>
            {item.lastMessage && <Text style={styles.lastMessageText} numberOfLines={1}  ellipsizeMode='tail'>{item.lastMessage.messageText} </Text>}
            <View style={styles.timestampContainer}>

            {item.lastMessage && <Text style={styles.lastMessageTime}>{DateTime(item.lastMessage.$createdAt)} </Text>}
            </View>
          </View>
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
  lastMessageConatiner:{
    flexDirection:'row',
    width:wp('80%'),
    justifyContent:'space-between',
    alignItems:'flex-end'
  },
  lastMessageTime:{
    fontSize:wp('3'),
  },
  contactName: {
    fontSize: hp('2.5%'),
  },
  lastMessageText: {
    fontSize: hp('2%'),
    color: 'gray',
    alignSelf:'flex-end'
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
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    width: wp("100%"),
  },
  contactItem: {
    padding: 10,
    width: wp("100%"),
    flexDirection: 'row'
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
    borderColor:primaryColors.purple,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize:wp('4%')
  },
});

export default ChatsScreen;
 