import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DateTime from './DateTime';
import { fetchUserGroupsWithLastMessages } from '../backend/groupServices';
import { Ionicons } from '@expo/vector-icons';
// import { subscribeToGroupMessages } from '../backend/realTimeServices'; // Ensure correct import
import { useIsFocused } from '@react-navigation/native';
import { subscribeToGroupMessages } from '../backend/realtimeService';


const RenderGroupsIn = ({ navigation, session }) => {
  const [groups, setGroups] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadUserGroups = async () => {
      const userGroups = await fetchUserGroupsWithLastMessages(session.phoneNumber);
      setGroups(userGroups);

      // Subscribe to each group's messages
      userGroups.forEach(group => {
        subscribeToGroupMessages(group.groupId, newMessage => {
          handleNewMessage(newMessage);
        });
      });
    };


      loadUserGroups();
      const intervalId = setInterval(loadUserGroups, 3000); // 1000ms = 1 seconds

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
  }, [session.phoneNumber, isFocused]);

  const handleNewMessage = (newMessage) => {
    console.log('New message received:', newMessage); // Debugging line
    setGroups(prevGroups => {
      const updatedGroups = prevGroups.map(group => {
        if (group.groupId === newMessage.groupId) {
          return { ...group, lastMessage: newMessage };
        }
        return group;
      });

      // Re-sort groups by the latest message time
      updatedGroups.sort((a, b) => {
        const aTime = a.lastMessage?.createdAt || 0;
        const bTime = b.lastMessage?.createdAt || 0;
        return new Date(bTime) - new Date(aTime);
      });

      return updatedGroups;
    });
  };

  const renderLastMessage = (lastMessage) => {
    if (!lastMessage) return null;

    const isCurrentUser = lastMessage.senderId === session.phoneNumber;
    const prefix = isCurrentUser ? "You: " : "";

    switch (lastMessage.type) {
      case 'text':
        return `${prefix}${lastMessage.messageText}`;
      case 'image':
        return (
          <View style={styles.mediaContainer}>
            <Text style={{fontSize: wp("4%"),color:'gray'}}>{prefix}Image </Text>
            <Ionicons name="image-outline" size={20} color="gray" />
          </View>
        );
      case 'video':
        return (
          <View style={styles.mediaContainer}>
            <Text  style={{fontSize: wp("4%"),color:'gray'}}>{prefix}Video </Text>
            <Ionicons name="videocam-outline" size={20} color="gray" />
          </View>
        );
      default:
        return null;
    }
  };

  const renderGroupItem = ({ item }) => {
    const displayName = item.groupName || "Group Chat";
    const lastMessage = item.lastMessage || {};
    const profilePicture = item.groupPicUrl || require('../assets/Grp.jpg');

    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() =>
          navigation.navigate("GroupRoom", {
            groupData: item,
            groupId: item.groupId,
            participants: item.participants,
            currentUserPhoneNumber: session.phoneNumber,
            profilePicture: profilePicture,
          })
        }
      >
        <Image
          source={profilePicture}
          style={styles.profilePicture}
          cachePolicy="disk"
        />
        <View style={styles.contactDetails}>
          <View style={styles.upperContactdetails}>
            <Text style={styles.contactName} ellipsizeMode='tail' numberOfLines={1}>{displayName} </Text>
            {lastMessage.createdAt && (
              <Text style={styles.lastMessageTime}>{DateTime(lastMessage.createdAt)} </Text>
            )}
          </View>
          {lastMessage && (
            <Text
              style={styles.lastMessageText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {renderLastMessage(lastMessage)} 
              </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.$id}
        renderItem={renderGroupItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("100%"),
    marginTop: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    width: wp('100%'),
    padding: 10,
  },
  contactDetails: {
    flex: 1,
    justifyContent: "center",
    gap: 5,
  },
  upperContactdetails: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: wp('80%'),
  },
  contactName: {
    fontSize: hp("2.5%"),
  },
  lastMessageText: {
    fontSize: hp("2%"),
    color: "gray",
    width: wp("70%"),
  },
  lastMessageTime: {
    width: wp('10%'),
  },
  profilePicture: {
    width: wp("14%"),
    height: hp("6.5%"),
    borderRadius: 50,
    marginRight: 10,
  },
  mediaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RenderGroupsIn;
