import { databases, ID } from './appwrite';

const createGroupChat = async (currentUserPhoneNumber, participants, groupName, description='', groupPicUrl = '') => {
  try {
    const groupId = ID.unique();

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

    return response;
  } catch (error) {
    console.error("Failed to create group chat:", error);
    return null;
  }
};

export { createGroupChat };
