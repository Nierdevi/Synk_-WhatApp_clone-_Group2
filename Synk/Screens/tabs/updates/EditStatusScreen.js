import { Feather, Fontisto, Foundation, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { primaryColors } from '../../../constants/colors';

const EditStatusScreen = ({ navigation }) => {
    const [statusText, setStatusText] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#fff');

    const handleSaveStatus = () => {
        // Save the status update
        console.log("Status saved:", statusText);
        // Navigate back or give feedback to the user
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="x" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/* Implement emoji picker */}}>
                    <Ionicons name="happy" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/* Implement emoji picker */}}>
                    <Fontisto name="smiley" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/* Implement color picker */}}>
                    <Ionicons name="color-palette" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
            </View>

            {/* Text Input */}
            <TextInput
                style={styles.textInput}
                placeholder="Type a Status"
                placeholderTextColor="#888"
                value={statusText}
                onChangeText={setStatusText}
                multiline
            />

            {/* Bottom Toolbar */}
            <View style={styles.toolbar}>
                {/* Background Color Picker */}
                <TouchableOpacity onPress={handleSaveStatus}>
                    <Foundation name="microphone" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
                {/* Emoji Picker */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconsContainer: {
        flexDirection: 'row',
        marginLeft: 'auto', // Push icons to the right
        backgroundColor: `rgba(245, 245, 245, ${opacity})`,
        borderRadius: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        color: '#000',
        textAlignVertical: 'top',
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 10,
    },
});

export default EditStatusScreen;