import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatuses } from '../backend/statusService';
import { useContacts } from '../backend/contacts ';
import { getUser } from '../constants/userContext';

const StatusList = () => {
  const [statuses, setStatuses] = useState([]);
  const { session } = getUser();
  const contacts =useContacts(session)

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const allStatuses = await getStatuses();

        const normalizedPhoneNumbers = contacts.flatMap(contact =>
          Array.isArray(contact.normalizedPhoneNumbers) ? contact.normalizedPhoneNumbers : []
        );

        const filteredStatuses = allStatuses.filter(status =>
          status.phoneNumber && normalizedPhoneNumbers.includes(status.phoneNumber)
        );

        const statusesCount = filteredStatuses.reduce((acc, status) => {
          acc[status.phoneNumber] = (acc[status.phoneNumber] || 0) + 1;
          return acc;
        }, {});

        const statusesWithCount = filteredStatuses.map(status => ({
          ...status,
          count: statusesCount[status.phoneNumber],
        }));

        setStatuses(statusesWithCount);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    if (contacts.length > 0) {
      fetchStatuses();
    }
  }, [contacts]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.mediaUrl }} style={styles.thumbnail} />
      <Text style={styles.phoneNumber}>{item.currentUserPhoneNumber}</Text>
      <Text style={styles.statusCount}>{item.count} statuses</Text>
      <View style={[styles.stroke, { width: item.count * 10 }]} />
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
    alignItems: 'center',
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
  statusCount: {
    textAlign: 'center',
    marginTop: 5,
    color: 'gray',
  },
  stroke: {
    height: 2,
    backgroundColor: 'blue',
    marginTop: 5,
  },
});

export default StatusList;
