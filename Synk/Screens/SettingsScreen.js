import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AppLogo from '../assets/AppLogo.png';

const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <Image source={AppLogo} style={styles.headerImage} />
        <View style={styles.headerContainer}>
          <Text style={styles.username}>Cyber_bhilly</Text>
          <Text style={styles.status}>我从不松懈型</Text>
        </View>
      </View>    
      <TouchableOpacity style={styles.section}>          
        <MaterialIcons name="person" size={24} color="#fff" />
        <View style={styles.sect}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Text style={styles.sectionDescription}>Security notifications, change number</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="lock" size={24} color="#fff" />
        <View style={styles.sect}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <Text style={styles.sectionDescription}>Block contacts, disappearing messages</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="photo" size={24} color="#fff" />
        <View style={styles.sect}>
          <Text style={styles.sectionTitle}>Avatar</Text>
          <Text style={styles.sectionDescription}>Create, edit, profile photo</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="chat" size={24} color="#fff" />
        <View style={styles.sect}>
          <Text style={styles.sectionTitle}>Chats</Text>
          <Text style={styles.sectionDescription}>Theme, wallpapers, chat history</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="notifications" size={24} color="#fff" />
        <View style={styles.sect}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Text style={styles.sectionDescription}>Message, group & call tones</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="storage" size={24} color="#fff" />
        <View style={styles.sect}>
          <Text style={styles.sectionTitle}>Storage and data</Text>
          <Text style={styles.sectionDescription}>Network usage, auto-download</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="language" size={24} color="#fff" />
        <View style={styles.sect}>
          <Text style={styles.sectionTitle}>App language</Text>
          <Text style={styles.sectionDescription}>English (device's language)</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="help" size={24} color="#fff" />
        <View style={styles.sect}>
          <Text style={styles.sectionTitle}>Help</Text>
          <Text style={styles.sectionDescription}>Help center, contact us, privacy policy</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="person" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginLeft: 10 }}>Invite a friend</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="update" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginLeft: 10 }}>App updates</Text>
      </TouchableOpacity>

      <Text style={{ color: '#fff', marginTop: 20, fontSize: 12 }}>Also from Meta</Text>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="mail" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginLeft: 10 }}>Open Instagram</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="facebook" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginLeft: 10 ,}}>Open Facebook</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },
  headerContainer: {
    //flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    color: '#fff',
  },
  username: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
  status: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  stats: {
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  sectionDescription: {
    color: '#fff',
    marginLeft: 10,
  },
  sect:{
    
  },
  headerImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginRight: 10,
  },
  head:{
    flexDirection: 'row',
  }
});

export default SettingsScreen;