import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider, Menu, Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DefaultProfileImg = () => (
    <View style={styles.statusContainer}>
        <View style={styles.statusWrapperDefault}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.statusImg} />
            <View style={styles.plusSign}>
                <Text style={styles.plusText}>+</Text>
            </View>
        </View>
        <Text style={styles.statusUser}>My Status</Text>
    </View>
);

const UpdatesScreen = ({ navigation }) => {
    const [statuses, setStatuses] = useState([
        { id: 1, user: 'Alice', img: 'https://via.placeholder.com/50', total: 3, viewed: 1 },
        { id: 2, user: 'Bob', img: 'https://via.placeholder.com/50', total: 2, viewed: 1 }
    ]);

    const [channels, setChannels] = useState([
        { 
            id: 1, 
            name: 'The New York Times', 
            description: 'Top stories', 
            img: 'https://via.placeholder.com/50', 
            time: '2h ago', 
            unread: 3 
        },
        { 
            id: 2, 
            name: 'The New York Post', 
            description: 'Breaking news', 
            img: 'https://via.placeholder.com/50', 
            time: '1h ago', 
            unread: 5 
        }
    ]);

    const suggestedChannels = [
        { id: 3, name: 'CNN', img: 'https://via.placeholder.com/50', followers: '1.2k followers' },
        { id: 4, name: 'BBC News', img: 'https://via.placeholder.com/50', followers: '900 followers' },
        { id: 5, name: 'TechCrunch', img: 'https://via.placeholder.com/50', followers: '1.5k followers' },
        { id: 6, name: 'National Geographic', img: 'https://via.placeholder.com/50', followers: '800 followers' },
        { id: 7, name: 'ESPN', img: 'https://via.placeholder.com/50', followers: '2k followers' }
    ];

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const apiKey = 'xICQ9NoAelPxIAplcKVta3keJdV5y2ur';
                const responseNYT = await fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`);
                const dataNYT = await responseNYT.json();
                const nyTimesChannel = {
                    id: 1,
                    name: 'The New York Times',
                    description: 'Top stories',
                    img: 'https://via.placeholder.com/50',
                    time: '2h ago',
                    unread: dataNYT.results.length
                };
                const nyPostChannel = {
                    id: 2,
                    name: 'The New York Post',
                    description: 'Breaking news',
                    img: 'https://via.placeholder.com/50',
                    time: '1h ago',
                    unread: 5
                };
                setChannels([nyTimesChannel, nyPostChannel]);
            } catch (error) {
                console.error('Error fetching channels:', error);
            }
        };

        fetchChannels();
    }, []);

    const handleSelectChannel = (channel) => {
        navigation.navigate('ChannelDetails', { channel });
    };

    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    return (
        <Provider>
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
                        <FlatList
                            data={channels}
                            renderItem={({ item }) => (
                                <TouchableOpacity key={item.id} onPress={() => handleSelectChannel(item)}>
                                    <View style={styles.listItem}>
                                        <Image source={{ uri: item.img }} style={styles.channelImg} />
                                        <View style={styles.channelInfo}>
                                            <Text style={styles.channelName}>{item.name}</Text>
                                            <Text style={styles.channelDescription}>{item.description}</Text>
                                        </View>
                                        <View style={styles.channelMeta}>
                                            <Text style={styles.channelTime}>{item.time}</Text>
                                            <View style={styles.unreadBadge}>
                                                <Text style={styles.unreadText}>{item.unread}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.findChannelsContainer}>
                        <Text style={styles.findChannelsText}>Find Channels to Follow</Text>
                        <FlatList
                            data={suggestedChannels}
                            renderItem={({ item }) => (
                                <View style={styles.suggestedChannelItem}>
                                    <Image source={{ uri: item.img }} style={styles.suggestedChannelImg} />
                                    <View style={styles.suggestedChannelInfo}>
                                        <View style={styles.channelHeader}>
                                            <Text style={styles.suggestedChannelName}>{item.name}</Text>
                                            <Ionicons name="checkmark-circle" size={16} color="purple" style={styles.verifiedIcon} />
                                        </View>
                                        <Text style={styles.followersCount}>{item.followers}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.followButton}>
                                        <Text style={styles.followButtonText}>Follow</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                        <TouchableOpacity style={styles.exploreMoreButton} onPress={() => navigation.navigate('Explore')}>
                            <Text style={styles.exploreMoreButtonText}>Explore More</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.bottomRightIcons}>
                    <TouchableOpacity style={[styles.bottomIcon, { marginBottom: 10 }]}>
                        <Ionicons name="pencil" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomIcon}>
                        <Ionicons name="camera" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                        <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
                            <Ionicons name="ellipsis-vertical" size={24} color="black" />
                        </TouchableOpacity>
                    }
                >
                    <Menu.Item onPress={() => {}} title="Status privacy" />
                    <Menu.Item onPress={() => {}} title="Create channel" />
                    <Divider />
                    <Menu.Item onPress={() => {}} title="Settings" />
                </Menu>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
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
    },
    findChannelsContainer: {
        paddingHorizontal: 20,
        marginTop: 20
    },
    findChannelsText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    suggestedChannelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    suggestedChannelImg: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    suggestedChannelInfo: {
        marginLeft: 10,
        flex: 1
    },
    channelHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    suggestedChannelName: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    verifiedIcon: {
        marginLeft: 5
    },
    followersCount: {
        color: '#888',
        marginBottom: 5
    },
    followButton: {
        backgroundColor: 'purple',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    followButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    exploreMoreButton: {
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: 'purple',
        alignItems: 'left'
    },
    exploreMoreButtonText: {
        color: 'purple',
        fontSize: 16,
        fontWeight: 'bold'
    },
    bottomRightIcons: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    bottomIcon: {
        backgroundColor: 'purple',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuButton: {
        position: 'absolute',
        top: 10,
        right: 10
    }
});

export default UpdatesScreen;
