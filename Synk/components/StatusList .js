import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatuses } from '../backend/statusService';
import { useContacts } from '../backend/contacts ';
import { getUser } from '../constants/userContext';

const StatusList = () => {
  const [statuses, setStatuses] = useState([]);
  const { session } = getUser();
  const contacts = useContacts(session);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        // Fetch all statuses
        const allStatuses = await getStatuses();

        // Filter statuses based on normalized phone numbers in contacts
        const normalizedPhoneNumbers = contacts
          .flatMap(contact => contact.normalizedPhoneNumbers[0] || []);
        
        const filteredStatuses = allStatuses.filter(status =>
          normalizedPhoneNumbers.includes(status.phoneNumber)
        );

        setStatuses(filteredStatuses);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, [contacts]);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <Image source={{ uri: item.mediaUrl }} style={styles.thumbnail} />
      <Text style={styles.phoneNumber}>{item.currentUserPhoneNumber}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={statuses}
      renderItem={renderItem}
      keyExtractor={item => item.$id}
      horizontal
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
  },
  itemContainer: {
    marginHorizontal: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  phoneNumber: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default StatusList;
