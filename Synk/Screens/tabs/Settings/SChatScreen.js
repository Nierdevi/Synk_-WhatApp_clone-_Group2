import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import React from 'react';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import { SecondaryColors } from '../../../constants/colors';
import RadioButton from '../../../components/RadioButton';


const SChatScreen = () => {
    const navigation = useNavigation();

    const [autoUpdate, setAutoUpdate] = useState(false);
    const [notifyUpdate, setNotifyUpdate] = useState(true);
    
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);

    const [isDrawerVisible, setIsDrawerVisible] = useState(false); // State for drawer visibility
    const toggleDrawer = () => {
        setIsDrawerVisible(!isDrawerVisible);
      };
      
      const closeModal = () => {
        setIsDrawerVisible(false);
      };
      
      // Prevent propagation of press events to the parent elements
      const stopPropagation = event => {
        event.stopPropagation();
      };
      // second drawer
    const [isDrawerVisible1, setIsDrawerVisible1] = useState(false); // State for drawer visibility
     const toggleDrawer1 = () => {
          setIsDrawerVisible1(!isDrawerVisible);
        };
        
        const closeModal1 = () => {
          setIsDrawerVisible1(false);
        };
        
        // Prevent propagation of press events to the parent elements
        const stopPropagation1 = event => {
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

    const [selectedLastSeenValue, setSelectedLastSeenValue] = useState(null);
    const handleLastSeenRadioPress = (value) => {
        setSelectedLastSeenValue(value);
    };

    const [selectedOnlineValue, setSelectedOnlineValue] = useState(null);
    const handleOnlineRadioPress = (value) => {
        setSelectedOnlineValue(value);
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
                        <Text style={styles.him1}>Dark</Text>
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
                        <View style={{left: 45,}}>
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
                        <View style={{left: 45,}}>
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
                        <View style={{left: 45,}}>
                            <Text style={styles.you}>Font size</Text>
                            <Text style={styles.him1}>Medium</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.her}>
                <View style={styles.pad}>
                    <Text style={styles.him}>Archived chats</Text>
                    <TouchableOpacity onPress={toggleSwitch2} style={styles.head}>
                        <View style={{left: 45,}}>
                            <Text style={styles.you}>Keep chats archived</Text>
                            <Text style={styles.him1}>Archived chats will remain</Text>
                            <Text style={styles.him1}>archived when you receive a new</Text>
                            <Text style={styles.him1}>message</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: '#ffffff' }}
                            thumbColor={isEnabled2 ? '#ffffff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch1}
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
                <View style={{marginBottom: 10}}>
                    <Text style={styles.drawerText}>Choose theme</Text>
                    <RadioButton
                        label="System default"
                        value="lastSeenOption1"
                        selected={selectedLastSeenValue === 'lastSeenOption1'}
                        onPress={handleLastSeenRadioPress}
                    />
                    <RadioButton
                        label="Light"
                        value="lastSeenOption2"
                        selected={selectedLastSeenValue === 'lastSeenOption2'}
                        onPress={handleLastSeenRadioPress}
                    />
                    <RadioButton
                        label="Dark"
                        value="lastSeenOption3"
                        selected={selectedLastSeenValue === 'lastSeenOption3'}
                        onPress={handleLastSeenRadioPress}
                    />
                </View>
                <View style={styles.yeah}>
                    <Pressable>
                        <Text style={styles.damn}>Cancel</Text>
                    </Pressable>
                    <Pressable style={{marginLeft:40, marginRight: 20}}>
                        <Text style={styles.damn}>Ok</Text>
                    </Pressable>
                </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      {/* second drawer */}
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
                <View style={{marginBottom: 10}}>
                    <Text style={styles.drawerText}>Choose theme</Text>
                    <RadioButton
                        label="Small"
                        value="selectedOnlineValue1"
                        selected={selectedOnlineValue === 'selectedOnlineValue1'}
                        onPress={handleOnlineRadioPress}
                    />
                    <RadioButton
                        label="Medium"
                        value="selectedOnlineValue2"
                        selected={selectedOnlineValue === 'selectedOnlineValue2'}
                        onPress={handleOnlineRadioPress}
                    />
                    <RadioButton
                        label="Large"
                        value="selectedOnlineValue3"
                        selected={selectedOnlineValue === 'selectedOnlineValue3'}
                        onPress={handleOnlineRadioPress}
                    />
                </View>
                <View style={styles.yeah}>
                    <Pressable>
                        <Text style={styles.damn}>Cancel</Text>
                    </Pressable>
                    <Pressable style={{marginLeft:40, marginRight: 20}}>
                        <Text style={styles.damn}>Ok</Text>
                    </Pressable>
                </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
    )
}

export default SChatScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:SecondaryColors.secPurple,
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
      plus:{
        backgroundColor: 'blue',
        width: '85%',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      },
      plus1:{
        backgroundColor: '#ddebdf',
        width: '85%',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
        yeah:{
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        damn:{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#59c96b',
        },
})