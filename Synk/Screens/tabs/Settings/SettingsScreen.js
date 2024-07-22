import { Feather, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLogo from '../../../assets/AppLogo.png';
import { getcurrentUserData, getUserProfilePicture } from '../../../backend/userService';
import { primaryColors } from '../../../constants/colors';
import { getUser } from '../../../constants/userContext';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const[about,setAbout]= useState(' ')
  const [profilePicture, setProfilePicture] = useState(null);
  const { session } = getUser();

  const currentUserId=session.userId;

    useFocusEffect(
        React.useCallback(() => {
            const fetchUserData = async () => {
                try {
                    const userData = await getcurrentUserData(currentUserId);
                    // console.log(userData)
                    setUsername(userData.username);
                    setAbout(userData.about)
                    console.log("username: ",userData.username);
                    console.log("about: ",userData.about)
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            };

            fetchUserData();
        }, [currentUserId])
    );

    useFocusEffect(
      React.useCallback(() => {
          const fetchProfilePicture = async () => {
              try {
                  const url = await getUserProfilePicture(currentUserId);
                  // console.log("url: ",url)
                  setProfilePicture(url);
              } catch (error) {
                  console.error("Failed to fetch profile picture:", error);
              }
          };
    
          fetchProfilePicture();
      }, [currentUserId])
    );
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
          <Image
                source={profilePicture ? { uri: profilePicture } : { uri: 'https://via.placeholder.com/50' }} 
                style={styles.headerImage}
                cachePolicy='memory-disk'
                // resizeMode='contain'
            />
            <View style={{flexDirection: 'row',justifyContent:'space-between',flex:1}}>
              <View style={styles.headerContainer}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.status}>{about}</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <Pressable style={{width:wp('7')}}>
                  <Ionicons name="qr-code" size={24} color={primaryColors.purple} />
                </Pressable>
                <Pressable style={{width:wp('7')}}>
                <Ionicons name="chevron-down-circle" size={24} color={primaryColors.purple} />
                </Pressable>
              </View>
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
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
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
    backgroundColor: 'white',
    paddingTop: -40,
  },
  head: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'Lightgray',
    width:wp('100%'),
    paddingVertical: 10,
    paddingHorizontal:15,
  },
  headerImage: {
    width: wp('15%'),
    height: hp('7%'),
    borderRadius: 50,
    marginRight: 15,
    marginLeft: 5,
  },
  headerContainer: {
    justifyContent: 'center',
  },
  username: {
    fontSize: wp('6%'),
    color: '#000',
    fontWeight:'500'
  },
  status: {
    fontSize: wp('4%'),
    color: '#000',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
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
    width:wp('100%'),

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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
