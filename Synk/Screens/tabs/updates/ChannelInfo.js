import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColors } from '../../../constants/colors';

const ChannelInfo = ({ route }) => {
    const { channel } = route.params;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch channel posts (mocked for now)
        const fetchPosts = async () => {
            // Simulate fetching posts for the channel
            const fetchedPosts = [
                { id: 1, title: 'Breaking News', time: '2024-07-01', image: 'https://via.placeholder.com/150' },
                { id: 2, title: 'Latest Updates', time: '2024-07-02', image: 'https://via.placeholder.com/150' },
            ];
            setPosts(fetchedPosts);
        };

        fetchPosts();
    }, []);

    const handleContact = () => {
        // Implement contact logic, e.g., open a chat
        Linking.openURL(`https://wa.me/${channel.contactNumber}`);
    };

    const renderPost = ({ item }) => (
        <View style={styles.postItem}>
            <Image source={{ uri: item.image }} style={styles.postImage} />
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postTime}>{moment(item.time).fromNow()}</Text>
        </View>
    );

    return (
        <Provider>
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
                <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
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
                <FlatList
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={item => item.id.toString()}
                    style={styles.postsList}
                    contentContainerStyle={styles.postsContainer}
                />
            </View>
        </Provider>
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
    postsList: {
        width: '100%',
        marginTop: 20,
    },
    postsContainer: {
        paddingBottom: 20,
    },
    postItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    postImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    postTime: {
        fontSize: 12,
        color: '#888',
    },
});

export default ChannelInfo;
