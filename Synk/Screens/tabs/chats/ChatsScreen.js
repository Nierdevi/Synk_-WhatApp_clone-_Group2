import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View  } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Fab from '../../../components/fab';
import { getUser } from '../../../constants/userContext';

import { Query } from 'appwrite';
import { databases } from '../../../backend/appwrite';

import { Entypo, Ionicons } from '@expo/vector-icons';
import { fetchMessagedContacts } from '../../../backend/chatService';
import { fetchAndNormalizeContacts, loadCachedContacts } from '../../../backend/contacts ';
import DateTime from '../../../components/DateTime';
import { primaryColors } from '../../../constants/colors';
import { Image } from 'expo-image';
import { getUserData } from '../../../backend/userService';
import RenderMessagedContactItem from '../../../components/renderMessagedContactItem';

Applogo=require('../../../assets/AppLogo.png')
Verified=require('../../../assets/verified.png')

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
    const intervalId = setInterval(fetchMessagedContactsData, 1000); // 1000ms = 1 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [session]);

  return messagedContacts;
};



const ChatsScreen = ({ navigation }) => {
  const { session } = getUser();
  const contacts = useContacts(session);
  const messagedContacts = useMessagedContacts(session);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/50');


 

  // console.log(session.phoneNumber)
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMessagedContacts(session.phoneNumber);
    setRefreshing(false);
  };
// console.log(contacts)


  useEffect(() => {
    if (!modalVisible) setSearchQuery('');
  }, [modalVisible]);

  const handleFetchContacts = () => setModalVisible(true);

  const handleSearch = (query) => setSearchQuery(query);

  const checkPhoneNumberExists = async (phoneNumber) => {
    try {
        const response = await databases.listDocuments('database_id', 'users', [
            Query.equal('phoneNumber', phoneNumber),
        ]);

        return response.documents.length > 0;
    } catch (error) {
        console.error('Error checking phone number:', error);
        throw error;
    }
};
// console.log("messaged Contacts: ",messagedContacts.chatId)
  const handleContactPress = async (item) => {
    try {
      const recipientPhoneNumber = item.normalizedPhoneNumbers[0];
      const currentPhoneNumber = session.phoneNumber; // Assuming session contains the current user's phone number
      console.log(currentPhoneNumber)
      console.log(recipientPhoneNumber)

      const isInDatabase = await checkPhoneNumberExists(recipientPhoneNumber);

      if(isInDatabase){
        console.log(isInDatabase)
        navigation.navigate('ChatRoom', { contact:item, currentUserPhoneNumber: currentPhoneNumber });
        setModalVisible(false);

      }else{
        Alert.alert('Oops!', 'This contact isn\'t on Synk');
      }
    } catch (error) {
      console.error('Failed to handle contact press:', error);
        Alert.alert('Oops!', 'This contact isn\'t on Synk');
      // Alert.alert('Error', 'An error occurred while trying to navigate to the chat room');
    }
  };

  const renderContactItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress(item)}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.appName}>{item.name} </Text>
          {item.note && <Text style={styles.contactStatus}>{item.note}</Text>}
        </View>
      </TouchableOpacity>
    );
  };


  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hnadleOfficialSite=()=>{
    Alert.alert("Oops!🤤","Under development");
    return
  }

  //main return funtction

  return (
    <View style={styles.container}>

    <TouchableOpacity
        style={styles.newsContainer}
        onPress={hnadleOfficialSite}
        >
        <Image
            source={Applogo} 
            style={styles.profilePicture}
            cachePolicy="disk"
        />
        <View style={styles.details}>
        <View style={{flexDirection:'row',}}>
          <Text style={styles.appName}>Synk </Text>
          <Image source={Verified} cachePolicy='memory-disk' style={styles.verify} tintColor="#7410d7" />
        </View>
          <Text
              style={styles.gistText}
          >Know more about Synk
          </Text>
        </View>
    </TouchableOpacity>

      <FlatList
        data={messagedContacts}
        renderItem={({ item }) => (
          <RenderMessagedContactItem
            item={item}
            contacts={contacts}
            navigation={navigation}
            session={session}
          />
        )}

        keyExtractor={(item) => item.contactPhoneNumber}
        refreshing={refreshing}
        onRefresh={onRefresh}
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
    // paddingHorizontal:10,
    // marginTop:20,

  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 9,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    backgroundColor:'yellow',
  },
  avatarContainer: {
    width: wp('15.5%'),
    height: hp('8%'),
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
    // justifyContent: 'center',
    // gap:5
  },
  details:{
    justifyContent:'space-around',
    // backgroundColor:'red',
    // flexDirection:'row',
    width:'90%',
    flex:1
  },
  appName: {
    fontSize: wp('5%'),
  },
  verify:{
    fontSize: wp('3%'),
  },
  gistText:{
    fontSize: wp('4%'),
    color:'#27272A'
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
  newsContainer: {
    padding: 10,
    width: wp("100%"),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#737373',
    paddingBottom:4,
    marginBottom:20
  },
  appName: {
    fontSize: wp("5%"),
  },
  verify:{
    width: wp('5%'),

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
  profilePicture: {
    width: wp('15%'),
    height: hp('7%'),
    borderRadius: 50,
    marginRight: 10,
  }
});

export default ChatsScreen;
