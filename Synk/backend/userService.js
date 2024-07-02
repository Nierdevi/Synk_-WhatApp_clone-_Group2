import {databases,ID} from './appwrite'


const addUserToDatabase = async (userId, username, phoneNumber, profilePicUrl) => {
    try {
        await databases.createDocument('6682d430002d49900dfb','668318c2002986810f9a', 'users',  {
            userId,
            username,
            phoneNumber,
            // otherUserInfo: [],
        });
    } catch (error) {
        console.error("Failed to add user to the database:", error);
    }
};

export { addUserToDatabase };
