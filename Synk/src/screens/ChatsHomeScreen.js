import React from 'react';
import { FlatList } from 'react-native';
const chatsData = require('../../assets/data/chats.json');
import ChatListItem from '../components/ChatListItem';

const ChatsHomeScreen = () => {
  return (
    <FlatList
      data={chatsData}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      keyExtractor={(item) => item.id.toString()} // Assuming each chat item has a unique `id`
    />
  );
};

export default ChatsHomeScreen;
