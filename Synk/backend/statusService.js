import { databases, storage, ID } from './appwrite';

const addStatus = async (userId, mediaUrl, mediaType) => {
    const statusId = ID.unique();
    const createdAt = Date.now();
    const expiryAt = createdAt + 24 * 60 * 60 * 1000; // 24 hours later

    try {
        await databases.createDocument('your_database_id', 'statuses', statusId, {
            userId,
            mediaUrl,
            mediaType,
            createdAt,
            expiryAt,
        });
    } catch (error) {
        console.error("Failed to add status:", error);
    }
};

const getStatuses = async (userId) => {
    try {
        const response = await databases.listDocuments('6682d430002d49900dfb', 'statuses', [
            Query.equal('userId', userId),
            Query.greater('expiryAt', Date.now())
        ]);
        return response.documents;
    } catch (error) {
        console.error("Failed to get statuses:", error);
    }
};

const uploadStatusMedia = async (file) => {
    try {
        const response = await storage.createFile('6682d6370023ed485ca8', ID.unique(), file);
        return response.$id;
    } catch (error) {
        console.error("Failed to upload media:", error);
    }
};


export { addStatus, getStatuses, uploadStatusMedia };
