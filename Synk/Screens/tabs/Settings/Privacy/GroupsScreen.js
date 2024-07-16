import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RadioButton from '../../../../components/RadioButton';

const GroupsScreen = ({navigation}) => {
    const [selectedLastSeenValue, setSelectedLastSeenValue] = useState(null);
    const [selectedOnlineValue, setSelectedOnlineValue] = useState(null);

    const handleLastSeenRadioPress = (value) => {
        setSelectedLastSeenValue(value);
    };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>Groups</Text>
        </View>
        <View style={styles.mode}>
            <Text style={styles.bold}>Who can see my groups</Text>
            <View style={styles.radioContainer}>
                <RadioButton
                    label="Everyone"
                    value="lastSeenOption1"
                    selected={selectedLastSeenValue === 'lastSeenOption1'}
                    onPress={handleLastSeenRadioPress}
                />
                <RadioButton
                    label="My contacts"
                    value="lastSeenOption2"
                    selected={selectedLastSeenValue === 'lastSeenOption2'}
                    onPress={handleLastSeenRadioPress}
                />
                <RadioButton
                    label="My contacts except..."
                    value="lastSeenOption3"
                    selected={selectedLastSeenValue === 'lastSeenOption3'}
                    onPress={handleLastSeenRadioPress}
                />
            </View>
            <View>
                <Text style={styles.bold1}>Admins who can't add you to a group will have the option of inviting you privately instead.</Text>
                <Text style={styles.bold2}>This setting does not apply to announcement groups. If you're added to a group, you'll always be added to an announcement groq </Text>
            </View>
        </View>
    </View>
  )
}

export default GroupsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'lightgray',
        backgroundColor: 'white',
        paddingTop: 50,
        paddingLeft: 10,
      },
      headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        paddingRight: 100,
      },
      mode: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
      },
      radioContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 10,
      },
      bold: {
        fontWeight: 'bold',
        color: 'grey',
      },
      bold1: {
        fontWeight: 'bold',
        color: 'grey',
        paddingBottom: 10,
        fontSize: 13,
      },
      bold2: {
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 13,
      },
})