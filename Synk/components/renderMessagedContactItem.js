import React, { useEffect, useState } from "react";
import {StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {heightPercentageToDP as hp,widthPercentageToDP as wp,} from "react-native-responsive-screen";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { primaryColors } from "../constants/colors";
import DateTime from "./DateTime";
import { databases } from "../backend/appwrite";
import { Query } from "appwrite";

const RenderMessagedContactItem = ({ item, contacts, navigation, session }) => {
  const contact = contacts.find((contact) =>
    contact.normalizedPhoneNumbers?.includes(item.contactPhoneNumber)
  );

  const [profilePicture, setProfilePicture] = useState(require("../assets/Avator.jpg"));

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (contact) {
        try {
          const response = await databases.listDocuments(
            "database_id",
            "users",
            [Query.equal("phoneNumber", contact.normalizedPhoneNumbers[0])]
          );

          if (response.documents.length > 0) {
            const profilePictureUrl = response.documents[0].profilePicture;
            setProfilePicture(profilePictureUrl);

            const userInfo = response.documents[0];

            return userInfo;
          }
        } catch (error) {
          console.error("Failed to fetch profile picture:", error);
        }
      }
    };

    fetchProfilePicture();
  }, [contact]);

  if (!contact) return null;

  const renderLastMessage = () => {
    if (!item.lastMessage) return null;

    const isCurrentUser = item.lastMessage.senderId === session.phoneNumber;
    const prefix = isCurrentUser ? "You: " : "";

    if (item.lastMessage.type === "text") {
      return `${prefix}${item.lastMessage.messageText}`;
    } else if (item.lastMessage.type === "image") {
      return (
        <View style={styles.mediaContainer}>
          <Text style={{fontSize: wp("4%"),color:'gray'}}>{prefix}Image </Text>
          <Ionicons name="image-outline" size={20} color="gray" />
        </View>
      );
    } 
    else if (item.lastMessage.type === "video") {
      return (
        <View style={styles.mediaContainer}>
          <Text style={{fontSize: wp("4%"),color:'gray'}}>{prefix}Video </Text>
          <Ionicons name="videocam-outline" size={20} color="gray" />
        </View>
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() =>
        navigation.navigate("ChatRoom", {
          contact,
          currentUserPhoneNumber: session.phoneNumber,
          profilePicture,
        })
      }
    >
      <Image
        source={
          profilePicture
            ? { uri: profilePicture }
            : require("../assets/Avator.jpg")
        }
        style={styles.profilePicture}
        cachePolicy="disk"
      />
      <View style={styles.contactDetails}>
        <View style={styles.upperContactdetails}>
          <Text style={styles.contactName} ellipsizeMode='tail' numberOfLines={1}>{contact.name} </Text>
          {item.lastMessage && (
            <Text style={styles.lastMessageTime}>
              {DateTime(item.lastMessage.$createdAt)}
            </Text>
          )}
        </View>
        {item.lastMessage && (
          <Text
            style={styles.lastMessageText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {renderLastMessage()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
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
    width: wp("100%"),
    paddingHorizontal:15,
    marginBottom:15,
    
  },
  contactDetails: {
    justifyContent: "center",
    gap: 5,
  },
  upperContactdetails: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: wp("80%"),
  },
  contactName: {
    fontSize: hp("2.5%"),
  },
  lastMessageText: {
    fontSize: wp("4%"),
    color: "gray",
    width: wp("70%"),
  },
  lastMessageTime: {
    width: wp("10%"),
    right: 10,
  },
  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginRight: 10,
  },
  mediaContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontSize:10,
  },
  mediaIcon: {
    marginLeft: 5,
  },
});

export default RenderMessagedContactItem;
