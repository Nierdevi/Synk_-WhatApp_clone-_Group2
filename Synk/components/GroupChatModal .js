import React, { useState, useEffect } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput,Image, Alert, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import { CheckBox } from 'react-native-elements'; // Ensure you have installed this package
import { databases } from '../backend/appwrite';
import { getUser } from '../constants/userContext';
import { useContacts } from '../backend/contacts ';
import { uploadGrpProfile,createGroupChat,createChat } from '../backend/groupServices';
import { MaterialIcons, Ionicons, Feather, FontAwesome6 } from '@expo/vector-icons';
import { primaryColors } from '../constants/colors';
import Fab from './fab';


const GroupChatModal = ({ visible, onClose, navigation ,close}) => {
  const { session } = getUser();
  const contacts = useContacts(session); // Fetch contacts
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [profilePictureUri, setProfilePictureUri] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await databases.listDocuments('database_id', 'users');
        const appUsers = response.documents;
        // console.log("contacts in app: ", appUsers);

        // console.log('Comparing:', user.phoneNumber, 'with', contact.normalizedPhoneNumbers[0]);
        const filtered = contacts.filter(contact =>
          appUsers.some(user => 
            contact.normalizedPhoneNumbers &&
            contact.normalizedPhoneNumbers.length > 0 &&
            user.phoneNumber === contact.normalizedPhoneNumbers[0]
          )
        );
        setFilteredContacts(filtered);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    if (visible) {
      fetchUsers();
    }
  }, [visible, contacts]);

  const toggleContactSelection = (phoneNumber) => {
    
    setSelectedContacts((prevSelected) =>
      prevSelected.includes(phoneNumber)
        ? prevSelected.filter((num) => num !== phoneNumber)
        : [...prevSelected, phoneNumber]
    );
  };
  // console.log("Selected Contacts:", selectedContacts);


  const handleCreateGroup = async () => {
    if(!groupName){
      Alert.alert("Required field","Group must have a name")
      return
    }
    if(selectedContacts.length === 0){
      Alert.alert("Required field","You must select at least one contact")
      return
    }

    // console.log("session: ",session)
    const participants = selectedContacts.map(phoneNumber => {
      const contact = filteredContacts.find(c => c.normalizedPhoneNumbers[0] === phoneNumber);
      // console.log("Found Contact:", contact);
      return contact ? contact.normalizedPhoneNumbers[0] : null;
    }).filter(Boolean);
    
    // console.log("Participants array:", participants);

    const currentUserPhoneNumber = session.phoneNumber;

    let profilePicUrl = '';
    if (profilePictureUri) {
      console.log("profile url",profilePicUrl)
      try {
        profilePicUrl = await uploadGrpProfile(profilePictureUri);
        // setProfilePictureUri(profilePicUrl)
      } catch (error) {
        Alert.alert('Error', 'Failed to upload profile picture.');
        return;
      }
    }
    // participants=selectedPhoneNumbers
    // console.log("setected participant: ",participants)

    const response=await createGroupChat(currentUserPhoneNumber, participants, groupName, description, profilePicUrl);
    console.log("Group Chat Response:", response);


    if (response ) {
      console.log("response groupid: ",response.groupId)
      console.log("current: ",currentUserPhoneNumber)
      console.log("current: ",participants)

      // Create a new chat room with the groupId and participants
      const chatResponse = await createChat(response.groupId,currentUserPhoneNumber, [currentUserPhoneNumber, ...participants]);
      console.log("Chat Room Response:", chatResponse);

      // Navigate to the chat room
      if (chatResponse) {
        // Navigate to the chat room
        navigation.navigate('GroupRoom', {
          groupData:response,
          groupId:response.groupId,
          chatResponse: chatResponse,
          participants: [currentUserPhoneNumber, ...participants],
          currentUserPhoneNumber,
          profilePicture: profilePicUrl,
        });
      }
  }

    // Reset states
    setSelectedContacts([]);
    setGroupName('');
    setDescription('');
    setProfilePictureUri('');
    onClose();

  };


  // console.log("selected phoneNumber: ",selectedContacts)


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result && !result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfilePictureUri(uri)
      console.log('Image URI:', uri);
      console.log("state uri: ",profilePictureUri)
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleContactSelection(item.normalizedPhoneNumbers[0])} style={styles.contactItem}>
      <CheckBox
        checked={selectedContacts.includes(item.normalizedPhoneNumbers[0])}
        onPress={() => toggleContactSelection(item.item.normalizedPhoneNumbers[0])}
        size={18}
      />
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const GroupCam=require("../assets/group-camera.png")

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text style={styles.title}>Create a new group</Text>
        </View>

        <View style={styles.upperContainer}>
          <TouchableOpacity style={styles.profileContainer} onPress={pickImage}>
            <Image source={profilePictureUri ? { uri: profilePictureUri }:GroupCam} style={styles.profilePicture} />
          </TouchableOpacity>
          <TextInput
            style={styles.groupNameInput}
            placeholder="Group Name"
            value={groupName}
            onChangeText={setGroupName}
            selectionColor={primaryColors.purple}
          />
        </View>

        <TextInput
          style={styles.descriptionInput}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          selectionColor={primaryColors.purple}
          multiline
        />
        <Text style={{fontSize:16,textAlign:'left',marginVertical:10}}>Select contact(s)</Text>
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <Fab type="send" handlePress={handleCreateGroup}/>
        {/* <TouchableOpacity style={styles.createGroupButton} onPress={handleCreateGroup}>
          <Text style={styles.buttonText}>Create Group</Text>
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  descriptionInput: {
    borderBottomWidth: 1,
    borderColor: primaryColors.purple,
    marginTop:15,
    padding: 10,
    fontSize: 16,
  },
  header:{
    flexDirection:'row',
    gap:5
  },
  upperContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:20
  },
  profileContainer:{
    width: 60,
    height:60,
    borderRadius:50,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  groupNameInput:{
    borderBottomWidth: 1,
    borderColor: primaryColors.purple,
    padding: 10,
    fontSize: 16,
    flex:1

  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    // gap:7
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight:'300'
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  createGroupButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default GroupChatModal;