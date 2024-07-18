import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { primaryColors } from '../../../constants/colors';

const ExploreMore = ({ navigation }) => {
    const [channels, setChannels] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('Ghana');

    useEffect(() => {
        // Mock data for channels (replace with actual API fetch)
        const mockChannels = [
            { id: 1, name: 'The New York Times', img: 'https://via.placeholder.com/50', followers: '1.2k' },
            { id: 2, name: 'BBC News', img: 'https://via.placeholder.com/50', followers: '900' },
            { id: 3, name: 'CNN', img: 'https://via.placeholder.com/50', followers: '1.5k' },
            { id: 4, name: 'Fox News', img: 'https://via.placeholder.com/50', followers: '800' },
            { id: 5, name: 'The Guardian', img: 'https://via.placeholder.com/50', followers: '1.1k' },
            { id: 6, name: 'Reuters', img: 'https://via.placeholder.com/50', followers: '1.3k' },
            { id: 7, name: 'Al Jazeera', img: 'https://via.placeholder.com/50', followers: '700' },
        ];

        setChannels(mockChannels);
    }, []);

    const handleSelectChannel = (channel) => {
        navigation.navigate('ChannelDetails', { channel });
    };

    // Dummy data for countries
    const countries = ['Ghana', 'Country A', 'Country B', 'Country C'];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Channels</Text>
                <TouchableOpacity onPress={() => {/* Implement search functionality */}}>
                    <Ionicons name="search" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.buttonContainer}>
                {['Channels','Most Active', 'Popular', 'New'].map((button, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={() => {/* Handle button press */}}>
                        <Text style={styles.buttonText}>{button}</Text>
                    </TouchableOpacity>
                ))}
                {/* Country Dropdown */}
                <View style={styles.dropdownContainer}>
                    <Picker
                        selectedValue={selectedCountry}
                        style={styles.dropdown}
                        onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                    >
                        {countries.map((country, index) => (
                            <Picker.Item key={index} label={country} value={country} />
                        ))}
                    </Picker>
                </View>
            </ScrollView>

            {/* Channel List */}
            <FlatList
                data={channels}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.channelItem} onPress={() => handleSelectChannel(item)}>
                        <Image source={{ uri: item.img }} style={styles.channelImg} />
                        <View style={styles.channelInfo}>
                            <Text style={styles.channelName}>{item.name}</Text>
                            <Text style={styles.followers}>{item.followers} followers</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginTop: 20,
        backgroundColor: '#f0f0f0', // Add background color
        height: 60, // Increase height
        alignItems: 'center', // Center align buttons vertically
    },
    button: {
        marginRight: 10,
        padding: 10,
        backgroundColor: primaryColors.purple,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
    dropdownContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
    },
    dropdown: {
        height: 40,
        width: 150,
    },
    channelItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    channelImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    channelInfo: {
        justifyContent: 'center',
    },
    channelName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    followers: {
        fontSize: 14,
        color: '#888',
    },
});

export default ExploreMore;
