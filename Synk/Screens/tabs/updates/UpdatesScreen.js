import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider, Menu, Provider } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColors } from '../../../constants/colors';

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

    const [channels, setChannels] = useState([]);

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

                const latestArticle = dataNYT.results[0];

                const nyTimesChannel = {
                    id: 1,
                    name: 'The New York Times',
                    description: latestArticle.title.split('.')[0] || 'Top stories',
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
        const interval = setInterval(fetchChannels, 60000); // Fetch every minute

        return () => clearInterval(interval); // Clean up on unmount
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
                                            { borderColor: item.viewed < item.total ? primaryColors.purple : '#ccc' }
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
                                            <Ionicons name="checkmark-circle" size={wp('4%')} color={primaryColors.purple} style={styles.verifiedIcon} />
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
                    <TouchableOpacity style={[styles.bottomIcon, { marginBottom: hp('1%') }]}>
                        <Ionicons name="pencil" size={wp('6%')} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomIcon}>
                        <Ionicons name="camera" size={wp('6%')} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                        <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
                            <Ionicons name="ellipsis-vertical" size={wp('6%')} color="black" />
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
        padding: wp('5%')
    },
    title: {
        marginBottom: hp('1%'),
        color: '#555',
        fontSize: wp('4.5%'),
        fontWeight: 'bold'
    },
    channelsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('1%')
    },
    exploreText: {
        color: primaryColors.purple,
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },
    statusContainer: {
        alignItems: 'center',
        marginRight: wp('3.5%')
    },
    statusWrapper: {
        width: wp('15%'),
        height: wp('15%'),
        borderRadius: wp('7.5%'),
        borderWidth: wp('0.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    statusWrapperDefault: {
        width: wp('15%'),
        height: wp('15%'),
        borderRadius: wp('7.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    plusSign: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: primaryColors.purple,
        borderRadius: wp('3%'),
        width: wp('6%'),
        height: wp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    plusText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },
    statusImg: {
        width: wp('12.5%'),
        height: wp('12.5%'),
        borderRadius: wp('6.25%'),
        zIndex: 2
    },
    statusUser: {
        marginTop: hp('0.5%'),
        textAlign: 'center',
        fontWeight: 'bold'
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
        padding: wp('2.5%'),
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    channelImg: {
        width: wp('12.5%'),
        height: wp('12.5%'),
        borderRadius: wp('6.25%'),
        marginRight: wp('2.5%')
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
        fontSize: wp('3%'),
        color: '#888'
    },
    unreadBadge: {
        backgroundColor: primaryColors.purple,
        borderRadius: wp('3%'),
        paddingVertical: hp('0.2%'),
        paddingHorizontal: wp('1.5%'),
        marginTop: hp('0.2%')
    },
    unreadText: {
        color: '#fff',
        fontSize: wp('3%'),
        fontWeight: 'bold'
    },
    findChannelsContainer: {
        paddingHorizontal: wp('5%'),
        marginTop: hp('2%')
    },
    findChannelsText: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('1%')
    },
    suggestedChannelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
        justifyContent: 'space-between'
    },
    suggestedChannelImg: {
        width: wp('12.5%'),
        height: wp('12.5%'),
        borderRadius: wp('6.25%')
    },
    suggestedChannelInfo: {
        marginLeft: wp('2.5%'),
        flex: 1
    },
    channelHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    suggestedChannelName: {
        fontWeight: 'bold',
        marginBottom: hp('0.5%')
    },
    verifiedIcon: {
        marginLeft: wp('1%')
    },
    followersCount: {
        color: '#888',
        marginBottom: hp('0.5%')
    },
    followButton: {
        backgroundColor: primaryColors.purple,
        paddingVertical: hp('0.5%'),
        paddingHorizontal: wp('2.5%'),
        borderRadius: wp('2.5%'),
        alignItems: 'center'
    },
    followButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    exploreMoreButton: {
        marginTop: hp('1%'),
        backgroundColor: '#fff',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2.5%'),
        borderRadius: wp('3.5%'),
        borderColor: primaryColors.purple,
        borderWidth: 1,
        alignItems: 'center'
    },
    exploreMoreButtonText: {
        color: primaryColors.purple,
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },
    bottomRightIcons: {
        position: 'absolute',
        bottom: hp('2%'),
        right: wp('2.5%'),
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    bottomIcon: {
        backgroundColor: primaryColors.purple,
        borderRadius: wp('7.5%'),
        width: wp('15%'),
        height: wp('15%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuButton: {
        position: 'absolute',
        top: hp('1%'),
        right: wp('2.5%')
    }
});

export default UpdatesScreen;
