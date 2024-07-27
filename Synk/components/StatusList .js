import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useContacts } from '../backend/contacts ';
import { getUser } from '../constants/userContext';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../backend/userService';
import { primaryColors } from '../constants/colors';
import { getStatuses } from '../backend/statusService';
import { client } from '../backend/appwrite';

const StatusList = () => {
  const [statuses, setStatuses] = useState([]);
  const { session } = getUser();
  const contacts = useContacts(session);
  const navigation = useNavigation();

  const fetchStatuses = useCallback(async () => {
    try {
      const allStatuses = await getStatuses();
      const normalizedPhoneNumbers = contacts.flatMap(contact =>
        Array.isArray(contact.normalizedPhoneNumbers) ? contact.normalizedPhoneNumbers : []
      );

      const filteredStatuses = allStatuses.filter(status =>
        status.phoneNumber && normalizedPhoneNumbers.includes(status.phoneNumber)
      );

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
  }, [contacts]);

  useEffect(() => {
    fetchStatuses();
  }, [contacts, fetchStatuses]);

  useEffect(() => {
    const subscribeToStatuses = (callback) => {
      client.subscribe('databases.database_id.collections.status.documents.*', response => {
        callback(response.payload);
      });
    };

    const handleUpdate = (updatedStatus) => {
      setStatuses(prevStatuses => {
        const phoneNumber = updatedStatus.phoneNumber;
        const updatedStatuses = prevStatuses.reduce((acc, statusGroup) => {
          if (statusGroup.userData.phoneNumber === phoneNumber) {
            statusGroup.statuses = statusGroup.statuses.filter(status => status.$id !== updatedStatus.$id);
            statusGroup.statuses.push(updatedStatus);
            acc.push(statusGroup);
          } else {
            acc.push(statusGroup);
          }
          return acc;
        }, []);

        updatedStatuses.sort((a, b) => b.statuses[0].createdAt.localeCompare(a.statuses[0].createdAt));

        return updatedStatuses;
      });
    };

    subscribeToStatuses(handleUpdate);

    return () => {
      // Unsubscribe if needed
    };
  }, []);

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
    const profilePicture = userData.profilePicture ? { uri: userData.profilePicture } : require('../assets/Avator.jpg');

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ViewStatus', { statuses })}
      >
        <View style={styles.thumbnailContainer}>
          <Image source={profilePicture} style={styles.thumbnail} />
          {statuses.length > 1 && (
            <View style={styles.statusCountContainer}>
              <Text style={styles.statusCountText}>{statuses.length}</Text>
            </View>
          )}
        </View>
        <Text style={styles.contactName}>{contactName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={statuses}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.userData.phoneNumber + '-' + index}
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
    marginRight:10
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusCountContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: primaryColors.purple,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:4
  },
  statusCountText: {
    color: 'white',
    fontSize: 12,
  },
  contactName: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default StatusList;
