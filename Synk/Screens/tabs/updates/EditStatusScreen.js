import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
                    <Ionicons name="arrow-back" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Status</Text>
                <TouchableOpacity onPress={handleSaveStatus}>
                    <Ionicons name="checkmark" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
            </View>

            {/* Text Input */}
            <TextInput
                style={styles.textInput}
                placeholder="What's on your mind?"
                placeholderTextColor="#888"
                value={statusText}
                onChangeText={setStatusText}
                multiline
            />

            {/* Bottom Toolbar */}
            <View style={styles.toolbar}>
                {/* Background Color Picker */}
                <TouchableOpacity onPress={() => {/* Implement color picker */}}>
                    <Ionicons name="color-palette" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
                {/* Emoji Picker */}
                <TouchableOpacity onPress={() => {/* Implement emoji picker */}}>
                    <Ionicons name="happy" size={24} color={primaryColors.purple} />
                </TouchableOpacity>
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
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
});

export default EditStatusScreen;
