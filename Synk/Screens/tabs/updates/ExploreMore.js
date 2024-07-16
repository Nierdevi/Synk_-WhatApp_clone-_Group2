import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColors } from '../../../constants/colors';

const ExploreMore = ({ route }) => {
    const { channel } = route.params;
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Fetch articles or updates for the channel
        // This is a placeholder for your data fetching logic
        const fetchArticles = async () => {
            try {
                const response = await fetch(`https://api.example.com/channel/${channel.id}/articles`);
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, [channel.id]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: channel.img }} style={styles.channelImg} />
                <View style={styles.channelInfo}>
                    <Text style={styles.channelName}>{channel.name}</Text>
                    {channel.verified && (
                        <Ionicons name="checkmark-circle" size={16} color="blue" style={styles.verifiedBadge} />
                    )}
                    <Text style={styles.followersCount}>{channel.followers} followers</Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.description}>{channel.description}</Text>

            <Text style={styles.sectionTitle}>Latest Updates</Text>
            <FlatList
                data={articles}
                renderItem={({ item }) => (
                    <View style={styles.articleContainer}>
                        {item.image && <Image source={{ uri: item.image }} style={styles.articleImage} />}
                        <Text style={styles.articleTitle}>{item.title}</Text>
                        <Text style={styles.articleDescription}>{item.description}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />

            <Text style={styles.sectionTitle}>Related Channels</Text>
            {/* Implement a list of related channels */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    channelImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    channelInfo: {
        flex: 1,
        marginLeft: 10,
    },
    channelName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    verifiedBadge: {
        marginLeft: 5,
    },
    followersCount: {
        fontSize: 14,
        color: '#555',
    },
    followButton: {
        backgroundColor: primaryColors.purple,
        padding: 10,
        borderRadius: 5,
    },
    followButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    articleContainer: {
        marginBottom: 20,
    },
    articleImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    articleDescription: {
        fontSize: 14,
        color: '#555',
    },
});

export default ExploreMore;
