import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { getStatuses } from '../backend/statusService';
import { useContacts } from '../backend/contacts ';
import { getUser } from '../constants/userContext';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../backend/userService';
import SegmentedBorder from './SegmentedBorder';


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
          return { ...status, userData };
        });

        const statusesWithUserData = await Promise.all(userDataPromises);

        const groupedStatuses = statusesWithUserData.reduce((acc, status) => {
          const phoneNumber = status.phoneNumber;
          if (!acc[phoneNumber]) {
            acc[phoneNumber] = {
              userData: status.userData,
              statuses: []
            };
          }
          acc[phoneNumber].statuses.push(status);
          return acc;
        }, {});

        setStatuses(Object.values(groupedStatuses));
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    console.log("statuses: ",statuses)

    if (contacts.length > 0) {
      fetchStatuses();
    }
  }, [contacts]);

  const contactNameMap = contacts.reduce((acc, contact) => {
    if (Array.isArray(contact.normalizedPhoneNumbers)) {
      contact.normalizedPhoneNumbers.forEach(phoneNumber => {
        acc[phoneNumber] = contact.name;
      });
    }
    return acc;
  }, {});

  const renderItem = ({ item }) => {
    const { userData, statuses } = item;
    const contactName = contactNameMap[userData.phoneNumber] || userData.phoneNumber;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ViewStatus', { status: item })}
      >
      <SegmentedBorder segments={statuses.length} >
        <Image
          source={userData && userData.profilePicture ? { uri: userData.profilePicture } : require('../assets/Avator.jpg')}
          style={styles.thumbnail}
        />
        </SegmentedBorder>
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
