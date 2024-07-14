import {databases,storage,ID} from './appwrite';
import { Query } from 'appwrite';
import * as FileSystem from 'expo-file-system';
import FormData from 'form-data';

const addUserToDatabase = async (userId, phoneNumber) => {
    try {
        await databases.createDocument('6685cbc40036f4c6a5ad','6685cc6600212adefdbf', ID.unique(),  {
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
        const response = await databases.listDocuments('6685cbc40036f4c6a5ad', '6685cc6600212adefdbf', [
            Query.equal('userId', userId)
        ]);

        if (response.documents.length === 0) {
            throw new Error('User document not found');
        }

        // Assuming userId is unique, get the first document
        const userDocument = response.documents[0];

        // Update the document with the new username
        await databases.updateDocument('6685cbc40036f4c6a5ad', '6685cc6600212adefdbf', userDocument.$id, {
            username,
        });
    } catch (error) {
        console.error("Failed to add username to the database:", error);
    }
};

const addAboutToDatabase = async (userId, about) => {
    try {
        // Query the database to find the document by userId
        const response = await databases.listDocuments('6685cbc40036f4c6a5ad', '6685cc6600212adefdbf', [
            Query.equal('userId', userId)
        ]);

        if (response.documents.length === 0) {
            throw new Error('User document not found');
        }

        // Assuming userId is unique, get the first document
        const userDocument = response.documents[0];

        // Update the document with the new username
        await databases.updateDocument('6685cbc40036f4c6a5ad', '6685cc6600212adefdbf', userDocument.$id, {
            about,
        });
    } catch (error) {
        console.error("Failed to add about to the database:", error);
    }
};


const getUserDocument = async (userId) => {
    try {
        const response = await databases.listDocuments(
            '6685cbc40036f4c6a5ad', // Your database ID
            '6685cc6600212adefdbf', // Your collection ID
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
            '6685cbc40036f4c6a5ad', // Your database ID
            '6685cc6600212adefdbf', // Your collection ID
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

const extractIdsFromUrl = async(url) => {
    const urlParts = url.split('/');
    const fileId = urlParts[7];   // Extract file ID
    console.log("fileId: ",fileId)
    return { fileId };
};


const uploadProfilePicture = async (userId, uri) => {
    try {

        const userDocument = await getUserDocument(userId);
        const documentId = userDocument.$id;
        console.log("documentId: ",documentId)

        const currentProfilePictureUrl = userDocument.profilePicture;
        console.log("currentProfilePictureUrl: ",currentProfilePictureUrl)
        
        // Step 2: Delete the existing profile picture if it exists
        if (currentProfilePictureUrl) {
            const fileId= await extractIdsFromUrl(currentProfilePictureUrl)
            console.log("fileId: ",fileId)
            await storage.deleteFile('669270af0034381c55c3',); // Delete the file from storage
        }

        const formData = new FormData();
        formData.append('fileId', ID.unique());
        formData.append('file', {
            uri,
            name: `userProfile_${userId}.jpg`,
            type: 'image/jpeg',
        });

        const uploadResponse = await fetch(
            'https://cloud.appwrite.io/v1/storage/buckets/669270af0034381c55c3/files',
            {
                method: 'POST',
                headers: {
                    'X-Appwrite-Project': '66795f4000158aa9d802',
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

        const newImageUrl = `https://cloud.appwrite.io/v1/storage/buckets/669270af0034381c55c3/files/${uploadData.$id}/view?project=66795f4000158aa9d802`;

        await databases.updateDocument(
            '6685cbc40036f4c6a5ad', 
            '6685cc6600212adefdbf', 
            documentId, 
            { profilePicture: newImageUrl }
        );

        return newImageUrl;
    } catch (error) {
        console.error('Failed to upload profile picture:', error);
        throw error;
    }
};


const getUserData = async (userId) => {
    try {
        const response = await databases.listDocuments('6685cbc40036f4c6a5ad', '6685cc6600212adefdbf', [
            Query.equal('userId', userId)
        ]);

        if (response.documents.length === 0) {
            throw new Error('User document not found');
        }

        // Assuming userId is unique, return the first document
        return response.documents[0];
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        throw error;
    }
};

export { addUserToDatabase,uploadProfilePicture,addUsernameToDatabase,addAboutToDatabase,getUserData,getUserProfilePicture };
