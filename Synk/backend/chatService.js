import AsyncStorage from '@react-native-async-storage/async-storage';
import { databases, ID } from './appwrite';
import { Query } from 'appwrite';
import { Alert } from 'react-native';
import showToast from '../components/showToast';



const getExistingChat = async (senderPhoneNumber, recipientPhoneNumber) => {
  try {
    const response = await databases.listDocuments(
      'database_id',
      'chats',
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
      return response.documents[0];
    } else {
      return null;
    }
  } catch (error) {
    // handleNetworkError(error);
    return null;
  }
};

const createChat = async (senderPhoneNumber, recipientPhoneNumber) => {
  try {
    const chatId = ID.unique();

    const response = await databases.createDocument(
      'database_id',
      'chats',
      chatId,
      {
        chatId,
        senderId: senderPhoneNumber,
        receiverId: recipientPhoneNumber,
        createdAt: new Date().toISOString(),
      }
    );
    // console.log(senderPhoneNumber)
    // console.log(recipientPhoneNumber)
    console.log("chatroom in service: ",response)
    return response;
  } catch (error) {
    // handleNetworkError(error);
    return null;
  }
};

const sendMessage = async (senderId, receiverId, messageText = '', mediaUri = '', type = 'text') => {
  try {
    let chatRoom = await getExistingChat(senderId, receiverId);
    if (!chatRoom) {
      chatRoom = await createChat(senderId, receiverId);
    }
    const chatId = chatRoom.$id;

    let mediaUrl = '';

    // If there's a mediaUri, upload the media and get the URL
    if (mediaUri) {
      console.log("media uri: ",mediaUri)

      const fileExtension = mediaUri.split('.').pop().toLowerCase();
      console.log("file extention")
      let mimeType;

      switch (fileExtension) {
        case 'jpg':
        case 'jpeg':
          mimeType = 'image/jpeg';
          break;
        case 'png':
          mimeType = 'image/png';
          break;
        case 'mp4':
          mimeType = 'video/mp4';
          break;
        case 'mov':
          mimeType = 'video/quicktime';
          break;
        case 'mkv':
          mimeType = 'video/x-matroska';
          break;
        default:
          throw new Error('Unsupported media type');
      }

      console.log("file extention: ",fileExtension)
      console.log("mimitype: ",mimeType)

      const formData = new FormData();
      formData.append('fileId', ID.unique());
      formData.append('file', {
        uri: mediaUri,
        name: `chatMedia_${senderId}_${new Date().getTime()}.${fileExtension}`,
        type: mimeType
      });
      // console.log("formData: ",formData)

      const uploadResponse = await fetch(
        'https://cloud.appwrite.io/v1/storage/buckets/synk_bucket/files',
        {
          method: 'POST',
          headers: {
            'X-Appwrite-Project': '66992806000309150f65',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );
      // console.log("uploaded response: ",uploadResponse)
      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || 'Failed to upload media');
      }

      showToast("Message sent")

      mediaUrl = `https://cloud.appwrite.io/v1/storage/buckets/synk_bucket/files/${uploadData.$id}/view?project=66992806000309150f65`;
    }
    console.log("mediaUrl uploaded: ",mediaUrl)
    showToast("Message sent")
    const response = await databases.createDocument(
      'database_id',
      'chats',
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

    await addMessagedContact(senderId, receiverId);

    return response;
  } catch (error) {
    console.log(error)
    // handleNetworkError(error);
    return null;
  }
};

const fetchMessages = async (chatId) => {
  try {
    const response = await databases.listDocuments(
      'database_id',
      'chats',
      [Query.equal('chatId', chatId), Query.orderDesc('createdAt')]
    );

    const messages = response.documents;
    await AsyncStorage.setItem(`chat_${chatId}`, JSON.stringify(messages));

    const lastMessageId = messages.length > 0 ? messages[0].$id : null;
    return { messages, lastMessageId };
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return { messages: [], lastMessageId: null };
  }
};


const checkForNewMessages = async (chatId, lastMessageId) => {
  try {
    const response = await databases.listDocuments(
      'database_id',
      'chats',
      [Query.equal('chatId', chatId), Query.orderDesc('createdAt'), Query.limit(1)]
    );

    const newMessages = response.documents;

    if (newMessages.length > 0 && newMessages[0].$id !== lastMessageId) {
      const allMessagesResponse = await databases.listDocuments(
        'database_id',
        'chats',
        [Query.equal('chatId', chatId), Query.orderDesc('createdAt')]
      );

      const allMessages = allMessagesResponse.documents;
      await AsyncStorage.setItem(`chat_${chatId}`, JSON.stringify(allMessages));
      return allMessages;
    }
  } catch (error) {
    console.error('Failed to check for new messages:', error);
  }
  return null;
};



const addMessagedContact = async (userPhoneNumber, contactPhoneNumber) => {
  try {
    const existingContactResponse = await databases.listDocuments(
      'database_id',
      'mess_contacts',
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
      await databases.createDocument(
        'database_id',
        'mess_contacts',
        ID.unique(),
        {
          userPhoneNumber,
          contactPhoneNumber,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
    } else {
      const existingContactId = existingContactResponse.documents[0].$id;
      await databases.updateDocument(
        'database_id',
        'mess_contacts',
        existingContactId,
        {
          updatedAt: new Date().toISOString(),
        }
      );
    }
  } catch (error) {
    console.log(error)
    // handleNetworkError(error);
  }
};


const fetchMessagedContacts = async (currentUserPhoneNumber) => {
  try {
    const response = await databases.listDocuments(
      'database_id',
      'mess_contacts',
      [
        Query.or(
          [Query.equal('userPhoneNumber', currentUserPhoneNumber), Query.equal('contactPhoneNumber', currentUserPhoneNumber)]
        ),
        Query.orderDesc('updatedAt'),
      ]
    );

    const uniqueContacts = new Map();

    for (const message of response.documents) {
      const contactPhoneNumber = message.userPhoneNumber === currentUserPhoneNumber
        ? message.contactPhoneNumber
        : message.userPhoneNumber;

      if (contactPhoneNumber && contactPhoneNumber !== currentUserPhoneNumber) {
        let existingChat = await getExistingChat(currentUserPhoneNumber, contactPhoneNumber);
        let lastMessage = null;

        if (existingChat) {
          lastMessage = await fetchLastMessage(existingChat.$id);
        }

        if (!uniqueContacts.has(contactPhoneNumber) || new Date(message.updatedAt) > new Date(uniqueContacts.get(contactPhoneNumber).updatedAt)) {
          uniqueContacts.set(contactPhoneNumber, { ...message, contactPhoneNumber, lastMessage });
        }
      }
    }

    return Array.from(uniqueContacts.values());
  } catch (error) {
    showToast('Network Request Failed')
    console.error('Failed to fetch messaged contacts:', error);
    // }
    return [];
  }
};

const fetchLastMessage = async (chatId) => {
  try {
    const response = await databases.listDocuments(
      'database_id', // Replace with your collection ID
      'chats', // Replace with your document ID
      [
        Query.equal('chatId', chatId),
        Query.orderDesc('createdAt'), // Fetch messages in descending order of createdAt
        Query.limit(1), // Limit to retrieve only the last message
      ]
    );

    if (response.documents.length > 0) {
      return response.documents[0]; // Return the last message document
    } else {
      return null; // Return null if no message found
    }
  } catch (error) {
    console.error("Failed to fetch last message:", error);
    // handleNetworkError(error);
    return null;
  }
};


export { createChat, sendMessage, fetchMessages, getExistingChat, addMessagedContact, fetchMessagedContacts,fetchLastMessage,checkForNewMessages };
