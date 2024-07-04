import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';

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

export { fetchAndNormalizeContacts, loadCachedContacts, startContactRefresh, normalizePhoneNumber };
