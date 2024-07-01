import { databases, ID } from './appwrite';

const createChat = async (userIds) => {
    try {
        const chatId = ID.unique();
        const chat = await databases.createDocument('6682d430002d49900dfb', 'chats', chatId, {
            createdAt: Date.now(),
            lastMessage: '',
            lastMessageTime: null,
            participants: userIds,
        });
        return chat;
    } catch (error) {
        console.error("Failed to create chat:", error);
    }
};

export { createChat };
