import { Entypo, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { primaryColors } from '../../../constants/colors';

// Mock data for channels
const mockChannels = [
  { id: 1, name: 'The New York Times', img: 'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg', followers: '1.2k', followed: false, verified: true },
  { id: 2, name: 'The Dodo', img: 'https://seeklogo.com/images/D/dodo-logo-AFFDA66ADE-seeklogo.com.png', followers: '900', followed: false, verified: true },
  { id: 3, name: 'CNN', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png', followers: '1.5k', followed: false, verified: true },
  { id: 4, name: 'Fox News', img: 'https://w7.pngwing.com/pngs/100/409/png-transparent-fox-news-ureport-united-states-breaking-news-united-states-television-text-logo.png', followers: '800', followed: false, verified: true },
  { id: 5, name: 'The Guardian', img: 'https://1000logos.net/wp-content/uploads/2021/05/The-Guardian-logo.png', followers: '1.1k', followed: false, verified: true },
  { id: 6, name: 'Reuters', img: 'https://www.farm-d.org/app/uploads/2021/08/logo-vertical-default-512x512-1.png', followers: '1.3k', followed: false, verified: true },
  { id: 7, name: 'Al Jazeera', img: 'https://1000logos.net/wp-content/uploads/2020/08/Al-Jazeera-Logo.jpg', followers: '700', followed: false, verified: true },
  { id: 8, name: 'Spotify', img: 'https://ritalinboy.com/app/uploads/2022/05/148-1487614_spotify-logo-small-spotify-logo-transparent-hd-png.png', followers: '5.5k', followed: false, verified: true },
  { id: 9, name: 'Pulse Ghana', img: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://pulse.africa/wp-content/uploads/2021/07/Ghana-Red.png', followers: '5.5k', followed: false, verified: true },
  { id: 10, name: 'YEN.com.gh', img: 'https://cdn.prod.website-files.com/655f6d87994c4bfda757bd09/657863f0329b30e214193239_logo_YEN.png', followers: '5.5k', followed: false, verified: true },
];

const ExploreMore = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [channelsData, setChannelsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
    'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
    'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
    'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso',
    'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic',
    'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia',
    'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini',
    'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
    'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
    'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South',
    'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia',
    'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
    'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
    'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger',
    'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea',
    'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
    'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
    'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia',
    'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
    'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
    'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste',
    'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
    'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];

  useEffect(() => {
    // Use mock data for now
    setChannelsData(mockChannels);
    setLoading(false);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setChannelsData(mockChannels);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {/* Title and Search Icon */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Channels</Text>
        <TouchableOpacity style={styles.searchButton} onPress={() => {/* Implement search functionality */}}>
          <Ionicons name="search" size={24} color={primaryColors.purple} />
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.buttonContainer}>
          {['Explore', 'Most active', 'Popular', 'New'].map((button) => (
            <TouchableOpacity key={button} style={styles.button} onPress={() => {/* Handle button press */}}>
              <Text style={styles.buttonText}>{button}</Text>
            </TouchableOpacity>
          ))}
          {/* Country Dropdown */}
          <View style={styles.dropdownContainer}>
            <Entypo name="globe" size={24} color="black" />
            <Text style={styles.selectedCountry}>{selectedCountry}</Text>
            <Picker
              selectedValue={selectedCountry}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            >
              {countries.map((country) => (
                <Picker.Item key={country} label={country} value={country} />
              ))}
            </Picker>
          </View>
        </ScrollView>
      </View>

      {/* Channels List */}
      {loading ? (
        <ActivityIndicator size="large" color={primaryColors.purple} />
      ) : (
        <FlatList
          data={channelsData}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.channelContainer} onPress={() => {/* Handle channel press */}}>
              <Image source={{ uri: item.img }} style={styles.channelImage} />
              <View style={styles.channelInfo}>
                <View style={styles.channelNameContainer}>
                  <Text style={styles.channelName}>{item.name}</Text>
                  {item.verified && (
                    <View style={styles.verifiedTick}>
                      <Ionicons name="checkmark" size={12} color="white" />
                    </View>
                  )}
                </View>
                <Text style={styles.followers}>{item.followers} followers</Text>
              </View>
              <TouchableOpacity
                style={[styles.followButton, item.followed ? styles.followingButton : styles.followButton]}
                onPress={() => {/* Handle follow/unfollow press */}}
              >
                <Text style={[styles.followButtonText, item.followed ? styles.followingButtonText : styles.followButtonText]}>
                  {item.followed ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginTop: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 5,
  },
  header: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCountry: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  picker: {
    height: 40,
    width: 150,
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  channelImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  channelInfo: {
    flex: 1,
    marginLeft: 10,
  },
  channelNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  verifiedTick: {
    backgroundColor: primaryColors.purple,
    borderRadius: 30, // Updated to 30
    marginLeft: 5,
    padding: 2,
  },
  followers: {
    fontSize: 14,
    color: 'grey',
  },
  followButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: primaryColors.purple,
  },
  followingButton: {
    backgroundColor: primaryColors.purple,
  },
  followButtonText: {
    fontSize: 16,
    color: primaryColors.purple,
  },
  followingButtonText: {
    color: 'white',
  },
});

export default ExploreMore;
