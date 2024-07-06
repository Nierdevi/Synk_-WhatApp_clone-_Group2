import { databases, ID } from './appwrite';
import { Query } from 'appwrite';

// Function to get an existing chat room
const getExistingChat = async (senderPhoneNumber, recipientPhoneNumber) => {
  try {
    const response = await databases.listDocuments(
      '6685cbc40036f4c6a5ad',
      '6685e691003e5ceef040',
      [
        Query.or(
          [
            Query.and([Query.equal('senderId', senderPhoneNumber), Query.equal('receiverId', recipientPhoneNumber)]),
            Query.and([Query.equal('senderId', recipientPhoneNumber), Query.equal('receiverId', senderPhoneNumber)])
          ]
        )
      ]
    );

    if (response.documents.length > 0) {
      return response.documents[0]; // Return the existing chat room
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to get existing chat room:', error);
    return null;
  }
};

// Function to create a new chat room
const createChat = async (senderPhoneNumber, recipientPhoneNumber) => {
  try {
    const chatId = ID.unique(); // Generate a unique chat ID

    // Create a new document in the ChatsService collection
    const response = await databases.createDocument(
      '6685cbc40036f4c6a5ad',
      '6685e691003e5ceef040', // Replace with your actual ChatsService collection ID
      chatId, // Appwrite auto-generates a unique ID
      {
        chatId: chatId,
        senderId: senderPhoneNumber,
        receiverId: recipientPhoneNumber,
        createdAt: new Date().toISOString(), // Timestamp for when the chat was created
      }
    );

    console.log(response);
    return response; // Return the created chat room data (e.g., document ID)
  } catch (error) {
    console.error('Failed to create chat room:', error);
    return null;
  }
};

// Function to send a message
const sendMessage = async (senderId, receiverId, messageText = '', mediaUrl = '', type = 'text') => {
  try {
    let chatRoom = await getExistingChat(senderId, receiverId);

    if (!chatRoom) {
      // Create a new chat room document if it doesn't exist
      chatRoom = await createChat(senderId, receiverId);
    }

    const chatId = chatRoom.$id; // Use the chat room ID from the created or fetched chat room

    // Send the message
    const response = await databases.createDocument(
      '6685cbc40036f4c6a5ad',
      '6685e691003e5ceef040', 
      ID.unique(), // Appwrite auto-generates a unique ID for the message
      {
        chatId: chatId,
        senderId: senderId,
        receiverId: receiverId,
        messageText: messageText,
        mediaUrl: mediaUrl,
        type: type,
        createdAt: new Date().toISOString(), // Timestamp for when the message was created
      }
    );

    return response; // Return the created message data (e.g., document ID)
  } catch (error) {
    console.error('Failed to send message:', error);
    return null;
  }
};

// Function to fetch messages for a chat room
const fetchMessages = async (chatId) => {
  try {
    const response = await databases.listDocuments(
      '6685cbc40036f4c6a5ad',
      '6685e691003e5ceef040', // Replace with your actual ChatsService collection ID
      [Query.equal('chatId', chatId)]
    );

    return response.documents; // Return the list of messages
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return [];
  }
};

export { createChat, sendMessage, fetchMessages, getExistingChat };
