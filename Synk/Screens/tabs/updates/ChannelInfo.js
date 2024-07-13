import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColors } from '../../../constants/colors';

const ChannelInfo = ({ route }) => {
    const { channel } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: channel.img }} style={styles.channelImg} />
            <View style={styles.channelDetails}>
                <Text style={styles.channelName}>{channel.name}</Text>
                {channel.verified && (
                    <Ionicons name="checkmark-circle" size={16} color="blue" style={styles.verifiedBadge} />
                )}
                <Text style={styles.followersCount}>{channel.followers} followers</Text>
                <Text style={styles.channelDescription}>{channel.description}</Text>
            </View>
            <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactText}>Contact</Text>
            </TouchableOpacity>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Report</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Block</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    channelImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    channelDetails: {
        alignItems: 'center',
        marginBottom: 20,
    },
    channelName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    verifiedBadge: {
        marginLeft: 5,
    },
    followersCount: {
        fontSize: 16,
        color: '#555',
        marginTop: 2,
    },
    channelDescription: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginVertical: 10,
    },
    contactButton: {
        backgroundColor: primaryColors.purple,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    contactText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    menuItem: {
        padding: 10,
    },
    menuText: {
        color: primaryColors.purple,
    },
});

export default ChannelInfo;
