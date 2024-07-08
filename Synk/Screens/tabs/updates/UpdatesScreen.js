// src/screens/UpdatesScreen.js
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Fab from '../../../components/fab'; // Adjust the import path as needed

const statuses = [
    { id: 1, user: 'Alice', time: 'Today, 8:45 AM', img: 'https://via.placeholder.com/50' },
    { id: 2, user: 'Bob', time: 'Today, 9:15 AM', img: 'https://via.placeholder.com/50' }
];

const channels = [
    { id: 1, name: 'News Channel', description: 'Latest news updates' },
    { id: 2, name: 'Sports Channel', description: 'Live sports updates' }
];

export default function UpdatesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.title}>Status</Text>
                    {statuses.map(status => (
                        <View key={status.id} style={styles.listItem}>
                            <Image source={{ uri: status.img }} style={styles.statusImg} />
                            <View style={styles.statusInfo}>
                                <Text style={styles.statusUser}>{status.user}</Text>
                                <Text style={styles.statusTime}>{status.time}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Channels</Text>
                    {channels.map(channel => (
                        <View key={channel.id} style={styles.listItem}>
                            <View style={styles.channelInfo}>
                                <Text style={styles.channelName}>{channel.name}</Text>
                                <Text style={styles.channelDescription}>{channel.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Fab />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    section: {
        padding: 20
    },
    title: {
        marginBottom: 10,
        color: '#555',
        fontSize: 18,
        fontWeight: 'bold'
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2
    },
    statusImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    statusInfo: {
        flexDirection: 'column'
    },
    statusUser: {
        fontWeight: 'bold'
    },
    statusTime: {
        color: '#888'
    },
    channelInfo: {
        flexDirection: 'column'
    },
    channelName: {
        fontWeight: 'bold'
    },
    channelDescription: {
        color: '#888'
    }
});
