import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import Icon from 'react-native-vector-icons/MaterialIcons';

dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => { 
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('ChatRoom', { chatId: chat.$id, userId: chat.recipientId })} 
            style={styles.container}
        >
            <Image 
                source={{ uri: chat.user.image }}
                style={styles.image}  
            />

            <View style={styles.content}>
                <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.name}>
                        {chat.user.name}
                    </Text>
                    <Text style={styles.subTitle}>
                        {dayjs(chat.lastMessageTime).fromNow(true)}
                    </Text>
                </View>

                <View style={styles.messageRow}>
                    <Text numberOfLines={1} style={styles.subTitle}>
                    {chat.lastMessage?.messageContent}
                    </Text>
                    <Icon
                        name={'done'}
                        size={20}
                        color={'grey'}
                        style={styles.icon}
                    />
                    {chat.unread && <View style={styles.unreadDot} />}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        marginHorizontal: 10,
        marginVertical: 5,
        height: 70,
        flex: 1,
        width: wp('100%')
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    content: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'lightgray'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    name: {
        flex: 1,
        fontWeight: 'bold',
    },
    subTitle: {
        color: 'grey',
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 5,
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        marginLeft: 5,
    },
});

export default ChatListItem;
