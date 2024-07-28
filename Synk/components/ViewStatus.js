import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Video } from 'expo-av';
import { getStatusesByPhoneNumber } from '../backend/statusService';


const ViewStatus = ({ route }) => {
  const { userData } = route.params;
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const statuses = await getStatusesByPhoneNumber(userData.phoneNumber);
        setStatuses(statuses);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, [userData.phoneNumber]);

  const renderItem = ({ item }) => (
    <View style={styles.statusContainer}>
      {item.mediaType === 'image' ? (
        <Image source={{ uri: item.mediaUrl }} style={styles.media} />
      ) : (
        <Video
          source={{ uri: item.mediaUrl }}
          style={styles.media}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay
        />
      )}
      <Text style={styles.caption}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.timestamp}>{statuses.length > 0 && new Date(statuses[0].createdAt).toLocaleString()}</Text>
      </View>
      <View style={styles.statusLineContainer}>
        {statuses.map((status, index) => (
          <View key={index} style={styles.statusSegment} />
        ))}
      </View>
      <FlatList
        data={statuses}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id}
        horizontal
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 'auto',
  },
  statusLineContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  statusSegment: {
    flex: 1,
    height: 2,
    backgroundColor: 'gray',
    marginHorizontal: 1,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80%',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  caption: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});

export default ViewStatus;
