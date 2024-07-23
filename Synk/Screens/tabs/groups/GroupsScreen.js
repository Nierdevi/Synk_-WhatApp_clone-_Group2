import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Fab from '../../../components/fab';
import { primaryColors } from '../../../constants/colors';
import GroupChatModal from '../../../components/GroupChatModal ';
import { fetchUserGroups, } from '../../../backend/groupServices';
import { getUser } from '../../../constants/userContext';
import RenderGroupsIn from '../../../components/RenderGroupsIn';



export default function GroupsScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const {session}=getUser()
  useEffect(() => {
    const loadUserGroups = async () => {
      const userGroups = await fetchUserGroups(session.phoneNumber);
      // console.log(userGroups);
    };
    loadUserGroups();
  }, [session.phoneNumber]);



  const handleNavigateToGroupRoom = () => {
    navigation.navigate('GroupRoom');
  };




  return (
    <View style={{ flex: 1 }}>
      <Fab type="groups" handlePress={() => setModalVisible(true)} />
      <GroupChatModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        close={()=>setModalVisible(false)}
        navigation={navigation}

      />
      <RenderGroupsIn navigation={navigation} session={session} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
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
