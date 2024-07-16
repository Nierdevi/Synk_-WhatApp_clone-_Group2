import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SecondaryColors } from '../constants/colors';

const AccountScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <View style={{padding:20 }}>
        <TouchableOpacity style={styles.item}>
          <MaterialIcons name="security" size={24} color="#000" />
          <Text style={styles.itemText}>Security notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <MaterialIcons name="vpn-key" size={24} color="#000" />
          <Text style={styles.itemText}>Passkeys</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <MaterialIcons name="email" size={24} color="#000" />
          <Text style={styles.itemText}>Email address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <MaterialIcons name="lock" size={24} color="#000" />
          <Text style={styles.itemText}>Two-step verification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <MaterialIcons name="sync" size={24} color="#000" />
          <Text style={styles.itemText}>Change number</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <MaterialIcons name="description" size={24} color="#000" />
          <Text style={styles.itemText}>Request account info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <MaterialIcons name="person-add" size={24} color="#000" />
          <Text style={styles.itemText}>Add account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <MaterialIcons name="delete" size={24} color="#000" />
          <Text style={styles.itemText}>Delete account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SecondaryColors.secPurple,
    marginTop: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'Lightgray',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingLeft: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
    paddingRight: 250,
  },
});

export default AccountScreen;
