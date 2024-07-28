import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Fab from '../../../components/fab';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { primaryColors } from '../../../constants/colors';

export default function GroupsScreen({ navigation }) {
  const handleNavigateToGroupRoom = () =>{
    navigation.navigate('GroupRoom')
  };
  return (
    <View style={{flex:1,}}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.mo1}>
              <TouchableOpacity style={styles.man1} onPress={handleNavigateToGroupRoom}>
                <View style={styles.fab}>
                  <MaterialIcons name="groups" size={44} color="black" />
                </View>
                  <Text style={styles.groupTitle}>FOLC COMMUNITY 😷❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="volume-up" size={24} color="black" />
                  </View>
                  <Text style={styles.message}>Announcements ~ Dr. Joy-Philippe Bruce: https://udn...</Text>
                  <Text style={styles.time}>10:48 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer} onPress={handleNavigateToGroupRoom}>
                  <View style={styles.icon}>
                    <MaterialIcons name="groups" size={24} color="black" />
                  </View>
                  <Text style={styles.message1}>OUR A1 CHARISMA FAMILEE❤️ ~ gafia? 👀🙏</Text>
                  <Text style={styles.time}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 10,}}>
                  <Ionicons name="arrow-back" size={24} color="#000" style={styles.viewAll} />
                  <Text style={styles.viewAllnow}>View all</Text>
              </TouchableOpacity>
        </View>

        <View style={styles.mo1}>
              <TouchableOpacity style={styles.man1} onPress={handleNavigateToGroupRoom}>
                <View style={styles.fab}>
                  <MaterialIcons name="groups" size={44} color="black" />
                </View>
                  <Text style={styles.groupTitle}>FOLC COMMUNITY 😷❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="volume-up" size={24} color="black" />
                  </View>
                  <Text style={styles.message}>Announcements ~ Dr. Joy-Philippe Bruce: https://udn...</Text>
                  <Text style={styles.time}>10:48 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer} onPress={handleNavigateToGroupRoom}>
                  <View style={styles.icon}>
                    <MaterialIcons name="groups" size={24} color="black" />
                  </View>
                  <Text style={styles.message1}>OUR A1 CHARISMA FAMILEE❤️ ~ gafia? 👀🙏</Text>
                  <Text style={styles.time}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 10,}}>
                  <Ionicons name="arrow-back" size={24} color="#000" style={styles.viewAll} />
                  <Text style={styles.viewAllnow}>View all</Text>
              </TouchableOpacity>
        </View>

        <View style={styles.mo1}>
              <TouchableOpacity style={styles.man1} onPress={handleNavigateToGroupRoom}>
                <View style={styles.fab}>
                  <MaterialIcons name="groups" size={44} color="black" />
                </View>
                  <Text style={styles.groupTitle}>FOLC COMMUNITY 😷❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="volume-up" size={24} color="black" />
                  </View>
                  <Text style={styles.message}>Announcements ~ Dr. Joy-Philippe Bruce: https://udn...</Text>
                  <Text style={styles.time}>10:48 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer} onPress={handleNavigateToGroupRoom}>
                  <View style={styles.icon}>
                    <MaterialIcons name="groups" size={24} color="black" />
                  </View>
                  <Text style={styles.message1}>OUR A1 CHARISMA FAMILEE❤️ ~ gafia? 👀🙏</Text>
                  <Text style={styles.time}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 10,}}>
                  <Ionicons name="arrow-back" size={24} color="#000" style={styles.viewAll} />
                  <Text style={styles.viewAllnow}>View all</Text>
              </TouchableOpacity>
        </View>

        <View style={styles.mo1}>
              <TouchableOpacity style={styles.man1} onPress={handleNavigateToGroupRoom}>
                <View style={styles.fab}>
                  <MaterialIcons name="groups" size={44} color="black" />
                </View>
                  <Text style={styles.groupTitle}>FOLC COMMUNITY 😷❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="volume-up" size={24} color="black" />
                  </View>
                  <Text style={styles.message}>Announcements ~ Dr. Joy-Philippe Bruce: https://udn...</Text>
                  <Text style={styles.time}>10:48 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer} onPress={handleNavigateToGroupRoom}>
                  <View style={styles.icon}>
                    <MaterialIcons name="groups" size={24} color="black" />
                  </View>
                  <Text style={styles.message1}>OUR A1 CHARISMA FAMILEE❤️ ~ gafia? 👀🙏</Text>
                  <Text style={styles.time}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 10,}}>
                  <Ionicons name="arrow-back" size={24} color="#000" style={styles.viewAll} />
                  <Text style={styles.viewAllnow}>View all</Text>
              </TouchableOpacity>
        </View>
      </ScrollView>
      <Fab type="groups" handlePress={{}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SecondaryColors.secPurple,
  },
  contentContainer: {    alignItems: 'center',
  },
  mo: {
    backgroundColor: 'white',
    width: '100%',
    height: '14%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  mo1: {
    backgroundColor: 'white',
    width: '96%',
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 20,
  },
  fab: {
    bottom: 15,
    right: 10,
    width: 70,
    height: 70,
    backgroundColor: primaryColors.purple,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 25,
  },
  man: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  man1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'Lightgray',
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
    height: 30,
    width: 30,
    backgroundColor: '#607af0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  message: {
    color: 'black',
    flex: 1,
    fontSize: 14,
    paddingTop: 15,
  },
  message1: {
    color: 'black',
    flex: 1,
    fontSize: 14,
    paddingTop: 5,
  },
  time: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 10,
  },
  viewAll: {
    color: '#00BFFF',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 50,
  },
  viewAllnow: {
    color: '#00BFFF',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 5,
  },
});


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { getStatuses } from '../backend/statusService';
import { useContacts } from '../backend/contacts ';
import { getUser } from '../constants/userContext';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../backend/userService';
import { primaryColors } from '../constants/colors';

const StatusList = () => {
  const [statuses, setStatuses] = useState([]);
  const { session } = getUser();
  const contacts = useContacts(session);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const allStatuses = await getStatuses();
        const normalizedPhoneNumbers = contacts.flatMap(contact =>
          Array.isArray(contact.normalizedPhoneNumbers) ? contact.normalizedPhoneNumbers : []
        );

        const filteredStatuses = allStatuses.filter(status =>
          status.phoneNumber && normalizedPhoneNumbers.includes(status.phoneNumber)
        );

        const userDataPromises = filteredStatuses.map(async status => {
          const userData = await getUserData(status.phoneNumber);
          return { ...status, userData };
        });

        const statusesWithUserData = await Promise.all(userDataPromises);

        const groupedStatuses = statusesWithUserData.reduce((acc, status) => {
          const phoneNumber = status.phoneNumber;
          if (!acc[phoneNumber]) {
            acc[phoneNumber] = {
              userData: status.userData,
              statuses: []
            };
          }
          acc[phoneNumber].statuses.push(status);
          return acc;
        }, {});

        setStatuses(Object.values(groupedStatuses));
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    if (contacts.length > 0) {
      fetchStatuses();
    }
  }, [contacts]);

  const contactNameMap = contacts.reduce((acc, contact) => {
    if (Array.isArray(contact.normalizedPhoneNumbers)) {
      contact.normalizedPhoneNumbers.forEach(phoneNumber => {
        acc[phoneNumber] = contact.name;
      });
    }
    return acc;
  }, {});

  const renderItem = ({ item }) => {
    const { userData, statuses } = item;
    const contactName = contactNameMap[userData.phoneNumber] || userData.phoneNumber;
    const profilePicture = userData.profilePicture ? { uri: userData.profilePicture } : require('../assets/Avator.jpg');

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ViewStatus', { statuses })}
      >
        <View style={styles.thumbnailContainer}>
          <Image source={profilePicture} style={styles.thumbnail} />
          {statuses.length > 1 && (
            <View style={styles.statusCountContainer}>
              <Text style={styles.statusCountText}>{statuses.length}</Text>
            </View>
          )}
        </View>
        <Text style={styles.contactName}>{contactName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={statuses}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.userData.phoneNumber + '-' + index}
      horizontal
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
  },
  itemContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusCountContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: primaryColors.purple,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCountText: {
    color: 'white',
    fontSize: 12,
  },
  contactName: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default StatusList;

