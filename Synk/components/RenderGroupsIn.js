import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet,} from 'react-native';
import { Image } from 'expo-image';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DateTime from './DateTime';
import { fetchUserGroups } from '../backend/groupServices';

const RenderGroupsIn = ({ navigation, session }) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const loadUserGroups = async () => {
        const userGroups = await fetchUserGroups(session.phoneNumber);
        setGroups(userGroups);
        console.log("user group info: ",userGroups[0])
        };
        loadUserGroups();
    }, [session.phoneNumber]);

    const renderGroupItem = ({ item }) => {
        const displayName = item.groupName || "Group Chat";
        const lastMessage = item.lastMessage || {};
        const profilePicture = item.groupPicUrl || require('../assets/Avator.jpg');

        return (
        <TouchableOpacity
            style={styles.contactItem}
            onPress={() =>
            navigation.navigate("GroupRoom", {
                contact: { name: displayName, normalizedPhoneNumbers: item.participants },
                currentUserPhoneNumber: session.phoneNumber,
                profilePicture: profilePicture
            })
            }
        >
            <Image
            source={profilePicture ? { uri: profilePicture } : require('../assets/Avator.jpg')}
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
            {lastMessage.messageText && (
                <Text
                style={styles.lastMessageText}
                numberOfLines={1}
                ellipsizeMode="tail"
                >
                {lastMessage.messageText}
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
        width: wp('100%')
    },
    contactDetails: {
        justifyContent: "center",
        gap: 5,
    },
    upperContactdetails: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: wp('80%')
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
        width: wp('10%')
    },
    profilePicture: {
        width: wp("14%"),
        height: hp("6.5%"),
        borderRadius: 50,
        marginRight: 10,
    },
    });

export default RenderGroupsIn;
