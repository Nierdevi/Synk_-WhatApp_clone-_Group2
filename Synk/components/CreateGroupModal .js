import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, CheckBox, TextInput } from 'react-native';
import { getContactsFromDatabase } from './contactService'; // Create this function to fetch contacts
import { createChat } from './chatService'; // Ensure to import the modified createChat function

const CreateGroupModal = ({ visible, onClose, currentUserPhoneNumber }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      const fetchedContacts = await getContactsFromDatabase();
      setContacts(fetchedContacts);
    };
    fetchContacts();
  }, []);

  const handleSelectContact = (userId) => {
    if (selectedContacts.includes(userId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== userId));
    } else {
      setSelectedContacts([...selectedContacts, userId]);
    }
  };

  const handleCreateGroup = async () => {
    await createChat(currentUserPhoneNumber, selectedContacts, true, groupName, '', description);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
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
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.contactItem}>
                <Text>{item.name}</Text>
                <CheckBox
                  value={selectedContacts.includes(item.id)}
                  onValueChange={() => handleSelectContact(item.id)}
                />
              </View>
            )}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateGroup} style={styles.button}>
              <Text>Create Group</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
});

export default CreateGroupModal;
