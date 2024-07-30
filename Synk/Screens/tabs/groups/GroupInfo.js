import {
  View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Switch, ScrollView, StatusBar, FlatList
} from 'react-native';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  Ionicons, Entypo, FontAwesome, FontAwesome6, MaterialCommunityIcons, MaterialIcons, AntDesign
} from '@expo/vector-icons';
import { primaryColors } from '../../../constants/colors';
import { getUserData } from '../../../backend/userService';
import { getUser } from '../../../constants/userContext';
import { useContacts } from '../../../backend/contacts ';
import MediaGrid from '../../../components/MediaGrid';
import { fetchGroupMessages } from '../../../backend/groupServices';

const GroupInfo = ({ navigation, route }) => {
  const { groupData, participants, profilePicture,groupId, messages } = route.params;
  const [isEnabled, setIsEnabled] = useState(false);
  const [participantsData, setParticipantsData] = useState([]);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);
  const { session } = getUser();
  const contacts = useContacts(session);
  const [media, setMedia] = useState([]);

//   useEffect(()=>{
//     const mediaMessages = messages.filter(message => message.type === 'image' || message.type === 'video');

// // Map to extract the mediaUrl
//   const mediaUrls = mediaMessages.map(message => message.mediaUrl);
//   console.log(mediaUrls);
//     // console.log("messages in info: ",messages)

//   })

  useEffect(() => {
    const fetchMedia = async () => {
      if (groupId) {
        try {
          // Fetch messages for the group
          const fetchedMessages = await fetchGroupMessages(groupId);
          
          // Extract media URLs and types
          const mediaArray = fetchedMessages
            .filter(message => message.type === 'image' || message.type === 'video')
            .map(message => ({
              mediaUrl: message.mediaUrl,
              type: message.type
            }));
              // console.log(mediaArray);

          setMedia(mediaArray);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMedia();
  }, [groupId]);

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

  const fetchParticipantDetails = async (phoneNumber) => {
    try {
      const userData = await getUserData(phoneNumber);
      const contactName = contacts.find(
        c => Array.isArray(c.normalizedPhoneNumbers) && c.normalizedPhoneNumbers.includes(phoneNumber)
      )?.name;


      // console.log(`Fetching details for ${phoneNumber}:`, {
      //   about: userData.about,
      //   profilePicture: userData.profilePicture,
      //   displayName: contactName || userData.displayName || formatPhoneNumber(phoneNumber),
      // });

      return {
        phoneNumber,
        about: userData.about,
        profilePicture: userData.profilePicture,
        displayName: contactName || userData.displayName || formatPhoneNumber(phoneNumber),
      };
    } catch (error) {
      console.log("Failed to get user data", error);
      return { phoneNumber };
    }
  };

  useEffect(() => {
    const fetchParticipantsData = async () => {
      try {

        const data = await Promise.all(participants.map(fetchParticipantDetails));
        // console.log('Fetched Participant Data:', data);
        setParticipantsData(data);
      } catch (error) {
        console.log("Error fetching participant data:", error);
      }
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
    <View style={styles.participantContainer} key={item.phoneNumber}>
      <Image
        source={item.profilePicture ? { uri: item.profilePicture } : require('../../../assets/Avator.jpg')}
        style={styles.participantPicture}
      />
      <View style={styles.participantInfo}>
        <Text style={styles.participantName}>{item.displayName}</Text>
        <Text style={styles.participantAbout}>{item.about}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.profileContainer}>
        <Image
          source={profilePicture ? { uri: profilePicture } : require('../../../assets/Avator.jpg')}
          style={styles.profilePicture}
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
        <Text style={styles.sectionContent}>{groupData.description}</Text>
      </View>

      <TouchableOpacity style={styles.infoSection} onPress={() => setMediaModalVisible(true)} >
        <Text style={styles.sectionTitle}>Media, links, and docs</Text>
      </TouchableOpacity>

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
          renderItem={renderParticipant}
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
          <FontAwesome name="trash-o" size={24} color="red" />
          <Text style={styles.optionTextRed}>Delete group</Text>
        </TouchableOpacity>
      </View>

        <MediaGrid media={media} onClose={() => setMediaModalVisible(false)} visible={mediaModalVisible}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileTextContainer: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContent: {
    marginTop: 5,
    fontSize: 14,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap:7
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  optionText: {
    fontSize: 16,
  },
  optionSubText: {
    fontSize: 12,
    color: '#888',
  },
  optionTextRed: {
    fontSize: 16,
    color: 'red',
  },
  participantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  participantPicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  participantInfo: {
    marginLeft: 10,
  },
  participantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  participantAbout: {
    fontSize: 14,
    color: '#888',
  },
  headerBackButton: {
    marginLeft: 15,
  },
  headerDots: {
    marginRight: 15,
  },
});

export default GroupInfo;
