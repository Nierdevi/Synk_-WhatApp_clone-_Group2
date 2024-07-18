import React, { useState, useEffect } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput,Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CheckBox } from 'react-native-elements'; // Ensure you have installed this package
import { databases } from '../backend/appwrite';
import { getUser } from '../constants/userContext';
import { useContacts } from '../backend/contacts ';
import { uploadGrpProfile,createGroupChat,createChat } from '../backend/groupServices';



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
        const response = await databases.listDocuments('6685cbc40036f4c6a5ad', '6685cc6600212adefdbf');
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
  console.log("Selected Contacts:", selectedContacts);


  const handleCreateGroup = async () => {
    if(!groupName){
      Alert.alert("Required field","Group must have a name")
      return
    }
    if(selectedContacts.length === 0){
      Alert.alert("Required field","You must select at least one contact")
      return
    }


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
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleContactSelection(item.normalizedPhoneNumbers[0])} style={styles.contactItem}>
      <CheckBox
        checked={selectedContacts.includes(item.normalizedPhoneNumbers[0])}
        onPress={() => toggleContactSelection(item.item.normalizedPhoneNumbers[0])}
      />
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Create Group</Text>
        <TextInput
          style={styles.input}
          placeholder="Group Name"
          value={groupName}
          onChangeText={setGroupName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Text style={styles.imagePickerText}>Pick a Profile Picture</Text>
        </TouchableOpacity>
        {profilePictureUri ? (
          <Image source={{ uri: profilePictureUri }} style={styles.profilePicture} />
        ) : null}
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.createGroupButton} onPress={handleCreateGroup}>
          <Text style={styles.buttonText}>Create Group</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
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
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 16,
    marginLeft: 10,
  },
  imagePicker: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePickerText: {
    color: 'white',
    fontSize: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  createGroupButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    alignItems: 'center',
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 10,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default GroupChatModal;