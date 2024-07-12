import { StyleSheet, Text, View, Pressable, TouchableOpacity, Switch } from 'react-native';
import React from 'react';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { PopupMenu} from '../components/PopupMenu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const NotificationsScreen = () => {
  const navigation = useNavigation();

  const [autoUpdate, setAutoUpdate] = useState(false);
  const [notifyUpdate, setNotifyUpdate] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    { label: 'Reset notification settings', onPress: () => {} },
  ];
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
        <View style={styles.him}>
          <TouchableOpacity style={styles.mine1}>
            <Text style={styles.you}>Conversation tones</Text>
            <Text style={styles.text}>Play sounds for incoming and outgoing</Text>
            <Text style={styles.text1}>messages.</Text>
          </TouchableOpacity>
          <Switch
            value={autoUpdate}
            onValueChange={(value) => setAutoUpdate(value)}
            style={styles.switch1}
          />
        </View>

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

          <View style={styles.him0}>
            <TouchableOpacity style={styles.mine2}>
              <Text style={styles.you}>Use high priority notifications</Text>
              <Text style={styles.text}>Show previews of notifications at the top</Text>
              <Text style={styles.text1}>of the screen.</Text>
            </TouchableOpacity>
            <Switch
              value={autoUpdate}
              onValueChange={(value) => setAutoUpdate(value)}
              style={styles.switch}
            />
          </View>
        </View>
        <View style={styles.him}>
          <TouchableOpacity style={styles.mine1}>
            <Text style={styles.you}>Reaction Notification</Text>
            <Text style={styles.text}>Show notifications for reactions to</Text>
            <Text style={styles.text1}>messages you send.</Text>
          </TouchableOpacity>
          <Switch
            value={autoUpdate}
            onValueChange={(value) => setAutoUpdate(value)}
            style={styles.switch2}
          />
        </View>

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

            <View style={styles.him0}>
              <TouchableOpacity style={styles.mine2}>
                <Text style={styles.you}>Use high priority notifications</Text>
                <Text style={styles.text}>Show previews of notifications at the top</Text>
                <Text style={styles.text1}>of the screen.</Text>
              </TouchableOpacity>
              <Switch
                value={autoUpdate}
                onValueChange={(value) => setAutoUpdate(value)}
                style={styles.switch3}
              />
            </View>
          </View>
        </View>

        <View style={styles.him}>
            <TouchableOpacity style={styles.mine1}>
              <Text style={styles.you}>Reaction Notification</Text>
              <Text style={styles.text}>Show notifications for reactions to</Text>
              <Text style={styles.text1}>messages you send.</Text>
            </TouchableOpacity>
            <Switch
              value={autoUpdate}
              onValueChange={(value) => setAutoUpdate(value)}
              style={styles.switch4}
            />
          </View>

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
    marginLeft: 70,
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