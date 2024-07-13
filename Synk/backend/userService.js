import {databases,ID} from './appwrite'


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
        await databases.updateDocument('6685cbc40036f4c6a5ad', '6685cc6600212adefdbf', userId, {
            username,
        });
    } catch (error) {
        console.error("Failed to add username to the database:", error);
    }
};

// Function to add profile picture to the database
const addProfilePictureToDatabase = async (userId, profilePictureUrl) => {
    try {
        await databases.updateDocument('6685cbc40036f4c6a5ad', '6685cc6600212adefdbf', userId, {
            profilePictureUrl,
        });
    } catch (error) {
        console.error("Failed to add profile picture to the database:", error);
    }
};

export { addUserToDatabase,addProfilePictureToDatabase,addUsernameToDatabase };
