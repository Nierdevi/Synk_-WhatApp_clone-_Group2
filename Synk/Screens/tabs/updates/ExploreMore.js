import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { primaryColors } from '../../../constants/colors';

const ExploreMore = ({ route, navigation }) => {
    const { channels } = route.params;
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Channels',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => { /* Implement search functionality */ }} style={styles.headerSearchButton}>
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            )
        });

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
    }, [channels.id, navigation]);

    const renderButton = (title, onPress) => (
        <TouchableOpacity style={styles.filterButton} onPress={onPress}>
            <Text style={styles.filterButtonText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: channels.img }} style={styles.channelsImg} />
                <View style={styles.channelsInfo}>
                    <Text style={styles.channelsName}>{channels.name}</Text>
                    {channels.verified && (
                        <Ionicons name="checkmark-circle" size={16} color="blue" style={styles.verifiedBadge} />
                    )}
                </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
                {renderButton("Explore", () => { /* Implement Explore functionality */ })}
                {renderButton("Most Active", () => { /* Implement Most Active functionality */ })}
                {renderButton("Popular", () => { /* Implement Popular functionality */ })}
                {renderButton("New", () => { /* Implement New functionality */ })}
                {renderButton("List of Countries", () => { /* Implement List of Countries functionality */ })}
            </ScrollView>

            <Text style={styles.description}>{channels.description}</Text>

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
    verifiedBadge: {
        marginLeft: 5,
    },
    followersCount: {
        fontSize: 14,
        color: '#555',
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
    headerBackButton: {
        marginLeft: 10,
    },
    headerSearchButton: {
        marginRight: 10,
    },
    filterScrollView: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    filterButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: primaryColors.purple,
        marginRight: 10,
        backgroundColor: 'transparent',
    },
    filterButtonText: {
        color: primaryColors.purple,
        fontWeight: 'bold',
    },
});

export default ExploreMore;
