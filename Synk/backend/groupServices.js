import { Query } from 'appwrite';
import { databases, ID } from './appwrite';


const createGroupChat = async (currentUserPhoneNumber, participants, groupName, description='', groupPicUrl = '') => {
  try {
    const groupId = ID.unique();
    console.log("Creating group with participants:", [currentUserPhoneNumber, ...participants]);
    const response = await databases.createDocument(
      '6685cbc40036f4c6a5ad', // Your database ID
      '6696627c000707e52294', // Replace with your new groupChats collection ID
      groupId,
      {
        groupId,
        groupName,
        participants: [currentUserPhoneNumber, ...participants],
        createdAt: new Date().toISOString(),
        description,
        groupPicUrl,
      }
    );

    await createChat(groupId, currentUserPhoneNumber, [currentUserPhoneNumber, ...participants]);

    return response;
  } catch (error) {
    console.error("Failed to create group chat:", error);
    return null;
  }
};


const uploadGrpProfile = async (uri) => {
  const formData = new FormData();
  formData.append('fileId', ID.unique());
  formData.append('file', {
    uri,
    name: `groupProfile_${ID.unique()}.jpg`, // Provide a unique name for the file
    type: 'image/jpeg', // Adjust the type according to the image format
  });

  const response = await fetch('https://cloud.appwrite.io/v1/storage/buckets/669270af0034381c55c3/files', { // Replace with your Appwrite storage endpoint
    method: 'POST',
    headers: {
      'X-Appwrite-Project': '66795f4000158aa9d802',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  const profileUri = `https://cloud.appwrite.io/v1/storage/buckets/669270af0034381c55c3/files/${data.$id}/view?project=66795f4000158aa9d802`;
  return profileUri;
};

const createChat = async (groupId, currentUserPhoneNumber, participants,messageText='',mediaUrl='',type='text') => {
  try {

    console.log("group id in ..: ",groupId)
    console.log("user id: ",currentUserPhoneNumber)
    const response = await databases.createDocument(
      '6685cbc40036f4c6a5ad',
      '6697b81f001fb40f86af',
      ID.unique(),
      {
        groupId,
        senderId:currentUserPhoneNumber,
        participants: participants.filter(p => p !== currentUserPhoneNumber),
        messageText,
        mediaUrl,
        type,
        createdAt: new Date().toISOString(),
      }
    );

    return response;
  } catch (error) {
    console.error("Failed to create chat:", error);
    return null;
  }
};

const fetchUserGroups = async (currentUserPhoneNumber) => {
  try {
    const response = await databases.listDocuments(
      '6685cbc40036f4c6a5ad',
      '6696627c000707e52294', // Replace with your groupChats collection ID
      [
        Query.equal('participants', currentUserPhoneNumber),
        // Query.orderAsc(`${response.$updatedAt}`)

      ]
    );
    return response.documents;
  } catch (error) {
    console.error("Failed to fetch group chats:", error);
    return [];
  }
};

const fetchGroupMessages = async (groupId) => {
  try {
    const response = await databases.listDocuments(
      '6685cbc40036f4c6a5ad',
      '6697b81f001fb40f86af',
      [Query.equal('groupId', groupId),
        Query.orderDesc('createdAt'),
      ]
    );

    return response.documents;
  } catch (error) {
    handleNetworkError(error);
    return [];
  }
};

const sendGroupMessage = async (groupId, senderId, participants, messageText = '', mediaUri = '', type = 'text') => {
  try {
    let mediaUrl = '';

    // If there's a mediaUri, upload the media and get the URL
    if (mediaUri) {
      const fileExtension = mediaUri.split('.').pop().toLowerCase();
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

      const formData = new FormData();
      formData.append('fileId', ID.unique());
      formData.append('file', {
        uri: mediaUri,
        name: `groupMedia_${groupId}_${new Date().getTime()}.${fileExtension}`,
        type: mimeType
      });

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

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || 'Failed to upload media');
      }

      mediaUrl = `https://cloud.appwrite.io/v1/storage/buckets/669270af0034381c55c3/files/${uploadData.$id}/view?project=66795f4000158aa9d802`;
    }

    const response = await databases.createDocument(
      '6685cbc40036f4c6a5ad',
      '6697b81f001fb40f86af',
      ID.unique(),
      {
        groupId,
        senderId,
        participants,
        messageText,
        mediaUrl,
        type,
        createdAt: new Date().toISOString(),
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};



export { createGroupChat, uploadGrpProfile, createChat, fetchUserGroups,fetchGroupMessages,sendGroupMessage };
