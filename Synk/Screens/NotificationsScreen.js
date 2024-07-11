import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';

const PrivacyScreen = () => {
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(true);
  const [disappearingMessagesEnabled, setDisappearingMessagesEnabled] = useState(false);

  const handleReadReceiptsToggle = () => {
    setReadReceiptsEnabled(!readReceiptsEnabled);
  };

  const handleDisappearingMessagesToggle = () => {
    setDisappearingMessagesEnabled(!disappearingMessagesEnabled);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Privacy</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Who can see my personal info</Text>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Last seen and online</Text>
          <Text style={styles.itemValue}>Everyone</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Profile photo</Text>
          <Text style={styles.itemValue}>Everyone</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>About</Text>
          <Text style={styles.itemValue}>Everyone</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Status</Text>
          <Text style={styles.itemValue}>20 contacts excluded</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Read receipts</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>
            If turned off, you won't send or receive Read receipts. Read receipts are always sent for group chats.
          </Text>
          <Switch
            value={readReceiptsEnabled}
            onValueChange={handleReadReceiptsToggle}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disappearing messages</Text>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Default message timer</Text>
          <Text style={styles.itemText}>
            Start new chats with disappearing messages set to your timer
          </Text>
          <Text style={styles.itemValue}>Off</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Groups</Text>
        <View style={styles.item}>
          <Text style={styles.itemValue}>Everyone</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemTitle: {
    fontSize: 16,
    color: '#fff',
  },
  itemValue: {
    fontSize: 16,
    color: '#fff',
  },
  itemText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default PrivacyScreen;