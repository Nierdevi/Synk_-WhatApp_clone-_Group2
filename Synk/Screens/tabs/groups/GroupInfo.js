import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Switch, ScrollView, SafeAreaView, StatusBar, FlatList } from 'react-native';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Ionicons, MaterialIcons, Entypo, FontAwesome, FontAwesome6, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import AppLogo from '../../../assets/AppLogo.png';
import { primaryColors, SecondaryColors } from '../../../constants/colors';
import { getUserData } from '../../../backend/userService';
import { getUser } from '../../../constants/userContext';
import { useContacts } from '../../../backend/contacts ';

const GroupInfo = ({ navigation, route }) => {
  const { groupData, groupId, participants, profilePicture } = route.params;
  const [isEnabled, setIsEnabled] = useState(false);
  const [participantsData, setParticipantsData] = useState([]);
  const {session}=getUser();
  const contacts=useContacts(session)
  const [about, setAbout] = useState('');
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return phoneNumber;
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const userData = await getUserData(recipientPhoneNumber);
  //       console.log(userData.about);
  //       setAbout(userData.about);
  //     } catch (error) {
  //       console.log("failed to get user data", error);
  //     }
  //   };
  //   fetchUserData();
  // }, [recipientPhoneNumber]);

  const fetchParticipantDetails = async (participant) => {
    try {
      const userData = await getUserData(participant.phoneNumber);
      const contactName = contacts.find(
        c => c.normalizedPhoneNumber === participant
      )?.name;

      return {
        ...participant,
        about: userData.about,
        profilePicture: userData.profilePicture,
        displayName: contactName || userData.username || participant,
      };
    } catch (error) {
      console.log("Failed to get user data", error);
      return participant;
    }
  };

  useEffect(() => {
    const fetchParticipantsData = async () => {
      const data = await Promise.all(participants.map(fetchParticipantDetails));
      setParticipantsData(data);
    };

    fetchParticipantsData();
  }, [participants]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} style={styles.headerBackButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable style={styles.headerDots}>
          <Entypo name="dots-three-vertical" size={20} />
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      },
    });
  }, [navigation]);

  const renderParticipant = ({ item }) => (
    <View style={styles.participantContainer}>
      <Image source={item.profilePicture ? { uri: item.profilePicture } : require('../../../assets/Avator.jpg')} style={styles.participantPicture} />
      <Text style={styles.participantName}>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.profileContainer}>
        <Image
          source={profilePicture ? { uri: profilePicture } : require('../../../assets/Avator.jpg')}
          style={styles.profilePicture}
          cachePolicy='disk'
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>{groupData.groupName}</Text>
        </View>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="call-outline" size={24} color="black" />
          <Text style={styles.actionText}>Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Entypo name="video-camera" size={24} color="black" />
          <Text style={styles.actionText}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="user-o" size={24} color="black" />
          <Text style={styles.actionText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="search-outline" size={24} color="black" />
          <Text style={styles.actionText}>Search</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.sectionContent}>description</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Media, links, and docs</Text>
      </View>

      <View style={styles.infoSection}>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="notifications" size={24} color="black" />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <FontAwesome name="picture-o" size={24} color="black" />
          <Text style={styles.optionText}>Media visibility</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="lock" size={24} color="black" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Encryption</Text>
            <Text style={styles.optionSubText}>Messages and calls are end-to-end encrypted. Tap to verify</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons name="clock-fast" size={24} color="black" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Disappearing messages</Text>
            <Text style={styles.optionSubText}>Off</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSwitch} style={styles.option}>
          <MaterialCommunityIcons name="message-lock-outline" size={24} color="black" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Chat lock</Text>
            <Text style={styles.optionSubText}>Lock and hide this chat on this device</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: primaryColors.purple }}
            thumbColor={isEnabled ? '#ffffff' : '#767574'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Participants</Text>
        <FlatList
          data={participantsData}
          keyExtractor={(item) => item.phoneNumber}
          renderItem={({ item }) => (
            <View style={styles.participantContainer}>
              <Image
                source={item.profilePicture ? { uri: item.profilePicture } : require('../../../assets/Avator.jpg')}
                style={styles.participantPicture}
              />
              <View style={styles.participantInfo}>
                <Text style={styles.participantName}>{item.displayName}</Text>
                <Text style={styles.participantAbout}>{item.about}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.infoSection}>
        <TouchableOpacity style={styles.option}>
          <FontAwesome6 name="heart" size={24} color="black" />
          <Text style={styles.optionText}>Add to Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="exit-outline" size={24} color="red" />
          <Text style={styles.optionTextRed}>Exit group</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <AntDesign name="dislike2" size={24} color="red" />
          <Text style={styles.optionTextRed}>Report group</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 30,
  },
  container: {
    flex: 1,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitleTextContainer: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  headerBackButton: {
    marginLeft: 10,
  },
  headerDots: {
    paddingRight: 10,
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileTextContainer: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 10,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e'
  }
  })

export default GroupInfo;