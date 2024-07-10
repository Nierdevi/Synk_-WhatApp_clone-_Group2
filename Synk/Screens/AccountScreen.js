import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons name="shield-check" size={24} color="#fff" />
        <Text style={styles.itemText}>Security notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons name="account-key" size={24} color="#fff" />
        <Text style={styles.itemText}>Passkeys</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons name="email" size={24} color="#fff" />
        <Text style={styles.itemText}>Email address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons name="lock" size={24} color="#fff" />
        <Text style={styles.itemText}>Two-step verification</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons name="sync-circle" size={24} color="#fff" />
        <Text style={styles.itemText}>Change number</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons name="file-document" size={24} color="#fff" />
        <Text style={styles.itemText}>Request account info</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons name="account-plus" size={24} color="#fff" />
        <Text style={styles.itemText}>Add account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons name="delete" size={24} color="#fff" />
        <Text style={styles.itemText}>Delete account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#111',
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 20,
  },
});

export default AccountScreen;