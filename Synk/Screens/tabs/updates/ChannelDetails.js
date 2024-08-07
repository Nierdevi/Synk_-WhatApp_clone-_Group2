import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, Linking, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColors } from '../../../constants/colors';

const ChannelDetails = ({ route }) => {
    const { channel } = route.params;
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    const [articles, setArticles] = useState([]);
    const [articleReactions, setArticleReactions] = useState({});
    const [loading, setLoading] = useState(true);
    const [buttonOpacity, setButtonOpacity] = useState(0.5);
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
                    const shuffledReactions = [...reactions].sort(() => 0.5 - Math.random());
                    const randomReactions = shuffledReactions.slice(0, Math.floor(Math.random() * reactions.length) + 1);
                    acc[item.url] = randomReactions;
                    return acc;
                }, {});

                setArticles(data.results);
                setArticleReactions(reactionsMap);
            } catch (error) {
                console.error('Error fetching NYT articles:', error);
                Alert.alert('Error', 'Failed to fetch articles. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchNYTArticles();
    }, []);

    const scrollToBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    const handleShare = async (url) => {
        await Share.share({
            message: `Check out this article: ${url}`,
        });
    };

    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <View style={styles.profilePictureContainer}>
                        <Image source={{ uri: channel.img }} style={styles.channelImg} />
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backIconContainer}
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
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
                            <Menu.Item onPress={() => navigation.navigate('ChannelInfo')} title="Channel Info"/>
                            <Menu.Item onPress={() => {}} title="Unfollow" />
                            <Menu.Item onPress={() => {}} title="Share" />
                            <Menu.Item onPress={() => {}} title="Report" />
                        </Menu>
                    </View>
                </View>

                {loading ? (
                    <Text>Loading articles...</Text>
                ) : (
                    <ScrollView ref={scrollViewRef} style={styles.articlesList}>
                        {articles.map((item) => (
                            <View key={item.url} style={styles.articleContainer}>
                                {item.multimedia && item.multimedia.length > 0 && (
                                    <Image source={{ uri: item.multimedia[0].url }} style={styles.articleImage} />
                                )}
                                <Text style={styles.articleTitle}>{item.title}</Text>
                                <Text style={styles.articleAbstract}>{item.abstract}</Text>
                                <TouchableOpacity onPress={() => handleShare(item.url)} style={styles.forwardIconContainer}>
                                    <View style={styles.forwardIconCircle}>
                                        <MaterialCommunityIcons name="share-all" size={24} color="black" />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.reactionsContainer}>
                                    {articleReactions[item.url].map((reaction, index) => (
                                        <View key={index} style={styles.reaction}>
                                            <Text style={styles.reactionText}>{reaction}</Text>
                                        </View>
                                    ))}
                                    <Text style={styles.reactionCountText}>{articleReactions[item.url].length}</Text>
                                </View>
                                <TouchableOpacity onPress={() => Linking.openURL(item.url)} style={styles.linkButton}>
                                    <Text style={styles.linkText}>
                                        Click here👉👉<Ionicons name="link" size={16} color="blue" />
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.articleDate}>{moment(item.published_date).format('MMM D, YYYY, h:mm A')}</Text>
                            </View>
                        ))}
                    </ScrollView>
                )}

                <TouchableOpacity onPress={scrollToBottom} style={styles.scrollToBottomButton(buttonOpacity)}>
                    <FontAwesome name="angle-double-down" size={24} color={primaryColors.purple} />
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
        marginTop: 30,
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    profilePictureContainer: {
        position: 'relative',
    },
    channelImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    backIconContainer: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 50,
        padding: 5,
    },
    channelInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
        marginLeft: 10,
    },
    channelName: {
        fontSize: 16,
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
        transform: [{ rotate: '40deg' }],
    },
    articleContainer: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 30, // Increased marginBottom for more spacing between post containers
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
    forwardIconContainer: {
        position: 'absolute',
        bottom: -23,
        left: 10,
        marginRight: 10,
    },
    forwardIconCircle: {
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        padding: 10,
    },
    reactionsContainer: {
        position: 'absolute',
        bottom: -20,
        left: 55, 
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        backgroundColor: '#fff', 
        borderRadius: 5, 
        padding: 5, 
    },
    reaction: {
        marginRight: 5, // Margin between reactions
    },
    reactionText: {
        fontSize: 16,
        marginLeft: 5,
    },
    reactionCountText: {
        fontSize: 16,
        marginLeft: 5,
        color: '#555',
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
    scrollToBottomButton: (opacity) => ({
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: `rgba(245, 245, 245, ${opacity})`,
        borderRadius: 25,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }),
});

export default ChannelDetails;
