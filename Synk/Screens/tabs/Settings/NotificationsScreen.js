import { StyleSheet, Text, View, Pressable, TouchableOpacity, Switch } from 'react-native';
import React from 'react';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { PopupMenu} from '../../../components/PopupMenu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const NotificationsScreen = () => {
  const navigation = useNavigation();

  const [autoUpdate, setAutoUpdate] = useState(false);
  const [notifyUpdate, setNotifyUpdate] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    { label: 'Reset notification settings', onPress: () => {} },
  ];

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const toggleSwitch1 = () => {
    setIsEnabled1(previousState => !previousState);
  };

  const toggleSwitch2 = () => {
    setIsEnabled2(previousState => !previousState);
  };

  const toggleSwitch3 = () => {
    setIsEnabled3(previousState => !previousState);
  };
  
  const toggleSwitch4 = () => {
    setIsEnabled4(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>

        <Text style={styles.headerTitle}>Notifications</Text>

        <View style={styles.modalActions}>
          <Pressable style={styles.dots} onPress={() => setMenuVisible(true)}>
            <PopupMenu visible={menuVisible} onClose={() => setMenuVisible(false)} menuItems={menuItems}  style={styles.popupMenu}/>
            <Entypo name="dots-three-vertical" size={20} />
          </Pressable>
        </View>
      </View>

      <ScrollView>
        <TouchableOpacity onPress={toggleSwitch} style={styles.him}>
          <View style={styles.mine1}>
            <Text style={styles.you}>Conversation tones</Text>
            <Text style={styles.text}>Play sounds for incoming and outgoing</Text>
            <Text style={styles.text1}>messages.</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#ffffff' }}
            thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </TouchableOpacity>

        <View style={styles.pad}>
          <Text style={styles.him1}>Messages</Text>
          <View style={styles.head}>
            <TouchableOpacity>
              <Text style={styles.you}>Notification tone</Text>
              <Text style={styles.him1}>Enter key will send your message</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.head}>
            <TouchableOpacity>
              <Text style={styles.you}>Vibrate</Text>
              <Text style={styles.him1}>Default</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.head}>
            <TouchableOpacity>
              <Text style={styles.you}>Light</Text>
              <Text style={styles.him1}>Blue</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={toggleSwitch1} style={styles.him0}>
            <View style={styles.mine2}>
              <Text style={styles.you}>Use high priority notifications</Text>
              <Text style={styles.text}>Show previews of notifications at the top</Text>
              <Text style={styles.text1}>of the screen.</Text>
            </View>
            <Switch
            trackColor={{ false: '#767577', true: '#ffffff' }}
            thumbColor={isEnabled1 ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
            style={styles.switch}
          />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={toggleSwitch2} style={styles.him}>
          <View style={styles.mine1}>
            <Text style={styles.you}>Reaction Notification</Text>
            <Text style={styles.text}>Show notifications for reactions to</Text>
            <Text style={styles.text1}>messages you send.</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#ffffff' }}
            thumbColor={isEnabled2 ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
            style={styles.switch2}
          />
        </TouchableOpacity>

        <View style={styles.pad}>
          <Text style={styles.him1}>Groups</Text>
          <View style={styles.head}>
            <TouchableOpacity>
              <Text style={styles.you}>Notification tone</Text>
              <Text style={styles.him1}>Enter key will send your message</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.head}>
            <TouchableOpacity>
                <Text style={styles.you}>Vibrate</Text>
                <Text style={styles.him1}>Default</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.head}>
            <TouchableOpacity>
              <Text style={styles.you}>Light</Text>
              <Text style={styles.him1}>Blue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleSwitch3} style={styles.him0}>
              <View style={styles.mine2}>
                <Text style={styles.you}>Use high priority notifications</Text>
                <Text style={styles.text}>Show previews of notifications at the top</Text>
                <Text style={styles.text1}>of the screen.</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#ffffff' }}
                thumbColor={isEnabled3 ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch3}
                value={isEnabled3}
                style={styles.switch3}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={toggleSwitch4} style={styles.him}>
            <View style={styles.mine1}>
              <Text style={styles.you}>Reaction Notification</Text>
              <Text style={styles.text}>Show notifications for reactions to</Text>
              <Text style={styles.text1}>messages you send.</Text>
            </View>
              <Switch
                trackColor={{ false: '#767577', true: '#ffffff' }}
                thumbColor={isEnabled4 ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch4}
                value={isEnabled4}
                style={styles.switch3}
              />
          </TouchableOpacity>

        <View style={styles.pad}>
          <Text style={styles.him1}>Calls</Text>

          <View style={styles.head}>
            <TouchableOpacity>
              <Text style={styles.you}>Ringtone</Text>
              <Text style={styles.him1}>Default(Zero)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.head}>
            <TouchableOpacity>
                <Text style={styles.you}>Vibrate</Text>
                <Text style={styles.him1}>Default</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    //marginBottom: 5,
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
      paddingRight: 145,
  },
  him:{
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'Lightgray',
  },
  him0:{
    flexDirection: "row",
  },
  him1:{
    fontSize: 13,
    color: 'grey',
    paddingBottom:10,
},
  mine1:{
    marginBottom: 20,
    paddingLeft:20,
    paddingRight:20,
    paddingTop: 20,
    
  },
  mine2:{
    marginBottom: 20,
    paddingRight:20,
    paddingTop: 20,
    
  },
  you:{
    fontWeight: 'bold',
    fontSize: 15,
  },
  text:{
    fontSize: 13,
    color: 'grey',
  },
  text1:{
    fontSize: 13,
    color: 'grey',
    top: -3,
    paddingBottom: 5,
},
  switch: {
    marginLeft: 40,
  },
  switch1: {
    marginLeft: 50,
  },
  switch2: {
    marginLeft: 75,
  },
  switch3: {
    marginLeft: 35,
  },
  switch4: {
    marginLeft: 65,
  },
  pad:{
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
},
head:{
  paddingBottom:20,
},
dots: {
  
},
modalActions: {
  flexDirection: 'row',
  alignItems: 'center',
},
popupMenu:{
  position:'absolute',
  marginTop:20,
  backgroundColor:'white',
  width:wp("54%"),
  top:7,
  right:-8,
  borderRadius:10,
  elevation:2,
}
})