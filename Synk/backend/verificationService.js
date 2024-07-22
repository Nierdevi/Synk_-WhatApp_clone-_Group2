import { account, databases,ID } from "./appwrite";
import { Query } from "appwrite";
import { Alert } from "react-native";

const createUser = async (phoneNumber) => {
    try {
        const token = await account.createPhoneToken(ID.unique(), phoneNumber);
        return token;
    } catch (error) {
        console.error("Failed to create phone token:", error);
        Alert.alert("Oops!","Failed to create phone token")
    }
};

const verifyUser = async (userId, otp) => {
    try {
        const session = await account.createSession(userId, otp);
        return session;
    } catch (error) {
        console.error("Failed to verify user:", error);
        Alert.alert("Oops!","Failed to verify user")
    }
};

const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw new Error('Failed to get current account.');

        const response = await databases.listDocuments(
            'database_id',
            'users',
            [Query.equal("userId", currentAccount.$id)]
        );

        if (!response.documents || response.documents.length === 0) {
            throw new Error('No user found with the given user ID.');
        }

        console.log(response.documents[0]);
        return response.documents[0];
    } catch (error) {
        console.error('Error getting current user:', error);
        throw new Error('Failed to get current user: ' + error.message);
    }
};


export { createUser, verifyUser,getCurrentUser };