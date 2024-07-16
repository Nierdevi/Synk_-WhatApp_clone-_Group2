// LastSeenAndOnlineScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RadioButton from '../../../../components/RadioButton';
import { useNavigation } from '@react-navigation/native';

const LastSeenAndOnlineScreen = ({ navigation }) => {
  const [selectedLastSeenValue, setSelectedLastSeenValue] = useState(null);
  const [selectedOnlineValue, setSelectedOnlineValue] = useState(null);

  const handleLastSeenRadioPress = (value) => {
    setSelectedLastSeenValue(value);
  };

  const handleOnlineRadioPress = (value) => {
    setSelectedOnlineValue(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Last seen and online</Text>
      </View>
      <View style={styles.mode}>
        <Text style={styles.bold}>Who can see my last seen</Text>
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
          <RadioButton
            label="Nobody"
            value="lastSeenOption4"
            selected={selectedLastSeenValue === 'lastSeenOption4'}
            onPress={handleLastSeenRadioPress}
          />
        </View>
      </View>
      <View style={styles.mode1}>
        <Text style={styles.bold}>Who can see when I'm online</Text>
        <View style={styles.radioContainer}>
          <RadioButton
            label="Everyone"
            value="onlineOption1"
            selected={selectedOnlineValue === 'onlineOption1'}
            onPress={handleOnlineRadioPress}
          />
          <RadioButton
            label="Same as last seen"
            value="onlineOption2"
            selected={selectedOnlineValue === 'onlineOption2'}
            onPress={handleOnlineRadioPress}
          />
        </View>
        <Text style={styles.bold}>If you don't share when you were last online, you won't be able to see when other people were last seen or online</Text>
      </View>
    </View>
  );
};

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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
  },
  mode1: {
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
});

export default LastSeenAndOnlineScreen;
