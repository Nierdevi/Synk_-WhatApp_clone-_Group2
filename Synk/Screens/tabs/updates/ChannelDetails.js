import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ChannelDetails = ({ route }) => {
    const { channel } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: channel.img }} style={styles.channelImg} />
            <Text style={styles.channelName}>{channel.name}</Text>
            <Text style={styles.channelDescription}>{channel.description}</Text>
            <View style={styles.channelMeta}>
                <Text style={styles.channelTime}>{channel.time}</Text>
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{channel.unread}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    channelImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
    },
    channelName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    channelDescription: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10
    },
    channelMeta: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    channelTime: {
        fontSize: 14,
        color: '#888',
        marginRight: 10
    },
    unreadBadge: {
        backgroundColor: 'purple',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    unreadText: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default ChannelDetails;
