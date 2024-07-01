import { databases, ID } from './appwrite';

const createGroup = async (groupName, userIds) => {
    try {
        const groupId = ID.unique();
        const group = await databases.createDocument('6682d430002d49900dfb', 'groups', groupId, {
            groupName,
            createdAt: Date.now(),
            groupPicUrl: '',
            participants: userIds,
        });
        return group;
    } catch (error) {
        console.error("Failed to create group:", error);
    }
};

export { createGroup };
