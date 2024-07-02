import { realtime } from './appwrite';

const subscribeToCollection = (collectionId, callback) => {
    const unsubscribe = realtime.subscribe(`databases.6682d430002d49900dfb.collections.${collectionId}.documents`, response => {
        callback(response);
    });
    return unsubscribe;
};

export { subscribeToCollection };
