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
            { id: 1, name: 'The New York Times', img: 'https://via.placeholder.com/50', followers: '1.2k', followed: false, verified: true },
            { id: 2, name: 'BBC News', img: 'https://via.placeholder.com/50', followers: '900', followed: false, verified: true },
            { id: 3, name: 'CNN', img: 'https://via.placeholder.com/50', followers: '1.5k', followed: false, verified: true },
            { id: 4, name: 'Fox News', img: 'https://via.placeholder.com/50', followers: '800', followed: false, verified: true },
            { id: 5, name: 'The Guardian', img: 'https://via.placeholder.com/50', followers: '1.1k', followed: false, verified: true },
            { id: 6, name: 'Reuters', img: 'https://via.placeholder.com/50', followers: '1.3k', followed: false, verified: true },
            { id: 7, name: 'Al Jazeera', img: 'https://via.placeholder.com/50', followers: '700', followed: false, verified: true },
        ];

        setChannels(mockChannels);
    }, []);

    const handleSelectChannel = (channel) => {
        navigation.navigate('ChannelDetails', { channel });
    };

    const handleFollow = (channelId) => {
        setChannels((prevChannels) =>
            prevChannels.map((channel) =>
                channel.id === channelId ? { ...channel, followed: !channel.followed } : channel
            )
        );
    };

    // List of countries around the world
    const countries = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 
        'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 
        'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 
        'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 
        'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', 
        'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 
        'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 
        'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 
        'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 
        'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 
        'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 
        'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 
        'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 
        'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 
        'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 
        'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 
        'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 
        'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 
        'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 
        'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 
        'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
    ];

    // Buttons data
    const buttons = ['Explore', 'Most Active', 'Popular', 'New'];

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
                <FlatList
                    horizontal
                    data={buttons}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.button} onPress={() => {/* Handle button press */}}>
                            <Text style={styles.buttonText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
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
                    <View style={styles.channelItem}>
                        <TouchableOpacity style={styles.channelInfo} onPress={() => handleSelectChannel(item)}>
                            <Image source={{ uri: item.img }} style={styles.channelImg} />
                            <View style={styles.channelDetails}>
                                <View style={styles.channelNameContainer}>
                                    <Text style={styles.channelName}>{item.name}</Text>
                                    {item.verified && (
                                        <Ionicons name="checkmark-circle" size={16} color="blue" style={styles.verifiedIcon} />
                                    )}
                                </View>
                                <Text style={styles.followers}>{item.followers} followers</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.followButton, item.followed && styles.followingButton]}
                            onPress={() => handleFollow(item.id)}
                        >
                            <Text style={styles.followButtonText}>{item.followed ? 'Following' : 'Follow'}</Text>
                        </TouchableOpacity>
                    </View>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    channelInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    channelImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    channelDetails: {
        justifyContent: 'center',
    },
    channelNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    channelName: {
        fontSize: 16, // Decreased font size
        fontWeight: 'bold',
    },
    verifiedIcon: {
        marginLeft: 5,
    },
    followers: {
        fontSize: 14,
        color: '#888',
    },
    followButton: {
        backgroundColor: primaryColors.purple,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    followingButton: {
        backgroundColor: 'gray',
    },
    followButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ExploreMore;
