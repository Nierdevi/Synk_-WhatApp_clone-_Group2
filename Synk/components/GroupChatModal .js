import React, { useState, useEffect } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements'; // Ensure you have installed this package
import { databases } from '../backend/appwrite';
import { getUser } from '../constants/userContext';
import { useContacts } from '../backend/contacts ';


const GroupChatModal = ({ visible, onClose, onCreateGroup ,close}) => {
  const { session } = getUser();
  const contacts = useContacts(session); // Fetch contacts
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await databases.listDocuments('6685cbc40036f4c6a5ad', '6685cc6600212adefdbf');
        const appUsers = response.documents;
        console.log("contacts in app: ", appUsers);

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

  const handleCreateGroup = () => {
    const selectedPhoneNumbers = selectedContacts.map(contactId => {
      const contact = filteredContacts.find(c => c.id === contactId);
      return contact ? contact.normalizedPhoneNumbers[0] : null;
    }).filter(Boolean);

    onCreateGroup(groupName, selectedPhoneNumbers);
    console.log("setected phoneNumber: ",selectedContacts)
    onClose();
  };

  console.log("setected phoneNumber: ",selectedContacts)

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
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Group</Text>
        <TextInput
          style={styles.groupNameInput}
          placeholder="Group Name"
          value={groupName}
          onChangeText={setGroupName}
        />
        <Text>Selected {selectedContacts.length}</Text>
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
  groupNameInput: {
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
