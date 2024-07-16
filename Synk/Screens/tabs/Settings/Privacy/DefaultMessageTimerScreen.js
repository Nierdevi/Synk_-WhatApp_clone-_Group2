// LastSeenAndOnlineScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable,Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RadioButton from '../../../../components/RadioButton';
import { useNavigation } from '@react-navigation/native';

const DefaultMessageTimerScreen = ({ navigation }) => {
  const [selectedLastSeenValue, setSelectedLastSeenValue] = useState(null);
  const [selectedOnlineValue, setSelectedOnlineValue] = useState(null);

  const handleLastSeenRadioPress = (value) => {
    setSelectedLastSeenValue(value);
  };

  const handleOnlineRadioPress = (value) => {
    setSelectedOnlineValue(value);
  };

  const handlePress = () => {
    // Handle the link press
    Alert.alert('Learn more pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Default message timer</Text>
      </View>
      <View style={styles.mode1}>
        <Text style={styles.bold}>Start new chats with a disappearing message timer set to</Text>
        <View style={styles.radioContainer}>
          <RadioButton
            label="24 hours"
            value="onlineOption1"
            selected={selectedOnlineValue === 'onlineOption1'}
            onPress={handleOnlineRadioPress}
          />
          <RadioButton
            label="7 days"
            value="onlineOption2"
            selected={selectedOnlineValue === 'onlineOption2'}
            onPress={handleOnlineRadioPress}
          />
          <RadioButton
            label="90 days"
            value="onlineOption2"
            selected={selectedOnlineValue === 'onlineOption2'}
            onPress={handleOnlineRadioPress}
          />
          <RadioButton
            label="Off"
            value="onlineOption2"
            selected={selectedOnlineValue === 'onlineOption2'}
            onPress={handleOnlineRadioPress}
          />
        </View>
        <Text style={styles.bold}>When turned on, all new individual chats will start with disappearing messages set to the duration you select. This setting will not affect your existing chats. </Text>
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.Text}>Learn more</Text>
        </TouchableOpacity>
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
    paddingTop: 5,
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
  Text:{
    color: 'blue',
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: 10,
    top:-26.5,
    left: 224,
},
});

export default DefaultMessageTimerScreen;
