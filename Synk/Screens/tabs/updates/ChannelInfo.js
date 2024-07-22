import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColors } from '../../../constants/colors';

const ChannelInfo = ({ route, navigation }) => {
    // Destructure the channel data from route.params
    const { channel } = route.params || {};

    // Conditional rendering if channel data is missing
    if (!channel) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <Provider>
            <View style={styles.container}>
                <Image source={{ uri: channel.profilePicture }} style={styles.profilePicture} />
                <Text style={styles.channelName}>{channel.name}</Text>
                <Text style={styles.followersCount}>{channel.followers} followers</Text>
                
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => { /* Implement share functionality */ }}>
                        <Ionicons name="share-social" size={24} color={primaryColors.purple} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => { /* Implement forward functionality */ }}>
                        <Ionicons name="arrow-forward" size={24} color={primaryColors.purple} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.description}>{channel.description}</Text>

                <TouchableOpacity style={styles.optionButton} onPress={() => { /* Implement mute notifications functionality */ }}>
                    <Text style={styles.optionButtonText}>Mute Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={() => { /* Implement public channel functionality */ }}>
                    <Text style={styles.optionButtonText}>Public Channel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={() => { /* Implement profile privacy functionality */ }}>
                    <Text style={styles.optionButtonText}>Profile Privacy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={() => { /* Implement unfollow channel functionality */ }}>
                    <Text style={styles.optionButtonText}>Unfollow Channel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={() => { /* Implement report functionality */ }}>
                    <Text style={styles.optionButtonText}>Report</Text>
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
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 20,
    },
    channelName: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    followersCount: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    button: {
        backgroundColor: primaryColors.purple,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    iconButton: {
        marginHorizontal: 10,
    },
    description: {
        padding: 20,
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    optionButton: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    optionButtonText: {
        fontSize: 16,
        color: '#333',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ChannelInfo;
