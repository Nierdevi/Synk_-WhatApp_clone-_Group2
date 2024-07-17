import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { primaryColors } from '../../../constants/colors';


const channelsData = [
  { id: '1', name: 'Channel One', description: 'Description One' },
  { id: '2', name: 'Channel Two', description: 'Description Two' },
  // Add more channels
];

const ExploreMore = () => {
  const [selectedCountry, setSelectedCountry] = useState('Ghana'); // Default country is Ghana
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina',
    'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
    'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
    'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
    'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China',
    'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the',
    'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark',
    'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
    'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji',
    'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
    'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
    'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait',
    'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
    'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
    'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
    'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
    'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia',
    'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama',
    'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
    'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
    'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
    'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
    'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan',
    'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
    'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
    'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
    'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
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
          <View style={styles.channelCard}>
            <Text style={styles.channelName}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
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
