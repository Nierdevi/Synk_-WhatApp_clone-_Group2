import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';
import { Linking, Alert, Platform } from 'react-native';
import { client, databases } from './appwrite';
import { useState,useEffect } from 'react';

const STORAGE_KEY = '@MyApp:cachedContacts';
const REFRESH_INTERVAL = 60000; // 30 seconds in milliseconds
const DEFAULT_COUNTRY_CODE = '+233';

// Utility function to normalize phone numbers
const normalizePhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters from the phone number
  const cleaned = phoneNumber.replace(/\D/g, '');
  // Check if the number starts with '0'
  if (cleaned.startsWith('0')) {
    // Replace '0' with your default country code
    return `${DEFAULT_COUNTRY_CODE}${cleaned.slice(1)}`;
  }
  // Check if the number does not start with the default country code
  if (!cleaned.startsWith(DEFAULT_COUNTRY_CODE.replace('+', ''))) {
    // Append the default country code
    return `${DEFAULT_COUNTRY_CODE}${cleaned}`;
  }
  // Return the number with a '+' prefix
  return `+${cleaned}`;
};

// Fetch contacts from device
const fetchContacts = async () => {
  try {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'This app needs access to your contacts to function properly. Please grant access from settings.',
        [
          {
            text: 'Open Settings',
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            },
          },
        ],
        { cancelable: false }
      );
      return [];
    }
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    return [];
  }
};

// Fetch and normalize contacts
const fetchAndNormalizeContacts = async () => {
  try {
    const fetchedContacts = await fetchContacts();
    const normalizedContacts = fetchedContacts.map(contact => {
      if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
        contact.normalizedPhoneNumbers = contact.phoneNumbers.map(phoneNumber =>
          normalizePhoneNumber(phoneNumber.number)
        );
      }
      return contact;
    });

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedContacts));
    return normalizedContacts;
  } catch (error) {
    console.error('Failed to fetch and normalize contacts:', error);
    return null;
  }
};

// Load cached contacts from AsyncStorage
const loadCachedContacts = async () => {
  try {
    
    const cachedContacts = await AsyncStorage.getItem(STORAGE_KEY);
    if (cachedContacts) {
      // console.log(cachedContacts)
      return JSON.parse(cachedContacts);
    }
  } catch (error) {
    console.error('Failed to load cached contacts:', error);
  }
  return null;
};

// Refresh contacts periodically
const startContactRefresh = () => {
  setInterval(async () => {
    await fetchAndNormalizeContacts();
  }, REFRESH_INTERVAL);
};


// Real-time subscription to listen for database changes
const subscribeToDatabaseChanges = (setContacts) => {
  const unsubscribe = client.subscribe(
    'collections.[users].documents',
    response => {
      // Assuming the document structure matches your contacts data
      if (response.events.includes('database.documents.create') ||
          response.events.includes('database.documents.update') ||
          response.events.includes('database.documents.delete')) {
        fetchAndNormalizeContacts().then(updatedContacts => {
          if (updatedContacts) {
            setContacts(updatedContacts);
          }
        });
      }
    }
  );
  return unsubscribe;
};

const useContacts = (session) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const cachedContacts = await loadCachedContacts();
        if (cachedContacts) setContacts(cachedContacts);

        const fetchedContacts = await fetchAndNormalizeContacts();
        if (fetchedContacts) setContacts(fetchedContacts);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
        if (error.message.includes('Network request failed')) {
          // Alert.alert('Network Error', 'Please check your network connection and try again.');
        }
      }
    };

    if (session) {
      loadContacts();
    }
  }, [session]);

  return contacts;
};


export { fetchAndNormalizeContacts, loadCachedContacts, startContactRefresh, normalizePhoneNumber,subscribeToDatabaseChanges,useContacts };
