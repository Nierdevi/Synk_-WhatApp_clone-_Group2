import { StyleSheet, Text, View, Image, Switch, Pressable, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, FontAwesome6 } from '@expo/vector-icons';

const AppUpdatesScreen = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // State for drawer visibility
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [notifyUpdate, setNotifyUpdate] = useState(true);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true); // State for auto update toggle

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);

  const toggleAutoUpdate = () => {
    setAutoUpdateEnabled(previousState => !previousState); // Toggle the state
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
};

const toggleSwitch1 = () => {
    setIsEnabled1(previousState => !previousState);
};

const toggleDrawer = () => {
  setIsDrawerVisible(!isDrawerVisible);
};

const closeModal = () => {
  setIsDrawerVisible(false);
};

const closeModal1 = () => {
  setIsDrawerVisible(false);
};

// Prevent propagation of press events to the parent elements
const stopPropagation = event => {
  event.stopPropagation();
};

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text style={styles.headerTitle}>App update settings</Text>
        </View>
        <TouchableOpacity onPress={toggleDrawer} style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.body}>Auto-update WhatsApp</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#ffffff' }}
              thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
              onPress={toggleDrawer}
            />
          </View>
          <Text style={styles.body1}>Automatically update app over WiFi.</Text>
        </TouchableOpacity>
      </Pressable>
      <TouchableOpacity onPress={toggleSwitch1} style={styles.content}>
        <Text style={styles.headerText}>Notifications</Text>
        <View style={styles.row}>
          <Text style={styles.body}>WhatsApp update available</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#ffffff' }}
            thumbColor={isEnabled1 ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
            style={styles.switch}
          />
        </View>
        <Text style={styles.body1}>
          Get notified when updates are available.
        </Text>
      </TouchableOpacity>
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
            <View style={{alignItems: 'center',}}>
                <View style={styles.me}>
                  <Text style={styles.drawerText}>Turn off auto updates?</Text>
                  <Text style={styles.drawerText1}>Updates add new features as soon as they're available. Do you want to turn these off?</Text>
                </View>
            </View>
            <View style={{alignItems: 'center', paddingTop: 20,paddingBottom: 20,}}> 
              <TouchableOpacity onPress={() => { toggleSwitch(); toggleAutoUpdate(); }} style={styles.plus}>
                <Text style={styles.drawerText2}>{autoUpdateEnabled ? 'Turn on' : 'Turn off'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal1} style={styles.plus1}>
                <Text style={styles.drawerText3}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default AppUpdatesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  backButton: {
    position: "absolute",
    left: 25,
    fontSize: 29,
    bottom: 45,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'Lightgray',
    backgroundColor: 'white',
    paddingTop: 50,
    paddingLeft: 10,
},
headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
    paddingRight: 120,
    //paddingBottom: 10,
},
  content: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
  },
  body1: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 10,
    color: "gray",
  },
  switch: {
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    marginTop: 30,
  },
  drawerContent: {
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    width: '80%',
    borderRadius: 5,
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
    
  },
  drawerText2: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: 'white',
    
  },
  drawerText3: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: 'black',
    
  },
  drawerText1: {
    fontSize: 13,
    paddingTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    color: 'grey',
    lineHeight: 14,
  },
  closeButton: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  plus:{
    backgroundColor: 'blue',
    width: '85%',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  plus1:{
    backgroundColor: '#ddebdf',
    width: '85%',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
