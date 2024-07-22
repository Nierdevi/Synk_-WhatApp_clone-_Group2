import { Feather, FontAwesome5, Foundation, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { primaryColors } from '../../../constants/colors';

const EditStatusScreen = ({ navigation }) => {
    const [statusText, setStatusText] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#fff');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('myContacts');

    const handleSaveStatus = () => {
        console.log("Status saved:", statusText);
        navigation.goBack();
    };

    const handleDone = () => {
        setModalVisible(false);
    };

    const options = [
        { label: 'My Contacts', value: 'myContacts' },
        { label: 'My Contacts Except...', value: 'myContactsExcept', rightText: '0 excluded' },
        { label: 'Only Share...', value: 'onlyShare', rightText: '0 included' },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={[styles.icon, styles.happyIcon]} onPress={() => navigation.goBack()}>
                    <Feather name="x" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={[styles.icon, styles.happyIcon]} onPress={() => {/* Implement emoji picker */}}>
                        <Ionicons name="happy" size={24} color={primaryColors.purple} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.icon, styles.smileyIcon]} onPress={() => {/* Implement font picker */}}>
                        <FontAwesome5 name="font" size={24} color={primaryColors.purple} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.icon, styles.paletteIcon]} onPress={() => {/* Implement color picker */}}>
                        <Ionicons name="color-palette" size={24} color={primaryColors.purple} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Text Input */}
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type a Status"
                    placeholderTextColor="#888"
                    value={statusText}
                    onChangeText={setStatusText}
                    multiline
                />
            </View>

            {/* Bottom Toolbar */}
            <View style={styles.toolbar}>
                {/* My Contacts Button */}
                <TouchableOpacity style={styles.myContactsButton} onPress={() => setModalVisible(true)}>
                    <FontAwesome5 name="circle-notch" size={20} color="white" />
                    <Text style={styles.myContactsButtonText}> Status (Contacts)</Text>
                </TouchableOpacity>
                {/* Microphone Button */}
                <TouchableOpacity style={[styles.icon, styles.happyIcon]} onPress={handleSaveStatus}>
                    <Foundation name="microphone" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
            </View>

            {/* Modal for selecting options */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.dash} />
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Who can see my status updates</Text>
                        {options.map((option) => (
                            <Pressable
                                key={option.value}
                                style={styles.radioButtonContainer}
                                onPress={() => {
                                    setSelectedOption(option.value);
                                    setModalVisible(false);
                                }}
                            >
                                <FontAwesome5
                                    name={selectedOption === option.value ? "dot-circle" : "circle"}
                                    size={20}
                                    color={primaryColors.purple}
                                />
                                <Text style={styles.radioButtonLabel}>{option.label}</Text>
                                {option.rightText && <Text style={styles.rightText}>{option.rightText}</Text>}
                            </Pressable>
                        ))}
                        {/* Done Button */}
                        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'whitesmoke',
        marginTop: 30, // Ensure no margin at the top
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconsContainer: {
        flexDirection: 'row',
        marginLeft: 'auto', // Push icons to the right
    },
    icon: {
        marginHorizontal: 8, // Add horizontal margin to create padding between icons
        padding: 10,
        borderRadius: 8,
    },
    happyIcon: {
        backgroundColor: `lightgrey`,
        borderRadius: 25,
    },
    smileyIcon: {
        backgroundColor: `lightgrey`,
        borderRadius: 25,
    },
    paletteIcon: {
        backgroundColor: `lightgrey`,
        borderRadius: 25,
    },
    textInputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: '80%',
        fontSize: 30,
        color: '#000',
        textAlignVertical: 'top',
        textAlign: 'center', // Center the text inside the input
        marginBottom: 20,
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Adjusted to align items to space-between
        alignItems: 'center',
        marginTop: 10,
    },
    myContactsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: primaryColors.purple,
        borderRadius: 25,
    },
    myContactsButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 8, // Space between the icon and text
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Align the modal content to the bottom
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    dash: {
        width: 40,
        height: 4,
        backgroundColor: 'whitesmoke',
        borderRadius: 5,
        marginTop: 10, // Space above the dash
    },
    modalContent: {
        width: '100%', // Make the content fit the width of the screen
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
        paddingTop: 0, // Removed paddingTop so the dash is directly on the modal container
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15, // Space between title and options
        paddingTop: 50,
        paddingBottom: 50,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        marginVertical: 10,
    },
    radioButtonLabel: {
        fontSize: 16,
        flex: 1,
        paddingLeft: 10,
    },
    rightText: {
        fontSize: 16,
        color: '#888', // Adjust color if needed
        textAlign: 'right', // Align text to the right
    },
    doneButton: {
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: primaryColors.purple,
        borderRadius: 25,
        alignItems: 'center',
    },
    doneButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default EditStatusScreen;
