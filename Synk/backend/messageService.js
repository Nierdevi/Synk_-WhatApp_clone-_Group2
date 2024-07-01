import { databases, ID } from './appwrite';

const sendMessage = async (chatId, userId, content, mediaUrl = '', mediaType = '') => {
    try {
        const messageId = ID.unique();
        const message = await databases.createDocument('6682d430002d49900dfb', 'messages', messageId, {
            chatId,
            userId,
            content,
            mediaUrl,
            mediaType,
            sentAt: Date.now(),
            deliveredAt: null,
            seenAt: null,
        });
        return message;
    } catch (error) {
        console.error("Failed to send message:", error);
    }
};

export { sendMessage };
