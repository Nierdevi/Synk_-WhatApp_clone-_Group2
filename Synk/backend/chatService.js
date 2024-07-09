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

    // console.log(response);
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
      chatRoom = await createChat(senderId, receiverId);
    }
    const chatId = chatRoom.$id;
    const response = await databases.createDocument(
      '6685cbc40036f4c6a5ad',
      '6685e691003e5ceef040', 
      ID.unique(),
      {
        chatId,
        senderId,
        receiverId,
        messageText,
        mediaUrl,
        type,
        createdAt: new Date().toISOString(),
      }
    );

    // Add contacts to MessagedContacts
    await addMessagedContact(senderId, receiverId);

    return response;
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

const addMessagedContact = async (userPhoneNumber, contactPhoneNumber) => {
  try {
    // Check if the contact already exists
    const existingContactResponse = await databases.listDocuments(
      '6685cbc40036f4c6a5ad',
      '668aec1c002358157dad',
      [
        Query.or(
          [
            Query.and([Query.equal('userPhoneNumber', userPhoneNumber), Query.equal('contactPhoneNumber', contactPhoneNumber)]),
            Query.and([Query.equal('userPhoneNumber', contactPhoneNumber), Query.equal('contactPhoneNumber', userPhoneNumber)])
          ]
        )
      ]
    );

    if (existingContactResponse.documents.length === 0) {
      // Add the new contact
      await databases.createDocument(
        '6685cbc40036f4c6a5ad',
        '668aec1c002358157dad',
        ID.unique(),
        {
          userPhoneNumber,
          contactPhoneNumber,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
    } else {
      // Update the existing contact's updatedAt field
      const existingContactId = existingContactResponse.documents[0].$id;
      await databases.updateDocument(
        '6685cbc40036f4c6a5ad',
        '668aec1c002358157dad',
        existingContactId,
        {
          updatedAt: new Date().toISOString(),
        }
      );
    }
  } catch (error) {
    console.error('Failed to add messaged contact:', error);
  }
};

const fetchUserMessages = async (userPhoneNumber) => {
  try {
    const response = await databases.listDocuments(
      '6685cbc40036f4c6a5ad',
      '668aec1c002358157dad',
      [
        Query.or(
          [Query.equal('userPhoneNumber', userPhoneNumber), Query.equal('contactPhoneNumber', userPhoneNumber)]
        )
      ]
    );
      // console.log(response)
    return response.documents;
  } catch (error) {
    console.error('Failed to fetch messaged contacts:', error);
    return [];
  }
};

const fetchMessagedContacts = async (currentUserPhoneNumber) => {
  try {
    const messages = await fetchUserMessages(currentUserPhoneNumber);

    const uniqueContacts = new Set();

    messages.forEach(message => {
      // Determine the contact's phone number based on whether currentUserPhoneNumber
      // matches the userPhoneNumber or contactPhoneNumber in each message
      const contactPhoneNumber = message.userPhoneNumber === currentUserPhoneNumber
        ? message.contactPhoneNumber
        : message.userPhoneNumber;

      // Add the contact's phone number to uniqueContacts if it's different from currentUserPhoneNumber
      if (contactPhoneNumber && contactPhoneNumber !== currentUserPhoneNumber) {
        uniqueContacts.add(contactPhoneNumber);
      }
    });

    // Convert Set to Array and return the list of unique contact phone numbers
    const contacts = Array.from(uniqueContacts);
    // console.log(contacts)
    return contacts;
  } catch (error) {
    console.error('Failed to fetch messaged contacts:', error);
    return []; // Return an empty array or handle error as needed
  }
};


export { createChat, sendMessage, fetchMessages, getExistingChat,addMessagedContact ,fetchMessagedContacts};
