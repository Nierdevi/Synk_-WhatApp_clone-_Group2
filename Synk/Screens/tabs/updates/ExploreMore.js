import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { primaryColors } from '../../../constants/colors';


const channelsData = [
  { id: '1', name: 'The New York Times', description: 'News and articles from The New York Times' },
  { id: '2', name: 'BBC News', description: 'Latest news from BBC' },
  // Add more channels
];

const ExploreMore = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState('Ghana'); // Default country is Ghana
  const countries = [
    'Ghana', 'United States', 'United Kingdom', 'Canada', // Add more countries as needed
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {/* Implement search functionality */}}>
          <Ionicons name="search" size={24} color={primaryColors.purple} />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.buttonContainer}>
          {['Most Active', 'Popular', 'New'].map((button) => (
            <TouchableOpacity key={button} style={styles.button} onPress={() => {/* Handle button press */}}>
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
              {countries.map((country) => (
                <Picker.Item key={country} label={country} value={country} />
              ))}
            </Picker>
          </View>
        </ScrollView>
      </View>

      {/* Channel List */}
      <FlatList
        data={channelsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ChannelDetails', { channel: item })}>
            <View style={styles.channelCard}>
              <Text style={styles.channelName}>{item.name}</Text>
              <Text>{item.description}</Text>
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
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    marginRight: 8,
    backgroundColor: primaryColors.grey,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  dropdownContainer: {
    marginLeft: 8,
    borderWidth: 1,
    borderColor: primaryColors.gray,
    borderRadius: 8,
    overflow: 'hidden',
  },
  dropdown: {
    width: 120,
    height: 40,
  },
  channelCard: {
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: primaryColors.gray,
  },
  channelName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExploreMore;
