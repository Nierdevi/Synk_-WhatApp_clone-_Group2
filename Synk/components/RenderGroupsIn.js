import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DateTime from './DateTime';
import { fetchUserGroups } from '../backend/groupServices';
import { Ionicons } from '@expo/vector-icons';

const RenderGroupsIn = ({ navigation, session }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const loadUserGroups = async () => {
      const userGroups = await fetchUserGroups(session.phoneNumber);
      setGroups(userGroups);
    };
    loadUserGroups();
  }, [session.phoneNumber]);

  const renderLastMessage = (lastMessage) => {
    if (!lastMessage) return null;

    const isCurrentUser = lastMessage.senderId === session.phoneNumber;
    const prefix = isCurrentUser ? "you: " : "";

    if (lastMessage.type === "text") {
      return `${prefix}${lastMessage.messageText}`;
    } else if (lastMessage.type === "image") {
      return (
        <View style={styles.mediaContainer}>
          <Text>{prefix}Image</Text>
          <Ionicons name="image-outline" size={20} color="gray" />
        </View>
      );
    } else if (lastMessage.type === "video") {
      return (
        <View style={styles.mediaContainer}>
          <Text>{prefix}Video</Text>
          <Ionicons name="videocam-outline" size={20} color="gray" />
        </View>
      );
    }

    return null;
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
            <Text style={styles.contactName}>{displayName}</Text>
            {lastMessage.createdAt && (
              <Text style={styles.lastMessageTime}>{DateTime(lastMessage.createdAt)}</Text>
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
