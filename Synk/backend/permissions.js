import * as Permissions from 'expo-permissions';

export const requestContactsPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  return status === 'granted';
};

export const requestCameraPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status === 'granted';
};

export const requestStoragePermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  return status === 'granted';
};
