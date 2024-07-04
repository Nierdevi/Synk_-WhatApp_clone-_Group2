import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Modal, Alert, Linking,TouchableOpacity,Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getUser } from '../../../constants/userContext';
import Fab from '../../../components/fab';
import { databases } from '../../../backend/appwrite';
import { createChat } from '../../../backend/chatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchAndFilterContacts, loadCachedContacts, startContactRefresh  } from '../../../backend/contacts ';

import { Query } from 'appwrite';
import * as Contacts from 'expo-contacts';

import ChatListItem from './components/ChatListItem';

const chatsData = require('../../../assets/data/chats.json')

import { Ionicons, Entypo } from '@expo/vector-icons';
import { primaryColors } from '../../../constants/colors';


const ChatsScreen = ({ navigation }) => {
  const { session, setSession } = getUser();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState({ inApp: [], notInApp: [] });
  const [modalVisible, setModalVisible] = useState(false);
  const [contactsCached, setContactsCached] = useState(false);

  useEffect(() => {
    const loadContacts = async () => {
      const cachedContacts = await loadCachedContacts();
      if (cachedContacts) {
        setContacts(cachedContacts.contactsList);
        setFilteredContacts(cachedContacts.filteredContacts);
      } else {
        const newContacts = await fetchAndFilterContacts();
        if (newContacts) {
          setContacts(newContacts.contactsList);
          setFilteredContacts(newContacts.filteredContacts);
        }
      }
    };

    loadContacts();
    startContactRefresh(); // Start the contact refresh service
  }, []);

  useEffect(() => {
    if (modalVisible) {
      fetchAndFilterContacts().then(newContacts => {
        if (newContacts) {
          setContacts(newContacts.contactsList);
          setFilteredContacts(newContacts.filteredContacts);
        }
      });
    }
  }, [modalVisible]);

  const handleFetchContacts = () => {
    setModalVisible(true);
  };

  const clearCache = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  
     // Render function for each contact item for the modal
     const renderContactItem = ({ item }) => {
      const handleContactPress = async (contact) => {
        try {
          const recipientUserId = contact.id; // Assuming contact.id is the contact's user ID in your app
          const currentUserId = session.userId; // Current user's ID
          console.log(session.userId)
    
          const chatRoom = await createChat(currentUserId, recipientUserId);
          if (chatRoom) {
            navigation.navigate('ChatRoom', { chatRoomId: chatRoom.$id, contact });
          } else {
            Alert.alert('Error', 'Failed to create or retrieve chat room');
          }
        } catch (error) {
          console.error('Failed to handle contact press:', error);
          Alert.alert('Error', 'An error occurred while trying to create or retrieve the chat room');
        }
      };
    
      return (
        <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress(item)}>
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
    };
    
  // Render component based on user session
  if (session) {
    // console.log(session.userId)
    return (
      <View style={styles.container}>
        
        <FlatList
          data={chatsData}
          renderItem={({item}) => <ChatListItem chat={item} />}
          keyExtractor={(item) => item.id.toString()}
        
        />
        <Fab
          type="chats"
          handlePress={() => setModalVisible(true)}
        />

        <Modal visible={modalVisible} animationType="slide">
          <View style={{width:wp('100%'),flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,height:hp("7%"),elevation:1}}>
          <Ionicons name="arrow-back-outline" size={24} color="black"style={{marginRight:10,marginTop:6}} onPress={() => setModalVisible(false)}/>
            <Text style={{fontSize:20,flexGrow:1}}>Select contact </Text>
            <View style={{width:wp("13%"),flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Ionicons name="search" size={24} color="black" />
              <Pressable style={[styles.dots,]} onPress={() => setMenuVisible(true)}>
                <Entypo name="dots-three-vertical" size={20}  />
              </Pressable>
            </View>
          </View>
          <TouchableOpacity style={{width:wp('100%'),flexDirection:'row',alignItems:'center',padding:10,height:hp("7%"),elevation:1}}>
            <View style={[styles.avatarContainer,{backgroundColor:primaryColors.purple}]}><Ionicons name="person-add" size={20} color="white" /></View>
            <Text style={styles.contactName}>New contact </Text>
          </TouchableOpacity>
          <View style={styles.modalContainer}>
            <Text style={{textAlign:'left',width:wp('95%'),fontSize:16}}>Contacts on Synk </Text>
            <FlatList
              data={filteredContacts.inApp}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderContactItem}
              ListEmptyComponent={()=>{return <Text>No contact on your phone currently uses Synk </Text>}}
            />

            <Text style={{textAlign:'left',width:wp('95%'),marginTop:50,fontSize:16}}>Invite to Synk </Text>
            <FlatList
              data={filteredContacts.notInApp}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderContactItem}
              initialNumToRender='50'
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
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
