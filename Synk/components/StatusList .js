import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { getStatuses } from '../backend/statusService';
import { useContacts } from '../backend/contacts ';
import { getUser } from '../constants/userContext';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../backend/userService';

const StatusList = () => {
  const [statuses, setStatuses] = useState([]);
  const { session } = getUser();
  const contacts = useContacts(session);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        // Fetch all statuses
        const allStatuses = await getStatuses();
        console.log('All statuses fetched:', allStatuses);

        // Extract normalized phone numbers from contacts
        const normalizedPhoneNumbers = contacts.flatMap(contact =>
          Array.isArray(contact.normalizedPhoneNumbers) ? contact.normalizedPhoneNumbers : []
        );

        // console.log('Normalized phone numbers:', normalizedPhoneNumbers);

        // Filter statuses to include only those from contacts
        const filteredStatuses = allStatuses.filter(status =>
          status.phoneNumber && normalizedPhoneNumbers.includes(status.phoneNumber)
        );

        console.log('Filtered statuses:', filteredStatuses);

        // Fetch user data for each status
        const userDataPromises = filteredStatuses.map(async status => {
          const userData = await getUserData(status.phoneNumber);
          console.log('User data fetched:', userData);
          const contact = contacts.find(contact =>
            Array.isArray(contact.normalizedPhoneNumbers) && contact.normalizedPhoneNumbers.includes(status.phoneNumber)
          );
          return { ...status, userData, contactName: contact ? contact.name : null };
        });

        // Wait for all user data promises to resolve
        const statusesWithUserData = await Promise.all(userDataPromises);
        console.log('Statuses with user data:', statusesWithUserData);
        setStatuses(statusesWithUserData);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    if (contacts.length > 0) {
      fetchStatuses();
    }
  }, [contacts]);

  const renderItem = ({ item }) => {
    const { userData, contactName } = item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ViewStatus', { status: item })}
      >
        <Image
          source={userData && userData.profilePicture ? { uri: userData.profilePicture } : require('../assets/Avator.jpg')}
          style={styles.thumbnail}
        />
        <Text style={styles.phoneNumber}>{contactName } </Text>
      </TouchableOpacity>
    );
  };

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
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  phoneNumber: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default StatusList;
