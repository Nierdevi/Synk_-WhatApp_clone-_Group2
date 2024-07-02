import {databases,ID} from './appwrite'


const addUserToDatabase = async (userId, username, phoneNumber, profilePicUrl) => {
    try {
        await databases.createDocument('6682d430002d49900dfb', 'users', userId, {
            username,
            phoneNumber,
            profilePicUrl,
            otherUserInfo: {},
        });
    } catch (error) {
        console.error("Failed to add user to the database:", error);
    }
};

export { addUserToDatabase };
