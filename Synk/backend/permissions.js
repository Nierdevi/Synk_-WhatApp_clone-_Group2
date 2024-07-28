import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';

export const fetchContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });
    return data;
  } else {
    console.log('Permission to access contacts was denied');
    return [];
  }
};


export const requestCameraPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status === 'granted';
};

export const requestStoragePermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  return status === 'granted';
};
