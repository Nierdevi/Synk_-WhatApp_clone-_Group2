import { StyleSheet, Text, View,Pressable,TouchableOpacity, Alert, Switch } from 'react-native';
import React from 'react';
import { useState } from "react";
import { Ionicons, MaterialIcons, FontAwesome6, Entypo } from '@expo/vector-icons';


const RequestAccountInfoScreen = ({navigation}) => {

  const [autoUpdate, setAutoUpdate] = useState(false);
  const [notifyUpdate, setNotifyUpdate] = useState(true);

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };
  const toggleSwitch1 =() => {
    setIsEnabled1(previousState => !previousState);
  };

  const handlePress = () => {
    // Handle the link press
    Alert.alert('Learn more pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Request account info</Text>
      </View>
      <View>
        <View style={styles.pad}>
          <Text>Account information</Text>
        </View>
        <View style={styles.pad1}>
          <FontAwesome6 name="file-alt" size={24} color="black" style={{paddingRight: 20,}} />
          <Text style={styles.bold}>Requested account report</Text>
        </View>
        <View style={styles.pad}>
          <Text style={styles.pod}>Create a report of your Synk account information and settings,</Text>
          <Text style={styles.pod}>which you can access or port to another app. This report does not</Text>
          <Text style={styles.pod}>include your messages.</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.Text}>Learn more</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={toggleSwitch} style={styles.pad1}>
          <Entypo name="back-in-time" size={24} color="black" style={{paddingRight: 20,}} />
          <Text style={styles.bold}>Create reports automatically</Text>
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
          <Text style={styles.pod}>A new report will be created every month.</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.Text1}>Learn more</Text>
          </TouchableOpacity>
          <Text style={{paddingTop: 25,}}>Channels activity</Text>
        </View>
        <View style={styles.pad1}>
          <FontAwesome6 name="file-alt" size={24} color="black" style={{paddingRight: 20,}} />
          <Text style={styles.bold}>Request channels report</Text>
        </View>
        <View style={styles.pad}>
          <Text style={styles.pod}>Create a report of your channel updates and information, which you</Text>
          <Text style={styles.pod}>can access or port to another app.</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.Text2}>Learn more</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={toggleSwitch1} style={styles.pad1}>
          <Entypo name="back-in-time" size={24} color="black" style={{paddingRight: 20,}} />
          <Text style={styles.bold}>Create reports automatically</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#ffffff' }}
              thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled1}
              style={styles.switch}
            />
        </TouchableOpacity>
        <View>
          <Text style={styles.pod}>A new report will be created every month.</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.Text1}>Learn more</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default RequestAccountInfoScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'yellow',
        marginTop: 30,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
        backgroundColor: 'white',
        paddingTop: 20,
        paddingLeft: 10,
      },
      headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
        paddingRight: 100,
      },
      pad:{
        padding:15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
      },
      pad1:{
        padding:15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
        flexDirection: 'row',
      },
      bold:{
        fontWeight: 'bold',
        fontSize: 16,
        top: 3,
      },
      pod:{
        fontSize: 12,
        color: 'grey',

      },
      Text:{
        color: 'blue',
        fontSize: 12,
        fontWeight: 'bold',
        bottom: 19.5,
        left: 112,
        top: -15,
    },
    Text1:{
      color: 'blue',
      fontSize: 12,
      fontWeight: 'bold',
      bottom: 19.5,
      left: 194,
      top: -15,
  },
  Text2:{
    color: 'blue',
    fontSize: 12,
    fontWeight: 'bold',
    bottom: 19.5,
    left: 160,
    top: -15,
},
    switch: {
      marginLeft: 30,
      marginTop: -20,
      left: 20,
      top: 10,
    },
})