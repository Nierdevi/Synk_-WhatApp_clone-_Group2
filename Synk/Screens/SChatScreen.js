import { StyleSheet, Text, View, Pressable, } from 'react-native';
import React from 'react';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView, Switch, TouchableOpacity } from 'react-native-gesture-handler';


const SChatScreen = () => {
    const navigation = useNavigation();

    const [autoUpdate, setAutoUpdate] = useState(false);
    const [notifyUpdate, setNotifyUpdate] = useState(true);

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>Chats</Text>
        </View>

        <ScrollView>
            <View style={styles.her}>
                <View style={styles.pad}>
                    <Text style={styles.him}>Display</Text>
                    <View style={styles.head}>
                        <MaterialIcons name="brightness-medium" size={24} style={styles.icon} />
                        <View>
                        <Text style={styles.you}>Theme</Text>
                        <Text style={styles.him1}>Dark</Text>
                        </View>
                    </View>

                    <View style={styles.head}>
                        <MaterialIcons name="insert-photo" size={24} style={styles.icon} />
                        <View>
                        <Text style={styles.you}>Wallpaper</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.her}>
                <View style={styles.pad}>
                    <Text style={styles.him}>Chat settings</Text>
                    <View style={styles.head}>
                        <View style={{left: 45,}}>
                            <Text style={styles.you}>Enter is send</Text>
                            <Text style={styles.him}>Enter key will send your message</Text>
                        </View>
                        <Switch
                            value={autoUpdate}
                            onValueChange={(value) => setAutoUpdate(value)}
                            style={styles.switch}
                        />
                    </View>

                    <View style={styles.head}>
                        <View style={{left: 45,}}>
                            <Text style={styles.you}>Media visibility</Text>
                            <Text style={styles.him1}>Show newly downloaded media in your</Text>
                            <Text style={styles.him1}>device's gallery</Text>
                        </View>
                        <Switch
                            value={autoUpdate}
                            onValueChange={(value) => setAutoUpdate(value)}
                            style={styles.switch1}
                        />
                    </View>

                    <View style={styles.head}>
                        <View style={{left: 45,}}>
                            <Text style={styles.you}>Font size</Text>
                            <Text style={styles.him1}>Medium</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.her}>
                <View style={styles.pad}>
                    <Text style={styles.him}>Archived chats</Text>
                    <View style={styles.head}>
                        <View style={{left: 45,}}>
                            <Text style={styles.you}>Keep chats archived</Text>
                            <Text style={styles.him1}>Archived chats will remain</Text>
                            <Text style={styles.him1}>archived when you receive a new</Text>
                            <Text style={styles.him1}>message</Text>
                        </View>
                        <Switch
                            value={autoUpdate}
                            onValueChange={(value) => setAutoUpdate(value)}
                            style={styles.switch}
                        />
                    </View>
                </View>
            </View>

            <View>
                <View style={styles.pad}>
                    <View style={styles.head1}>
                        <Ionicons name="cloud-upload" size={24} style={styles.icon} />
                        <View>
                            <Text style={styles.you}>Chat backup</Text>
                        </View>
                    </View>

                    <View style={styles.head1}>
                        <MaterialIcons name="send-to-mobile" size={24} style={styles.icon} />
                        <View>
                            <Text style={styles.you}>Transfer chats</Text>
                        </View>
                    </View>

                    <View style={styles.head1}>
                        <MaterialIcons name="history" size={24} style={styles.icon} />
                        <View>
                            <Text style={styles.you}>Chat history</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
    )
}

export default SChatScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'yellow',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
        backgroundColor: 'white',
        paddingTop: 50,
        paddingLeft: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 10,
        paddingRight: 250,
    },
    her:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
    },
    him:{
        fontSize: 13,
        color: 'grey',
        paddingBottom:10,
    },
    him1:{
        fontSize: 13,
        color: 'grey',
    },
    you:{
        fontWeight: 'bold',
        fontSize: 15,
    },
    head:{
        flexDirection: 'row',
        paddingBottom: 25,
    },
    head1:{
        flexDirection: 'row',
        paddingBottom: 35,
    },
    icon:{
        color: "black", 
        paddingRight: 20,
    },
    pad:{
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    switch: {
        marginLeft: 100,
    },
    switch1: {
        marginLeft: 73,
    },
})