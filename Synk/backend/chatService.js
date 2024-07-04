import { databases, ID } from './appwrite';
import { Query } from 'appwrite';

// Function to check if a chat already exists between two users
const checkExistingChat = async (senderId, recipientId) => {
    try {
        const result = await databases.listDocuments('6685cbc40036f4c6a5ad', '6685e691003e5ceef040', [
            Query.equal('senderId', senderId),
            Query.equal('recipientId', recipientId)
        ]);
        return result.documents.length > 0 ? result.documents[0] : null;
    } catch (error) {
        console.error("Failed to check existing chat:", error);
        throw error;
    }
};

// Function to create a new chat document
const createChat = async (senderId, recipientId) => {
    try {
        const existingChat = await checkExistingChat(senderId, recipientId);

        if (existingChat) {
            return existingChat; // Return existing chat if found
        } else {
            const messageId = ID.unique(); // Generate a unique ID for the chat
            const chat = await databases.createDocument('6685cbc40036f4c6a5ad', '6685e691003e5ceef040', messageId, {
                createdAt: Date.now(), // Current timestamp
                senderId,
                recipientId,
                messageType: '',
                messageContent: '',
                messageStatus: 'created', // Initial status
            });
            return chat; // Return the created chat document
        }
    } catch (error) {
        console.error("Failed to create or retrieve chat:", error);
        throw error;
    }
};

// Function to send a message within a chat
const sendMessage = async (messageId, senderId, recipientId, messageType, messageContent) => {
    try {
        const chat = await databases.getDocument('6685cbc40036f4c6a5ad', '6685e691003e5ceef040', messageId);
        const newMessage = {
            createdAt: Date.now(), // Current timestamp
            senderId,
            recipientId,
            messageType,
            messageContent,
            messageStatus: 'sent', // Initial status
        };

        const updatedChat = await databases.updateDocument('6685cbc40036f4c6a5ad', '6685e691003e5ceef040', messageId, {
            ...chat,
            messages: [...(chat.messages || []), newMessage], // Add new message to the chat's messages array
            lastMessage: messageContent, // Update last message
            lastMessageTime: Date.now(), // Update last message time
        });
        return updatedChat; // Return the updated chat document
    } catch (error) {
        console.error("Failed to send message:", error);
        throw error;
    }
};

export { createChat,sendMessage };
