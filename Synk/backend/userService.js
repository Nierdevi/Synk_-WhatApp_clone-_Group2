import {databases,ID} from './appwrite'


const addUserToDatabase = async (userId, phoneNumber) => {
    try {
        await databases.createDocument('6685cbc40036f4c6a5ad','6685cc6600212adefdbf', 'users',  {
            userId,
            phoneNumber,
            // username,
            // otherUserInfo: [],
        });
    } catch (error) {
        console.error("Failed to add user to the database:", error);
    }
};

export { addUserToDatabase };
