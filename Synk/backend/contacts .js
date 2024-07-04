import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';
import { databases } from '../backend/appwrite';
import { Query } from 'appwrite';

const STORAGE_KEY = '@MyApp:cachedContacts';
const REFRESH_INTERVAL = 30000; // 1 minutes in milliseconds
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
  const normalizedPhone = normalizePhoneNumber("0503434750");
  console.log(normalizedPhone); // Should output: +233537369081

// Fetch contacts from device
const fetchContacts = async () => {
  try {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access contacts was denied');
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

// Check if user exists in the app database
const isUserInApp = async (phoneNumber) => {
  try {
    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    const response = await databases.listDocuments(
      '6685cbc40036f4c6a5ad',
      '6685cc6600212adefdbf',
      [Query.equal('phoneNumber', normalizedPhone)]
    );
    if (response.documents.length > 0) {
      return response.documents[0].$id; // Return the user ID
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to check user in the database:', error);
    return false;
  }
};

// Fetch and filter contacts, then cache them
const fetchAndFilterContacts = async () => {
  try {
    const fetchedContacts = await fetchContacts();
    const inAppContacts = [];
    const notInAppContacts = [];

    for (const contact of fetchedContacts) {
      if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
        const isInApp = await isUserInApp(contact.phoneNumbers[0].number);
        if (isInApp) {
          inAppContacts.push(contact);
        } else {
          notInAppContacts.push(contact);
        }
      }
    }
    const contactsToCache = {
      contactsList: fetchedContacts,
      filteredContacts: { inApp: inAppContacts, notInApp: notInAppContacts }
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contactsToCache));
    return contactsToCache;
  } catch (error) {
    console.error('Failed to fetch and cache contacts:', error);
    return null;
  }
};

// Load cached contacts from AsyncStorage
const loadCachedContacts = async () => {
  try {
    const cachedContacts = await AsyncStorage.getItem(STORAGE_KEY);
    if (cachedContacts) {
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
    await fetchAndFilterContacts();
  }, REFRESH_INTERVAL);
};

export { fetchAndFilterContacts, loadCachedContacts, startContactRefresh, normalizePhoneNumber };
