import { databases, ID } from './appwrite';
import { Query } from 'appwrite';

// Function to check if a chat already exists between two users
const checkExistingChat = async (senderId, recipientId) => {
    try {
        // Query to check if a chat exists between the sender and recipient (in either direction)
        const result = await databases.listDocuments('6685cbc40036f4c6a5ad', '6685e691003e5ceef040', [
            Query.equal('senderId', senderId),
            Query.equal('recipientId', recipientId),
            Query.or([
                Query.equal('senderId', recipientId),
                Query.equal('recipientId', senderId)
            ])
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
            const chatId = ID.unique(); // Generate a unique ID for the chat
            const chat = await databases.createDocument('6685cbc40036f4c6a5ad', '6685e691003e5ceef040', chatId, {
                createdAt: Date.now(), // Current timestamp
                senderId,
                recipientId,
                messages: [], // Initialize with an empty array of messages
                lastMessage: '',
                lastMessageTime: null,
            });
            return chat; // Return the created chat document
        }
    } catch (error) {
        console.error("Failed to create or retrieve chat:", error);
        throw error;
    }
};

// Function to send a message within a chat
const sendMessage = async (chatId, senderId, messageType, messageContent) => {
    try {
        // Fetch the existing chat document
        const chat = await databases.getDocument('6685cbc40036f4c6a5ad', '6685e691003e5ceef040', chatId);
        
        const newMessage = {
            id: ID.unique(), // Ensure each message has a unique ID
            createdAt: Date.now(), // Current timestamp
            senderId,
            messageType,
            messageContent,
            messageStatus: 'sent', // Initial status
        };

        // Update the chat document with the new message
        const updatedChat = await databases.updateDocument('6685cbc40036f4c6a5ad', '6685e691003e5ceef040', chatId, {
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

export { checkExistingChat, createChat, sendMessage };
