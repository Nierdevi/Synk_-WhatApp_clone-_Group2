import {databases,storage,ID} from './appwrite';
import { Query } from 'appwrite';


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

const uploadProfilePicture = async (userId, uri) => {
    try {
        const userDocument = await getUserDocument(userId);
        const documentId = userDocument.$id;
        const currentProfilePictureUrl = await getUserProfilePicture(userId);
        // Step 2: Delete the existing profile picture if it exists
        if (currentProfilePictureUrl) {
            const fileName = currentProfilePictureUrl.split('/').pop(); // Extract filename from URL
            await storage.deleteFile('6682d6370023ed485ca8', fileName); // Delete the file from storage
        }
        // Step 3: Create a file object from the selected image
        const response = await fetch(uri);
        const blob = await response.blob();
        console.log("blob:",blob)

        // Create a unique filename for the new profile picture
        const newFileName = `userProfile_${userId}.jpg`;
        console.log('filename',newFileName)
        // Upload the new image to storage
        const uploadResponse = await storage.createFile('6682d6370023ed485ca8', newFileName, blob);
        console.log("Upload response",uploadResponse)
        // Get the URL of the uploaded image
        const newImageUrl = `https://cloud.appwrite.io/v1/storage/files/${uploadResponse.$id}/view?66795f4000158aa9d802`;

        // Update the user's profile picture URL in the database
        await databases.updateDocument(
            '6685cbc40036f4c6a5ad', // Your database ID
            '6685cc6600212adefdbf', // Your collection ID
            documentId, // Document ID
            { profilePicture: newImageUrl } // Assuming you have a profilePicture field in your document
        );

        return newImageUrl; // Return the URL if needed
    } catch (error) {
        console.error("Failed to upload profile picture:", error);
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
