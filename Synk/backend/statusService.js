import { databases, storage, ID, Query } from './appwrite'; // Added Query import

const addStatus = async (phoneNumber, mediaUrl, mediaType, text = '') => {
    const statusId = ID.unique();
    const createdAt = Date.now();
    const expiryAt = createdAt + 24 * 60 * 60 * 1000; // 24 hours later

    try {
        await databases.createDocument('database_id', 'status', statusId, {
            phoneNumber,
            mediaUrl,
            text,
            mediaType,
            createdAt,
            expiryAt,
        });
    } catch (error) {
        console.error("Failed to add status:", error);
    }
};

const getStatuses = async (phoneNumbers) => { // Modified to take an array of phone numbers
    try {
        const response = await databases.listDocuments('database_id', 'status', [
            Query.in('phoneNumber', phoneNumbers), // Changed to Query.in for multiple phone numbers
            Query.greater('expiryAt', Date.now())
        ]);
        return response.documents;
    } catch (error) {
        console.error("Failed to get statuses:", error);
    }
};

const uploadStatusMedia = async (file) => {
    try {
        const response = await storage.createFile('your_storage_bucket_id', ID.unique(), file);
        return response.$id;
    } catch (error) {
        console.error("Failed to upload media:", error);
    }
};

export { addStatus, getStatuses, uploadStatusMedia };
