import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icons
import Fab from '../../../components/fab'; // Adjust the import path as needed

const statuses = [
    { id: 1, user: 'Alice', img: 'https://via.placeholder.com/50', total: 3, viewed: 1 },
    { id: 2, user: 'Bob', img: 'https://via.placeholder.com/50', total: 2, viewed: 1 }
];

const channels = [
    { 
        id: 1, 
        name: 'News Channel', 
        description: 'Latest news updates', 
        img: 'https://via.placeholder.com/50', 
        time: '2h ago', 
        unread: 3 
    },
    { 
        id: 2, 
        name: 'Sports Channel', 
        description: 'Live sports updates', 
        img: 'https://via.placeholder.com/50', 
        time: '1h ago', 
        unread: 5 
    }
];

const DefaultProfileImg = () => (
    <View style={styles.statusContainer}>
        <View style={styles.statusWrapperDefault}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.statusImg} />
            <View style={styles.plusSign}>
                <Text style={styles.plusText}>+</Text>
            </View>
            <View style={styles.pencilIcon}>
                <Ionicons name="pencil" size={16} color="#fff" />
            </View>
        </View>
        <Text style={styles.statusUser}>My Status</Text>
    </View>
);

export default function UpdatesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.title}>Status</Text>
                    <FlatList
                        horizontal
                        data={[{ id: 'default', user: 'My Status', img: 'https://via.placeholder.com/50' }, ...statuses]}
                        renderItem={({ item }) => (
                            item.id === 'default' ? (
                                <DefaultProfileImg />
                            ) : (
                                <View key={item.id} style={styles.statusContainer}>
                                    <View style={[
                                        styles.statusWrapper, 
                                        { borderColor: item.viewed < item.total ? 'purple' : '#ccc' }
                                    ]}>
                                        <Image source={{ uri: item.img }} style={styles.statusImg} />
                                    </View>
                                    <Text style={styles.statusUser}>{item.user}</Text>
                                </View>
                            )
                        )}
                        keyExtractor={item => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.section}>
                    <View style={styles.channelsHeader}>
                        <Text style={styles.title}>Channels</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                            <Text style={styles.exploreText}>Explore &gt;</Text>
                        </TouchableOpacity>
                    </View>
                    {channels.map(channel => (
                        <View key={channel.id} style={styles.listItem}>
                            <Image source={{ uri: channel.img }} style={styles.channelImg} />
                            <View style={styles.channelInfo}>
                                <Text style={styles.channelName}>{channel.name}</Text>
                                <Text style={styles.channelDescription}>{channel.description}</Text>
                            </View>
                            <View style={styles.channelMeta}>
                                <Text style={styles.channelTime}>{channel.time}</Text>
                                <View style={styles.unreadBadge}>
                                    <Text style={styles.unreadText}>{channel.unread}</Text>
                                </View>
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
    channelsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    exploreText: {
        color: 'purple',
        fontSize: 16,
        fontWeight: 'bold'
    },
    statusContainer: {
        alignItems: 'center',
        marginRight: 15
    },
    statusWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    statusWrapperDefault: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    plusSign: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'purple',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    plusText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    pencilIcon: {
        position: 'absolute',
        bottom: 0,
        right: 30,
        backgroundColor: 'purple',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    statusImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        zIndex: 2
    },
    statusUser: {
        marginTop: 5,
        textAlign: 'center',
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
    channelImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    channelInfo: {
        flex: 1,
        flexDirection: 'column'
    },
    channelName: {
        fontWeight: 'bold'
    },
    channelDescription: {
        color: '#888'
    },
    channelMeta: {
        alignItems: 'flex-end'
    },
    channelTime: {
        fontSize: 12,
        color: '#888'
    },
    unreadBadge: {
        backgroundColor: 'purple',
        borderRadius: 12,
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginTop: 2
    },
    unreadText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    }
});
