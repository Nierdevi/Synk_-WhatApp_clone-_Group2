import React, { useEffect, useState } from "react";
import {
Alert,
FlatList,
Modal,
Pressable,
StyleSheet,
Text,
TextInput,
TouchableOpacity,
View,
} from "react-native";
import {
heightPercentageToDP as hp,
widthPercentageToDP as wp,
} from "react-native-responsive-screen";
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

const [profilePicture, setProfilePicture] = useState(require('../assets/Avator.jpg'));

useEffect(() => {
    const fetchProfilePicture = async () => {
    if (contact) {
        try {
        const response = await databases.listDocuments(
            "6685cbc40036f4c6a5ad",
            "6685cc6600212adefdbf",
            [Query.equal("phoneNumber", contact.normalizedPhoneNumbers[0])]
        );

        if (response.documents.length > 0) {
            const profilePictureUrl = response.documents[0].profilePicture;
            setProfilePicture(profilePictureUrl);

        userInfo=response.documents[0]

        return userInfo
        }
        } catch (error) {
        console.error("Failed to fetch profile picture:", error);
        }
    }
    };

    fetchProfilePicture();
}, [contact]);

if (!contact) return null;


return (
    <TouchableOpacity
    style={styles.contactItem}
    onPress={() =>
        navigation.navigate("ChatRoom", {
        contact,
        currentUserPhoneNumber: session.phoneNumber,
        profilePicture
        })
    }
    >
    <Image
        source={profilePicture ? { uri: profilePicture } :  require('../assets/Avator.jpg')} 
        style={styles.profilePicture}
        cachePolicy="disk"
    />
    <View style={styles.contactDetails}>
        <View style={styles.upperContactdetails}>
        <Text style={styles.contactName}>{contact.name} </Text>
        {item.lastMessage && (
            <Text style={styles.lastMessageTime}>{DateTime(item.lastMessage.$createdAt)}</Text>
        )}
        </View>
        {item.lastMessage && (
        <Text
            style={styles.lastMessageText}
            numberOfLines={1}
            ellipsizeMode="tail"
        >
            {item.lastMessage.messageText}
        </Text>
        )}
    </View>
    </TouchableOpacity>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    // backgroundColor: 'red',
    width: wp("100%"),
    // paddingHorizontal:10,
    marginTop: 20,
},
contactItem: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    // backgroundColor:'yellow',
},
contactDetails: {
    justifyContent: "center",
    gap: 5,
},
upperContactdetails: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
},
contactName: {
    fontSize: hp("2.5%"),
},
lastMessageText: {
    fontSize: hp("2%"),
    color: "gray",
    width: wp("70%"),
},
lastMessageTime:{
    width:wp('10%')
},
contactItem: {
    padding: 10,
    width: wp("100%"),
    flexDirection: "row",
},
contactName: {
    fontSize: 18,
},
profilePicture: {
    width: wp("14%"),
    height: hp("6.5%"),
    borderRadius: 50,
    marginRight: 10,
},
});

export default RenderMessagedContactItem;
