import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { primaryColors } from '../../../constants/colors';

const ExploreMore = ({ route }) => {
    const { channels } = route.params;
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Fetch articles or updates for the channels
        // This is a placeholder for your data fetching logic
        const fetchArticles = async () => {
            try {
                const response = await fetch(`https://api.example.com/channels/${channels.id}/articles`);
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, [channels.id]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: channels.img }} style={styles.channelsImg} />
                <View style={styles.channelsInfo}>
                    <Text style={styles.channelsName}>{channels.name}</Text>
                    {channels.verified && (
                        <Ionicons name="checkmark-circle" size={16} color="blue" style={styles.verifiedBadge} />
                    )}
                    <Text style={styles.followersCount}>{channels.followers} followers</Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.description}>{channels.description}</Text>

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

            <Text style={styles.sectionTitle}>Related channelss</Text>
            {/* Implement a list of related channelss */}
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
    channelsImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    channelsInfo: {
        flex: 1,
        marginLeft: 10,
    },
    channelsName: {
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
