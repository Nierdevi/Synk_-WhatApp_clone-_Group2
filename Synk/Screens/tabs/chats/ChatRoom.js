import { View, Text,StyleSheet,ImageBackground, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute, } from '@react-navigation/native';
//import talkiobg from '../../../assets/images/talkioBG.png'
import Message from '../../../src/components/Message';
import messages from '../../../assets/data/messages.json'
import InputBox  from '../../../src/components/InputBox';

const ChatRoom = () => {

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({title: route.params.name})
    },[route.params.name])

    return (
        <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.talkiobg } >
            <Flatlist
                    data = {messages}
                    renderItem={({item}) => <Message message={item} />}
                    style={styles.list}
                    inverted
                />
                <InputBox/>
        </KeyboardAvoidingView>
    )
}
const styles=StyleSheet.create({
     talkiobg:{
            flex:1,
        },
        list: {
            padding: 10,
        },
    });

    export default ChatRoom;