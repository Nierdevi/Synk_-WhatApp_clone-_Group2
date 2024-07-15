import { databases, ID } from './appwrite';
import { Query } from 'appwrite';
import { Alert } from 'react-native';

const handleNetworkError = (error) => {
  console.error(error);
  if (error.message.includes('Network request failed')) {
    Alert.alert('Network Error', 'Please check your network connection and try again.');
  }
};

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
      return response.documents[0];
    } else {
      return null;
    }
  } catch (error) {
    handleNetworkError(error);
    return null;
  }
};

const createChat = async (senderPhoneNumber, recipientPhoneNumber) => {
  try {
    const chatId = ID.unique();

    const response = await databases.createDocument(
      '6685cbc40036f4c6a5ad',
      '6685e691003e5ceef040',
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

    return response;
  } catch (error) {
    handleNetworkError(error);
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
      const formData = new FormData();
      formData.append('fileId', ID.unique());
      formData.append('file', {
        uri: mediaUri,
        name: `chatMedia_${senderId}_${new Date().getTime()}.jpg`,
        type: 'image/jpeg', // Adjust MIME type according to your media type
      });
      // console.log("formData: ",formData)

      const uploadResponse = await fetch(
        'https://cloud.appwrite.io/v1/storage/buckets/669270af0034381c55c3/files',
        {
          method: 'POST',
          headers: {
            'X-Appwrite-Project': '66795f4000158aa9d802',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );
      console.log("uploaded response: ",uploadResponse)
      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || 'Failed to upload media');
      }

      mediaUrl = `https://cloud.appwrite.io/v1/storage/buckets/669270af0034381c55c3/files/${uploadData.$id}/view?project=66795f4000158aa9d802`;
    }
    console.log("mediaUrl uploaded: ",mediaUrl)
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

    await addMessagedContact(senderId, receiverId);

    return response;
  } catch (error) {
    console.log(error)
    handleNetworkError(error);
    return null;
  }
};

const fetchMessages = async (chatId) => {
  try {
    const response = await databases.listDocuments(
      '6685cbc40036f4c6a5ad',
      '6685e691003e5ceef040',
      [Query.equal('chatId', chatId),
        Query.orderDesc('createdAt'),
      ]
    );

    return response.documents;
  } catch (error) {
    handleNetworkError(error);
    return [];
  }
};

const addMessagedContact = async (userPhoneNumber, contactPhoneNumber) => {
  try {
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
    console.log(error)
    // handleNetworkError(error);
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
    return response.documents;
  } catch (error) {
    handleNetworkError(error);
    return [];
  }
};

const fetchMessagedContacts = async (currentUserPhoneNumber) => {
  try {
    const response = await databases.listDocuments(
      '6685cbc40036f4c6a5ad',
      '668aec1c002358157dad',
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
    console.error('Failed to fetch messaged contacts:', error);
    if (error.message.includes('Network request failed')) {
      // Alert.alert('Network Error', 'Please check your network connection.');
    }
    return [];
  }
};

const fetchLastMessage = async (chatId) => {
  try {
    const response = await databases.listDocuments(
      '6685cbc40036f4c6a5ad', // Replace with your collection ID
      '6685e691003e5ceef040', // Replace with your document ID
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
    handleNetworkError(error);
    return null;
  }
};


export { createChat, sendMessage, fetchMessages, getExistingChat, addMessagedContact, fetchMessagedContacts,fetchLastMessage };
