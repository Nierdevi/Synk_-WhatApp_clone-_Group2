import { realtime,databases,client } from './appwrite';

const subscribeToCollection = (collectionId, callback) => {
    const unsubscribe = realtime.subscribe(`databases.database_id.collections.${collectionId}.documents`, response => {
        callback(response);
    });
    return unsubscribe;
};


// Example real-time listener function
const subscribeToGroupMessages = (groupId, callback) => {
  client.subscribe(`databases.database_id.collections.groups.documents.${groupId}`, response => {
    callback(response.payload);
  });
};

export { subscribeToCollection,subscribeToGroupMessages };