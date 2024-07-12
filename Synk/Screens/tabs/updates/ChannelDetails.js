import React, { useState } from 'react';
import { Button, Image, ScrollView, Share, StyleSheet, Text, View } from 'react-native';

const ChannelDetails = ({ route }) => {
    const { channel } = route.params;
    const [isFollowing, setIsFollowing] = useState(channel.isFollowing);

    const handleFollowToggle = () => {
        // Implement the follow/unfollow logic here
        setIsFollowing(!isFollowing);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this channel: ${channel.name}`,
                url: channel.link,
            });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: channel.img }} style={styles.channelImg} />
                <Text style={styles.channelName}>{channel.name}</Text>
                <Text style={styles.channelDescription}>{channel.description}</Text>
                <View style={styles.channelMeta}>
                    <Text style={styles.channelTime}>{channel.time}</Text>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{channel.unread}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={isFollowing ? "Unfollow" : "Follow"} onPress={handleFollowToggle} />
                    <Button title="Share" onPress={handleShare} />
                </View>
            </View>
            <View style={styles.updates}>
                <Text style={styles.updatesTitle}>Recent Updates</Text>
                {channel.updates.map((update, index) => (
                    <View key={index} style={styles.update}>
                        <Text style={styles.updateText}>{update.text}</Text>
                        {update.image && <Image source={{ uri: update.image }} style={styles.updateImage} />}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        alignItems: 'center',
    },
    channelImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    channelName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    channelDescription: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
        textAlign: 'center',
    },
    channelMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    channelTime: {
        fontSize: 14,
        color: '#888',
        marginRight: 10,
    },
    unreadBadge: {
        backgroundColor: 'purple',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    unreadText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
    },
    updates: {
        marginTop: 30,
    },
    updatesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    update: {
        marginBottom: 20,
    },
    updateText: {
        fontSize: 16,
        marginBottom: 10,
    },
    updateImage: {
        width: '100%',
        height: 200,
    },
});

export default ChannelDetails;
