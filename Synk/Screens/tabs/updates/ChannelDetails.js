import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColors } from '../../../constants/colors';

const ChannelDetails = ({ route }) => {
    const { channel } = route.params;
    const [menuVisible, setMenuVisible] = useState(false);
    const [articles, setArticles] = useState([]);
    const [articleReactions, setArticleReactions] = useState({});
    const scrollViewRef = useRef();

    const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    useEffect(() => {
        const fetchNYTArticles = async () => {
            try {
                const apiKey = 'xICQ9NoAelPxIAplcKVta3keJdV5y2ur';
                const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`);
                const data = await response.json();

                const reactionsMap = data.results.reduce((acc, item) => {
                    acc[item.url] = reactions[Math.floor(Math.random() * reactions.length)];
                    return acc;
                }, {});

                setArticles(data.results);
                setArticleReactions(reactionsMap);
            } catch (error) {
                console.error('Error fetching NYT articles:', error);
            }
        };

        fetchNYTArticles();
    }, []);

    const scrollToBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <Image source={{ uri: channel.img }} style={styles.channelImg} />
                    <View style={styles.channelInfo}>
                        <Text style={styles.channelName}>{channel.name}</Text>
                        {channel.verified && (
                            <Ionicons name="checkmark-circle" size={16} color="blue" style={styles.verifiedBadge} />
                        )}
                        <Text style={styles.followersCount}>{channel.followers} followers</Text>
                    </View>
                    <View style={styles.topIcons}>
                        <View style={styles.bellIconContainer}>
                            <Ionicons name="notifications-outline" size={24} color="black" />
                            <View style={styles.lineThrough} />
                        </View>
                        <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchor={
                                <TouchableOpacity onPress={openMenu} style={styles.iconButton}>
                                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                                </TouchableOpacity>
                            }
                        >
                            <Menu.Item onPress={() => {}} title="Channel Info" />
                            <Menu.Item onPress={() => {}} title="Unfollow" />
                            <Menu.Item onPress={() => {}} title="Share" />
                            <Menu.Item onPress={() => {}} title="Report" />
                        </Menu>
                    </View>
                </View>

                <ScrollView ref={scrollViewRef} style={styles.articlesList}>
                    {articles.map((item) => (
                        <View key={item.url} style={styles.articleContainer}>
                            {item.multimedia && item.multimedia.length > 0 && (
                                <Image source={{ uri: item.multimedia[0].url }} style={styles.articleImage} />
                            )}
                            <Text style={styles.articleTitle}>{item.title}</Text>
                            <Text style={styles.articleAbstract}>{item.abstract}</Text>
                            <Text style={styles.reactionText}>{articleReactions[item.url]}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(item.url)} style={styles.linkButton}>
                                <Text style={styles.linkText}>
                                    Check here <Ionicons name="chevron-forward" size={16} color="blue" />
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.articleDate}>{moment(item.published_date).format('MMM D, YYYY, h:mm A')}</Text>
                            <TouchableOpacity onPress={() => {}} style={styles.forwardIconContainer}>
                                <View style={styles.forwardIconCircle}>
                                    <Ionicons name="chevron-forward" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <TouchableOpacity onPress={scrollToBottom} style={styles.scrollToBottomButton}>
                    <Ionicons name="arrow-down" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginTop:40
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    channelImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    channelInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
        marginLeft: 10,
    },
    channelName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 5,
    },
    verifiedBadge: {
        marginLeft: 5,
    },
    followersCount: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },
    topIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 15,
    },
    bellIconContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    lineThrough: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'black',
        transform: [{ rotate: '40deg' }]
    },
    articleContainer: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        position: 'relative',
    },
    articleImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    articleAbstract: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    reactionText: {
        fontSize: 24,
        marginBottom: 10,
    },
    linkButton: {
        marginTop: 10,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    articlesList: {
        marginTop: 20,
    },
    articleDate: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 12,
        color: '#888',
    },
    forwardIconContainer: {
        position: 'absolute',
        bottom: -15,
        left: 10,
    },
    forwardIconCircle: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        borderWidth: 1,
        borderColor: primaryColors.purple,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollToBottomButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: primaryColors.purple,
        borderRadius: 25,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChannelDetails;
