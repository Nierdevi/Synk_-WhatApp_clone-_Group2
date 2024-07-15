import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Image } from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppLogo from '../../../assets/AppLogo.png'

const AccountScreen = () => {
  const navigation = useNavigation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // State for drawer visibility

  const handleNavigationToSecurity = () => {
    navigation.navigate('Security');
  };

  const handleNavigationToPassKey = () => {
    navigation.navigate('PassKey');
  };

  const handleNavigationToEmail = () => {
    navigation.navigate('Email');
  };

  const handleNavigationToTwoStep = () => {
    navigation.navigate('TwoStep');
  };

  const handleNavigationToChange = () => {
    navigation.navigate('Change');
  };

  const handleNavigationToRequest = () => {
    navigation.navigate('Request');
  };

  const handleNavigationToDelete = () => {
    navigation.navigate('Delete');
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <View style={{ padding: 20 }}>
        <TouchableOpacity style={styles.item} onPress={handleNavigationToSecurity}>
          <MaterialIcons name="security" size={24} color="#000" />
          <Text style={styles.itemText}>Security notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={handleNavigationToPassKey}>
          <MaterialIcons name="vpn-key" size={24} color="#000" />
          <Text style={styles.itemText}>Passkeys</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={handleNavigationToEmail}>
          <MaterialIcons name="email" size={24} color="#000" />
          <Text style={styles.itemText}>Email address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={handleNavigationToTwoStep}>
          <MaterialIcons name="lock" size={24} color="#000" />
          <Text style={styles.itemText}>Two-step verification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={handleNavigationToChange}>
          <MaterialIcons name="sync" size={24} color="#000" />
          <Text style={styles.itemText}>Change number</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={handleNavigationToRequest}>
          <MaterialIcons name="description" size={24} color="#000" />
          <Text style={styles.itemText}>Request account info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={toggleDrawer}>
          <MaterialIcons name="person-add" size={24} color="#000" />
          <Text style={styles.itemText}>Add account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={handleNavigationToDelete}>
          <MaterialIcons name="delete" size={24} color="#000" />
          <Text style={styles.itemText}>Delete account</Text>
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
              <Image source={AppLogo} style={styles.headerImage} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
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
  headerImage: {
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

export default AccountScreen;
