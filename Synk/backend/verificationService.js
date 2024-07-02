import { account, databases,ID } from "./appwrite";
import { Query } from "appwrite";

const createUser = async (phoneNumber) => {
    try {
        const token = await account.createPhoneToken(ID.unique(), phoneNumber);
        return token;
    } catch (error) {
        console.error("Failed to create phone token:", error);
    }
};

const verifyUser = async (userId, otp) => {
    try {
        const session = await account.updatePhoneSession(userId, otp);
        return session;
    } catch (error) {
        console.error("Failed to verify user:", error);
    }
};

 const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw new Error();
        const currentUSer = await databases.listDocuments(
        '6682d430002d49900dfb',
        '668318c2002986810f9a',
        [Query.equal("userId", currentAccount.$id)]
        );

        if (!currentUSer) throw Error;
        console.log(currentUSer)
        return currentUSer.documents[0];
    } catch (error) {
        throw new Error(error);
    }
};

export { createUser, verifyUser,getCurrentUser };