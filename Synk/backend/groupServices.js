import { Query } from 'appwrite';
import { databases, ID } from './appwrite';
import showToast from '../components/showToast';


const createGroupChat = async (currentUserPhoneNumber, participants, groupName, description='', groupPicUrl = '') => {
  try {
    const groupId = ID.unique();
    console.log("Creating group with participants:", [currentUserPhoneNumber, ...participants]);
    const response = await databases.createDocument(
      'database_id', // Your database ID
      'groups', // Replace with your new groupChats collection ID
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

  const response = await fetch('https://cloud.appwrite.io/v1/storage/buckets/synk_bucket/files', { // Replace with your Appwrite storage endpoint
    method: 'POST',
    headers: {
      'X-Appwrite-Project': '66992806000309150f65',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  const profileUri = `https://cloud.appwrite.io/v1/storage/buckets/synk_bucket/files/${data.$id}/view?project=66992806000309150f65`;
  return profileUri;
};

const createChat = async (groupId, currentUserPhoneNumber, participants,messageText='',mediaUrl='',type='text') => {
  try {

    console.log("group id in ..: ",groupId)
    console.log("user id: ",currentUserPhoneNumber)
    const response = await databases.createDocument(
      'database_id',
      'g_chats',
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
      'database_id',
      'groups', // Replace with your groupChats collection ID
      [
        Query.equal('participants', currentUserPhoneNumber),
        Query.orderDesc('createdAt')

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
      'database_id',
      'g_chats',
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
    console.log("groupId in services: ",groupId)
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

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || 'Failed to upload media');
      }

      mediaUrl = `https://cloud.appwrite.io/v1/storage/buckets/synk_bucket/files/${uploadData.$id}/view?project=66992806000309150f65`;
    }
    showToast("Message Sent")
    const response = await databases.createDocument(
      'database_id',
      'g_chats',
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



const fetchUserGroupsWithLastMessages = async (phoneNumber) => {
  try {
    // Fetch the user's groups from the groups collection
    const response = await databases.listDocuments('database_id', 'groups', [
      Query.equal('participants', phoneNumber),
      Query.orderDesc('createdAt'),
    ]);

    const groups = response.documents;

    // Fetch the last messages for each group from the g_chats collection
    const groupsWithLastMessages = await fetchLastMessagesForGroups(groups);

    return groupsWithLastMessages;
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return [];
  }
};

const fetchLastMessagesForGroups = async (groups) => {
  try {
    const groupLastMessages = await Promise.all(
      groups.map(async (group) => {
        try {
          const lastMessageResponse = await databases.listDocuments('database_id', 'g_chats', [
            Query.equal('groupId', group.groupId),
            Query.orderDesc('createdAt'),
            Query.limit(1),
          ]);

          const lastMessage = lastMessageResponse.documents[0] || null;

          return { ...group, lastMessage };
        } catch (error) {
          console.error('Error fetching last message for group:', group.groupId, error);
          return { ...group, lastMessage: null };
        }
      })
    );

    return groupLastMessages;
  } catch (error) {
    console.error('Error fetching last messages for groups:', error);
    return groups.map(group => ({ ...group, lastMessage: null }));
  }
};




export { createGroupChat, uploadGrpProfile, createChat, fetchUserGroups,fetchGroupMessages,sendGroupMessage, fetchUserGroupsWithLastMessages};
