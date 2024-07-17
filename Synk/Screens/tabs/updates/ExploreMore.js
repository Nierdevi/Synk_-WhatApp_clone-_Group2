import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { primaryColors } from '../../../constants/colors';

const ExploreMore = ({ route, navigation }) => {
    const { channels } = route.params;
    const [articles, setArticles] = useState([]);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const searchWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Channels',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.headerRightContainer}>
                    {searchVisible ? (
                        <Animated.View style={[styles.searchBar, { width: searchWidth }]}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                            <TouchableOpacity onPress={handleSearchClose}>
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </Animated.View>
                    ) : (
                        <TouchableOpacity onPress={handleSearchOpen} style={styles.headerSearchButton}>
                            <Ionicons name="search" size={24} color="black" />
                        </TouchableOpacity>
                    )}
                </View>
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
    }, [channels.id, navigation, searchVisible]);

    const handleSearchOpen = () => {
        setSearchVisible(true);
        Animated.timing(searchWidth, {
            toValue: 200,
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    const handleSearchClose = () => {
        Animated.timing(searchWidth, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start(() => {
            setSearchVisible(false);
            setSearchText('');
        });
    };

    const renderButton = (title, onPress) => (
        <TouchableOpacity style={styles.filterButton} onPress={onPress}>
            <Text style={styles.filterButtonText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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
    headerBackButton: {
        marginLeft: 10,
    },
    headerSearchButton: {
        marginRight: 10,
    },
    headerRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        paddingLeft: 10,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    filterScrollView: {
        flexDirection: 'row',
    },
    filterButton: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: primaryColors.purple,
        marginRight: 10,
        backgroundColor: 'transparent',
        paddingBottom: 2, // Reduced padding bottom
    },
    filterButtonText: {
        color: primaryColors.purple,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    articleContainer: {
        marginBottom: 20,
    },
    articleImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    articleDescription: {
        color: '#555',
    },
});

export default ExploreMore;
