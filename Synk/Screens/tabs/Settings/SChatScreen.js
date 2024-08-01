import { StyleSheet, Text, View, Pressable, Modal, Switch, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import RadioButton from '../../../components/RadioButton';
import { SecondaryColors } from '../../../constants/colors';

const SChatScreen = () => {
    const navigation = useNavigation();

    const [autoUpdate, setAutoUpdate] = useState(false);
    const [notifyUpdate, setNotifyUpdate] = useState(true);
    
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [isDrawerVisible1, setIsDrawerVisible1] = useState(false);

    const [previousTheme, setPreviousTheme] = useState('System default');
    const [previousFontSize, setPreviousFontSize] = useState('Medium');
    const [selectedLastSeenValue, setSelectedLastSeenValue] = useState('System default');
    const [selectedOnlineValue, setSelectedOnlineValue] = useState('Medium');

    const toggleDrawer = () => {
        setPreviousTheme(selectedLastSeenValue);
        setIsDrawerVisible(true);
    };

    const closeModal = () => {
        setIsDrawerVisible(false);
    };

    const cancelModal = () => {
        setSelectedLastSeenValue(previousTheme);
        setIsDrawerVisible(false);
    };

    const toggleDrawer1 = () => {
        setPreviousFontSize(selectedOnlineValue);
        setIsDrawerVisible1(true);
    };

    const closeModal1 = () => {
        setIsDrawerVisible1(false);
    };

    const cancelModal1 = () => {
        setSelectedOnlineValue(previousFontSize);
        setIsDrawerVisible1(false);
    };

    const stopPropagation = event => {
        event.stopPropagation();
    };

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const toggleSwitch1 = () => {
        setIsEnabled1(previousState => !previousState);
    };

    const toggleSwitch2 = () => {
        setIsEnabled2(previousState => !previousState);
    };

    const handleLastSeenRadioPress = (value) => {
        setSelectedLastSeenValue(value);
    };

    const handleOnlineRadioPress = (value) => {
        setSelectedOnlineValue(value);
    };

     // Prevent propagation of press events to the parent elements
     const stopPropagation1 = event => {
        event.stopPropagation();
    };

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
                        <TouchableOpacity onPress={toggleDrawer} style={styles.head}>
                            <MaterialIcons name="brightness-medium" size={24} style={styles.icon} />
                            <View>
                                <Text style={styles.you}>Theme</Text>
                                <Text style={styles.him1}>{selectedLastSeenValue}</Text> 
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.head}>
                            <MaterialIcons name="insert-photo" size={24} style={styles.icon} />
                            <View>
                                <Text style={styles.you}>Wallpaper</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.her}>
                    <View style={styles.pad}>
                        <Text style={styles.him}>Chat settings</Text>
                        <TouchableOpacity onPress={toggleSwitch} style={styles.head}>
                            <View style={{ left: 45 }}>
                                <Text style={styles.you}>Enter is send</Text>
                                <Text style={styles.him}>Enter key will send your message</Text>
                            </View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#ffffff' }}
                                thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style={styles.switch}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleSwitch1} style={styles.head}>
                            <View style={{ left: 45 }}>
                                <Text style={styles.you}>Media visibility</Text>
                                <Text style={styles.him1}>Show newly downloaded media in your</Text>
                                <Text style={styles.him1}>device's gallery</Text>
                            </View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#ffffff' }}
                                thumbColor={isEnabled1 ? '#ffffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch1}
                                value={isEnabled1}
                                style={styles.switch1}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleDrawer1} style={styles.head}>
                            <View style={{ left: 45 }}>
                                <Text style={styles.you}>Font size</Text>
                                <Text style={styles.him1}>{selectedOnlineValue}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.her}>
                    <View style={styles.pad}>
                        <Text style={styles.him}>Archived chats</Text>
                        <TouchableOpacity onPress={toggleSwitch2} style={styles.head}>
                            <View style={{ left: 45 }}>
                                <Text style={styles.you}>Keep chats archived</Text>
                                <Text style={styles.him1}>Archived chats will remain</Text>
                                <Text style={styles.him1}>archived when you receive a new</Text>
                                <Text style={styles.him1}>message</Text>
                            </View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#ffffff' }}
                                thumbColor={isEnabled2 ? '#ffffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2}
                                value={isEnabled2}
                                style={styles.switch}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <View style={styles.pad}>
                        <TouchableOpacity style={styles.head1}>
                            <Ionicons name="cloud-upload" size={24} style={styles.icon} />
                            <View>
                                <Text style={styles.you}>Chat backup</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.head1}>
                            <MaterialIcons name="send-to-mobile" size={24} style={styles.icon} />
                            <View>
                                <Text style={styles.you}>Transfer chats</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.head1}>
                            <MaterialIcons name="history" size={24} style={styles.icon} />
                            <View>
                                <Text style={styles.you}>Chat history</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* First drawer */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDrawerVisible}
                onRequestClose={() => {
                    setIsDrawerVisible(false);
                }}
            >
                <Pressable style={styles.modalContainer} onPress={closeModal}>
                    <Pressable style={styles.drawerContent} onPress={stopPropagation}>
                        <View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.drawerText}>Choose theme</Text>
                                <RadioButton
                                    label="System default"
                                    value="System default"
                                    selected={selectedLastSeenValue === 'System default'}
                                    onPress={() => handleLastSeenRadioPress('System default')}
                                />
                                <RadioButton
                                    label="Light"
                                    value="Light"
                                    selected={selectedLastSeenValue === 'Light'}
                                    onPress={() => handleLastSeenRadioPress('Light')}
                                />
                                <RadioButton
                                    label="Dark"
                                    value="Dark"
                                    selected={selectedLastSeenValue === 'Dark'}
                                    onPress={() => handleLastSeenRadioPress('Dark')}
                                />
                            </View>
                            <View style={styles.yeah}>
                                <Pressable onPress={cancelModal}>
                                    <Text style={styles.damn}>Cancel</Text>
                                </Pressable>
                                <Pressable onPress={closeModal} style={{ marginLeft: 40, marginRight: 20 }}>
                                    <Text style={styles.damn}>Ok</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>

            {/* Second drawer */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDrawerVisible1}
                onRequestClose={() => {
                    setIsDrawerVisible1(false);
                }}
            >
                <Pressable style={styles.modalContainer} onPress={closeModal1}>
                    <Pressable style={styles.drawerContent} onPress={stopPropagation1}>
                        <View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.drawerText}>Choose font size</Text>
                                <RadioButton
                                    label="Small"
                                    value="Small"
                                    selected={selectedOnlineValue === 'Small'}
                                    onPress={() => handleOnlineRadioPress('Small')}
                                />
                                <RadioButton
                                    label="Medium"
                                    value="Medium"
                                    selected={selectedOnlineValue === 'Medium'}
                                    onPress={() => handleOnlineRadioPress('Medium')}
                                />
                                <RadioButton
                                    label="Large"
                                    value="Large"
                                    selected={selectedOnlineValue === 'Large'}
                                    onPress={() => handleOnlineRadioPress('Large')}
                                />
                            </View>
                            <View style={styles.yeah}>
                                <Pressable onPress={cancelModal1}>
                                    <Text style={styles.damn}>Cancel</Text>
                                </Pressable>
                                <Pressable onPress={closeModal1} style={{ marginLeft: 40, marginRight: 20 }}>
                                    <Text style={styles.damn}>Ok</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

export default SChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SecondaryColors.secPurple,
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
    her: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
    },
    him: {
        fontSize: 13,
        color: 'grey',
        paddingBottom: 10,
    },
    him1: {
        fontSize: 13,
        color: 'grey',
    },
    you: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    head: {
        flexDirection: 'row',
        paddingBottom: 25,
    },
    head1: {
        flexDirection: 'row',
        paddingBottom: 35,
    },
    icon: {
        color: "black",
        paddingRight: 20,
    },
    pad: {
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        alignItems: 'center',
        marginTop: 30,
    },
    drawerContent: {
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        width: '80%',
        borderRadius: 20,
    },
    drawerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    drawerText2: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 15,
        color: 'white',
    },
    drawerText3: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 15,
        color: 'black',
    },
    drawerText1: {
        fontSize: 13,
        paddingTop: 10,
        marginBottom: 10,
        paddingLeft: 15,
        color: 'grey',
        lineHeight: 14,
    },
    closeButton: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    plus: {
        backgroundColor: 'blue',
        width: '85%',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    plus1: {
        backgroundColor: '#ddebdf',
        width: '85%',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    yeah: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    damn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#59c96b',
    },
});
