import { StyleSheet, Text, View, Pressable, Switch, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const AdvancedScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const toggleSwitch1 = () => {
    setIsEnabled1(previousState => !previousState);
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
        <Text style={styles.headerTitle}>Advanced</Text>
      </View>
      <TouchableOpacity onPress={toggleSwitch} style={styles.can}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.label}>Protect IP address in calls</Text>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: '#767577', true: '#ffffff' }}
              thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <Text style={styles.pod}>
          To make it harder for people to infer your location, calls on this device will be securely relayed through Synk servers. This will reduce call quality.
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.Text2}>Learn more</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleSwitch1} style={styles.can}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.label}>Protect IP address in calls</Text>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: '#767577', true: '#ffffff' }}
              thumbColor={isEnabled1 ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch1}
              value={isEnabled1}
            />
          </View>
        </View>
        <Text style={styles.pod}>
          To make it harder for people to infer your location, calls on this device will be securely relayed through Synk servers. This will reduce call quality.
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.Text2}>Learn more</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default AdvancedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'yellow',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'Lightgray',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingLeft: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    paddingRight: 100,
  },
  can: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    color: 'grey',
  },
  switchContainer: {
    marginLeft: 'auto', // Pushes the switch to the right end
  },
  pod: {
    paddingRight: 124,
    top: -10,
  },
  Text2: {
    color: 'blue',
    fontSize: 13,
    fontWeight: 'bold',
    top: 3,
    paddingTop: 10,
    top: -20.5,
  },
});
