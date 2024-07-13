import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider, Menu, Provider } from 'react-native-paper'; // Importing Menu and other components from react-native-paper
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing Ionicons for icons

const ChannelDetails = ({ route }) => {
    const { channel } = route.params;
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    return (
        <Provider>
            <View style={styles.container}>
                {/* Top section with channel logo, name, verified badge, notification bell, and three-dot menu */}
                <View style={styles.topSection}>
                    <Image source={{ uri: channel.img }} style={styles.channelImg} />
                    <View style={styles.channelInfo}>
                        <Text style={styles.channelName}>{channel.name}</Text>
                        <Ionicons name="checkmark-circle" size={16} color="blue" style={styles.verifiedBadge} />
                    </View>
                    <View style={styles.topIcons}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="notifications-outline" size={24} color="black" />
                        </TouchableOpacity>
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
                            <Divider />
                            <Menu.Item onPress={() => {}} title="Report" />
                        </Menu>
                    </View>
                </View>
                {/* Channel details */}
                <Text style={styles.channelDescription}>{channel.description}</Text>
                <View style={styles.channelMeta}>
                    <Text style={styles.channelTime}>{channel.time}</Text>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{channel.unread}</Text>
                    </View>
                </View>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
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
        flexDirection: 'row',
        alignItems: 'center',
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
    topIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 15,
    },
    channelDescription: {
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
    },
    channelMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    channelTime: {
        fontSize: 14,
        color: '#888',
        marginRight: 10,
    },
    unreadBadge: {
        backgroundColor: 'purple',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    unreadText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ChannelDetails;
