import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
const NotificationsScreen = () => {
  const [conversationTonesEnabled, setConversationTonesEnabled] = useState(false);
  const [highPriorityNotificationsEnabled, setHighPriorityNotificationsEnabled] = useState(false);
  const [reactionNotificationsEnabled, setReactionNotificationsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <View style={styles.section}>
            <View style={styles.row}>
                <Text style={styles.sectionTitle}>Conversation Tones</Text>
                <Text style={styles.sectionDescription}>Play sounds for incoming and outgoing messages.</Text>
            </View>
            <Switch
                value={conversationTonesEnabled}
                onValueChange={setConversationTonesEnabled}
                style={styles.switch}
                backgroundInactive={'#767577'}  // Grey color when off
                backgroundActive={'green'}      // Green color when on
                circleActiveColor={'#FFFFFF'}   // White color for the circle when on
                circleInactiveColor={'#FFFFFF'} // White color for the circle when off
                renderInsideCircle={() => <View />}
                switchWidthMultiplier={2.5}
                switchBorderRadius={16}
                switchBorderWidth={1}
                switchBorderColor={'#767577'}
            />
      </View>
      <View style={styles.sect}>
        <Text style={styles.sectionTitle}>Messages</Text>
        <Text style={styles.sectionDescription}>Notification Tone</Text>
        <Text style={styles.sectionDescription}>Oniichan Notifications V.25</Text>
        <Text style={styles.sectionTitle}>Vibrate</Text>
        <Text style={styles.sectionDescription}>Default</Text>
        <Text style={styles.sectionTitle}>Popup Notification</Text>
        <Text style={styles.sectionDescription}>Not available</Text>
      </View>
      <View style={styles.sect}>
        <Text style={styles.sectionTitle}>Light</Text>
        <Text style={styles.sectionDescription}>Blue</Text>
      </View>
      <View style={styles.section}>
            <View style ={styles.row}>
                <Text style={styles.sectionTitle}>Use High Priority Notifications</Text>
                <Text style={styles.sectionDescription}>
                    Show previews of notifications at the top
                </Text>
                    <Text style={styles.Descript}> of the screen.</Text>
            </View>
            <Switch
                value={highPriorityNotificationsEnabled}
                onValueChange={setHighPriorityNotificationsEnabled}
                style={styles.switch}
                backgroundInactive={'#767577'}  // Grey color when off
                backgroundActive={'green'}      // Green color when on
                circleActiveColor={'#FFFFFF'}   // White color for the circle when on
                circleInactiveColor={'#FFFFFF'} // White color for the circle when off
                renderInsideCircle={() => <View />}
                switchWidthMultiplier={2.5}
                switchBorderRadius={16}
                switchBorderWidth={1}
                switchBorderColor={'#767577'}
            />
      </View>
      <View style={styles.section}>
            <View style={styles.row}>
                <Text style={styles.sectionTitle}>Reaction Notifications</Text>
                <Text style={styles.sectionDescription}>
                    Show notifications for reactions to
                </Text>
                <Text style={styles.Descript}> 
                     messages you send.
                </Text>
            </View>
            <Switch
                value={reactionNotificationsEnabled}
                onValueChange={setReactionNotificationsEnabled}
                style={styles.switch}
                backgroundInactive={'red'}  // Grey color when off
                backgroundActive={'green'}      // Green color when on
                //circleActiveColor={'#FFFFFF'}   // White color for the circle when on
                circleInactiveColor={'#FFFFFF'} // White color for the circle when off
                renderInsideCircle={() => <View />}
                switchWidthMultiplier={2.5}
                switchBorderRadius={16}
                switchBorderWidth={1}
                switchBorderColor={'#767577'}
            />
      </View>
      <View style={styles.sect}>
        <Text style={styles.sectionTitle}>Groups</Text>
        <Text style={styles.sectionDescription}>Notification Tone</Text>
        <Text style={styles.sectionDescription}>Oniichan Notifications V.25</Text>
        <Text style={styles.sectionTitle}>Vibrate</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
    flexDirection: 'row'
    
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionDescription: {
    fontSize: 13,
    color: '#ccc',
    marginBottom: 10,
    marginRight: 35,
  },
  switch: {
    transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }], // Adjust scale as needed
    marginBottom: 10, // Example margin bottom
    
  },
  sect:{

  },
  row:{
    //fontSize: 12,
  },
  se:{
    marginBottom: 1,
    fontSize: 13,
    color: '#ccc',
    marginRight: 35,
    marginTop: 10,
  },
  Descript:{
    marginBottom: 10,
    fontSize: 13,
    color: '#ccc',
    marginRight: 35,
    marginTop: -12,
  },
});

export default NotificationsScreen;