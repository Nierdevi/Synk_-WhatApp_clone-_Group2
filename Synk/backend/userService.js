import AsyncStorage from '@react-native-async-storage/async-storage';
import {databases,storage,ID} from './appwrite';
import { Query } from 'appwrite';
import * as FileSystem from 'expo-file-system';
import FormData from 'form-data';


const addUserToDatabase = async (userId, phoneNumber) => {
    try {
        await databases.createDocument('database_id','users', ID.unique(),  {
            userId,
            phoneNumber,
        });
    } catch (error) {
        console.error("Failed to add user to the database:", error);
    }
};

// Function to add username to the database

const addUsernameToDatabase = async (userId, username) => {
    try {
        // Query the database to find the document by userId
        const response = await databases.listDocuments('database_id', 'users', [
            Query.equal('userId', userId)
        ]);

        if (response.documents.length === 0) {
            throw new Error('User document not found');
        }

        // Assuming userId is unique, get the first document
        const userDocument = response.documents[0];

        // Update the document with the new username
        await databases.updateDocument('database_id', 'users', userDocument.$id, {
            username,
        });
    } catch (error) {
        console.error("Failed to add username to the database:", error);
    }
};

const addAboutToDatabase = async (userId, about) => {
    try {
        // Query the database to find the document by userId
        const response = await databases.listDocuments('database_id', 'users', [
            Query.equal('userId', userId)
        ]);

        if (response.documents.length === 0) {
            throw new Error('User document not found');
        }

        // Assuming userId is unique, get the first document
        const userDocument = response.documents[0];

        // Update the document with the new username
        await databases.updateDocument('database_id', 'users', userDocument.$id, {
            about,
        });
    } catch (error) {
        console.error("Failed to add about to the database:", error);
    }
};


const getUserDocument = async (userId) => {
    try {
        const response = await databases.listDocuments(
            'database_id', // Your database ID
            'users', // Your collection ID
            [Query.equal('userId', userId)] // Query to find the document
        );

        if (response.documents.length === 0) {
            throw new Error('User document not found');
        }

        return response.documents[0]; // Return the document
    } catch (error) {
        console.error("Failed to fetch user document:", error);
        throw error;
    }
};

const getUserProfilePicture = async (userId) => {
    try {
        const response = await databases.listDocuments(
            'database_id', // Your database ID
            'users', // Your collection ID
            [Query.equal('userId', userId)] // Query to find the document
        );

        if (response.documents.length === 0) {
            throw new Error('User document not found');
        }

        // Assuming the profile picture URL is stored in the profilePicture field
        return response.documents[0].profilePicture || null; // Return null if it doesn't exist
    } catch (error) {
        console.error("Failed to fetch user profile picture:", error);
        throw error;
    }
};


const uploadProfilePicture = async (userId, uri) => {
    try {

        const userDocument = await getUserDocument(userId);
        const documentId = userDocument.$id;
        console.log("documentId: ",documentId)

        const currentProfilePictureUrl = userDocument.profilePicture;
        console.log("currentProfilePictureUrl: ",currentProfilePictureUrl)
        
        // Step 2: Delete the existing profile picture if it exists
        // if (currentProfilePictureUrl) {
        //     const fileId= await extractIdsFromUrl(currentProfilePictureUrl)
        //     console.log("fileId: ",fileId)
        //     await storage.deleteFile('synk_bucket',); // Delete the file from storage
        // }

        const formData = new FormData();
        formData.append('fileId', ID.unique());
        formData.append('file', {
            uri,
            name: `userProfile_${userId}.jpg`,
            type: 'image/jpeg',
        });

        const uploadResponse = await fetch(
            'https://cloud.appwrite.io/v1/storage/buckets/synk_bucket/files',
            {
                method: 'POST',
                headers: {
                    'X-Appwrite-Project': '66992806000309150f65',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            }
        );

        const uploadData = await uploadResponse.json();
        console.log(uploadData)

        if (!uploadResponse.ok) {
            throw new Error(uploadData.message || 'Failed to upload file');
        }

        const newImageUrl = `https://cloud.appwrite.io/v1/storage/buckets/synk_bucket/files/${uploadData.$id}/view?project=66992806000309150f65`;


        await databases.updateDocument(
            'database_id', 
            'users', 
            documentId, 
            { profilePicture: newImageUrl }
        );

        const localPath = await downloadAndCacheProfilePicture(newImageUrl);

        await AsyncStorage.setItem('profilePicturePath', localPath);

        return newImageUrl;
    } catch (error) {
        console.error('Failed to upload profile picture:', error);
        throw error;
    }
};



// Function to download and cache the profile picture locally
const downloadAndCacheProfilePicture = async (url) => {
    try {
        const fileUri = FileSystem.documentDirectory + 'profile-picture.jpg';
        await FileSystem.downloadAsync(url, fileUri);
        return fileUri;
    } catch (error) {
        console.error('Failed to download and cache profile picture:', error);
        return null;
    }
};


const getcurrentUserData = async (userId) => {
    try {
        // let userData = await AsyncStorage.getItem('userData');
        // if (userData) {
        //     console.log('Loading user data from local storage...');
        //     console.log('user data from local', userData);
        //     return JSON.parse(userData);
        // }

        console.log('Fetching user data from database...');
        const response = await databases.listDocuments('database_id', 'users', [
            Query.equal('userId', userId)
        ]);

        if (response.documents.length === 0) {
            throw new Error('User document not found');
        }

        userData = response.documents[0];
        console.log('Fetched user data from database:', userData);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        return userData;

    } catch (error) {
        console.error("Failed to fetch user data:", error);
        throw error;
    }
};


// const getUserData = async (phoneNumber) => {
//     try {
//     const response = await databases.listDocuments('database_id', 'users', [
//         Query.equal('phoneNumber', phoneNumber)
//     ]);

//     if (response.documents.length === 0) {
//         throw new Error('User document not found');
//     }

//     otherUserData = response.documents[0];
//     // console.log("userdata: ",otherUserData)
//         await AsyncStorage.setItem(`userData_${phoneNumber}`, JSON.stringify(otherUserData));
//         return otherUserData;
//     } catch (error) {
//     console.error("Failed to fetch other user data:", error);
//         throw error;
//     }
// };

const getUserData = async (phoneNumber) => {
    try {
        const response = await databases.listDocuments('database_id', 'users', [
            Query.equal('phoneNumber', phoneNumber)
        ]);

        if (response.documents.length === 0) {
            console.log(`User document not found for phoneNumber: ${phoneNumber}`);
            return {
                phoneNumber,
                about: "No about info",
                profilePicture: require("../assets/Avator.jpg"),
                displayName: otherUserData.username
            };
        }

        const otherUserData = response.documents[0];
        // console.log("user data: ",otherUserData.about)

        // console.log(`Fetched user data for ${phoneNumber}:`, otherUserData);

        await AsyncStorage.setItem(`userData_${phoneNumber}`, JSON.stringify(otherUserData));

        // Use default values if fields are missing
        return {
            phoneNumber,
            about: otherUserData.about || null,
            profilePicture: otherUserData.profilePicture ,
            displayName: otherUserData.username
        };
    } catch (error) {
        console.error("Failed to fetch other user data:", error);
        throw error;
    }
};


export { addUserToDatabase,uploadProfilePicture,addUsernameToDatabase,addAboutToDatabase,getcurrentUserData,getUserProfilePicture,getUserData };
