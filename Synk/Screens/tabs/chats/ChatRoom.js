import { View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Message from '../../../src/components/Message';
import InputBox from '../../../src/components/InputBox';
import { createChat, sendMessage } from '../../../backend/chatService';
import { databases } from '../../../backend/appwrite';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();
    const senderId = 'currentUserId'; // Replace with the actual current user ID

    useEffect(() => {
        navigation.setOptions({ title: route.params.name });

        const initializeChat = async () => {
            try {
                const recipientId = route.params.userId; // Assuming you pass recipient user ID through route params
                const chat = await createChat(senderId, recipientId);
                setChatId(chat.$id);
                setMessages(chat.messages || []);
            } catch (error) {
                console.error('Error initializing chat:', error);
            }
        };

        initializeChat();
    }, [route.params.name, route.params.userId]);

    const handleSendMessage = async (messageContent) => {
        if (!chatId) {
            Alert.alert('Error', 'Chat not initialized');
            return;
        }

        try {
            const updatedChat = await sendMessage(chatId, senderId, 'text', messageContent);
            setMessages(updatedChat.messages);
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Error', 'Failed to send message');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.talkiobg}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Message message={item} />}
                style={styles.list}
                inverted
                keyExtractor={(item) => item.id}
            />
            <InputBox onSendMessage={handleSendMessage} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    talkiobg: {
        flex: 1,
    },
    list: {
        padding: 10,
    },
});

export default ChatRoom;
