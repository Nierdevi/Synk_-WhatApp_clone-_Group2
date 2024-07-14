import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, Modal } from 'react-native';
import { MaterialIcons, Ionicons, Feather, FontAwesome6 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import AppLogo from '../../../assets/AppLogo.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // State for drawer visibility

  const handleNavigateToNotification = () => {
    navigation.navigate('Notifications');
  };

  const handleNavigateToAccount = () => {
    navigation.navigate('Account');
  };

  const handleNavigateToStorage = () => {
    navigation.navigate('Storage');
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleNavigateToPrivacy = () => {
    navigation.navigate('Privacy');
  };

  const handleNavigateToSChat = () => {
    navigation.navigate('SChat');
  };

  const handleNavigateToHelp = () => {
    navigation.navigate('Help');
  };

  const handleNavigateToAppUpdate = () => {
    navigation.navigate('AppUpdate');
  };

  const handleNavigateToAvatar = () => {
    navigation.navigate('Avatar');
  };


  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const closeModal = () => {
    setIsDrawerVisible(false);
  };

  // Prevent propagation of press events to the parent elements
  const stopPropagation = event => {
    event.stopPropagation();
  };

  return (  
    <SafeAreaView style={styles.container}>  
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>   

      <ScrollView style={styles.container}>
          <TouchableOpacity style={styles.head} onPress={handleNavigateToProfile}>
            <Image source={AppLogo} style={styles.headerImage} />
            <View style={{flexDirection: 'row'}}>
              <View style={styles.headerContainer}>
                <Text style={styles.username}>Synk_User</Text>
                <Text style={styles.status}>我从不松懈型</Text>
              </View>
              <Pressable style={styles.scan}>
                <Ionicons name="qr-code" size={24} color="black" />
              </Pressable>
              <Pressable style={styles.down} onPress={toggleDrawer}>
              <Ionicons name="chevron-down-circle" size={24} color="black" />  
              </Pressable>	
            </View>
          </TouchableOpacity>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <TouchableOpacity style={styles.section} onPress={handleNavigateToAccount}>
            <Ionicons name="person-outline" size={24} color="black" />
            <View style={styles.sect}>
              <Text style={styles.sectionTitle}>Account</Text>
              <Text style={styles.sectionDescription}>Security notifications, change number</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.section} onPress={handleNavigateToPrivacy}>
            <MaterialIcons name="lock-outline" size={24} color="black" />
            <View style={styles.sect}>
              <Text style={styles.sectionTitle}>Privacy</Text>
              <Text style={styles.sectionDescription}>Block contacts, disappearing messages</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.section} onPress={handleNavigateToAvatar}>
            <MaterialIcons name="photo" size={24} color="#000" />
            <View style={styles.sect}>
              <Text style={styles.sectionTitle}>Avatar</Text>
              <Text style={styles.sectionDescription}>Create, edit, profile photo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.section} onPress={handleNavigateToSChat}>
            <Ionicons name="chatbox-outline" size={24} color="black" />
            <View style={styles.sect}>
              <Text style={styles.sectionTitle}>Chats</Text>
              <Text style={styles.sectionDescription}>Theme, wallpapers, chat history</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.section} onPress={handleNavigateToNotification}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <View style={styles.sect}>
              <Text style={styles.sectionTitle}>Notifications</Text>
              <Text style={styles.sectionDescription}>Message, group & call tones</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.section} onPress={handleNavigateToStorage}>
            <Ionicons name="list-sharp" size={24} color="black" />
            <View style={styles.sect}>
              <Text style={styles.sectionTitle}>Storage and data</Text>
              <Text style={styles.sectionDescription}>Network usage, auto-download</Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.section}>
            <Ionicons name="globe-outline" size={24} color="black" />
            <View style={styles.sect}>
              <Text style={styles.sectionTitle}>App language</Text>
              <Text style={styles.sectionDescription}>English (device's language)</Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.section} onPress={handleNavigateToHelp}>
            <Ionicons name="help-circle-outline" size={24} color="black" />
            <View style={styles.sect}>
              <Text style={styles.sectionTitle}>Help</Text>
              <Text style={styles.sectionDescription}>Help center, contact us, privacy policy</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.section}>
            <Ionicons name="person-add-outline" size={24} color="black" />
            <Text style={styles.optionText}>Invite a friend</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.section} onPress={handleNavigateToAppUpdate}>
            <MaterialIcons name="system-update-tv" size={24} color="black" />
            <Text style={styles.optionText}>App updates</Text>
          </TouchableOpacity>
        </View>
        {/* Drawer */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDrawerVisible}
        onRequestClose={() => {
          setIsDrawerVisible(false);
        }}
      >
        <Pressable style={styles.modalContainer} onPress={closeModal}>
          <Pressable style={styles.drawerContent} onPress={stopPropagation}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
              <Image source={AppLogo} style={styles.headerImage1} />
                <View style={styles.me}>
                  <Text style={styles.drawerText}>Synk_User</Text>
                  <Text style={styles.drawerText1}>+233 50 343 4750</Text>
                </View>
                <FontAwesome6 name="circle-check" size={24} style={styles.check}/>
            </View>
            <TouchableOpacity style={styles.plus}>
              <Feather name="plus-circle" size={34} color="black" />
              <Text style={styles.drawerText}>Add account</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    paddingTop: -40,
  },
  head: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
     borderBottomColor: 'Lightgray',
     paddingTop: 5,
     paddingBottom: 10,
     paddingRight: 20,
     paddingLeft: 20,
  },
  headerImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 15,
  },
  headerContainer: {
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    color: '#000',
  },
  status: {
    fontSize: 14,
    color: '#000',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  footerTitle: {
    color: '#000',
    marginTop: 30,
    fontSize: 14,
    marginBottom: 5,
  },
  sect: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'white',
    paddingTop: 50,
    paddingLeft: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
  },
  scan:{
    left: 80,
    top: 8,
    
  },
  down:{
    left: 100,
    top: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
    
  },
  drawerText1: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 15,
    color: 'grey',
    lineHeight: 14,
  },
  closeButton: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  headerImage1: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  me:{
    
  },
  plus:{
    paddingTop: 40,
    paddingLeft:6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  check:{
    left: 150,
    backgroundColor: '#59c96b', 
    borderRadius: 100,
    color: "black",
  }
});

export default SettingsScreen;
