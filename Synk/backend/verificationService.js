import { account,ID } from "./appwrite";

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

export { createUser, verifyUser };