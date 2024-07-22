import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Switch, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { Ionicons, MaterialIcons, Entypo, FontAwesome, FontAwesome6, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import AppLogo from '../../../assets/AppLogo.png';
import { primaryColors, SecondaryColors } from '../../../constants/colors';

const ChatInfo = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

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

  return (

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <StatusBar barStyle="dark-content" />
        <View style={styles.profileContainer}>
          <Image source={AppLogo} style={styles.logo} />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>Synk-User</Text>
            <Text style={styles.phoneNumber}>+2331232434</Text>
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
            <Ionicons name="search-outline" size={24} color="black" />
            <Text style={styles.actionText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionContent}>Date</Text>
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
          <Text style={styles.sectionTitle}>Other phones</Text>
          <View style={styles.phoneContainer}>
            <View>
              <Text>+2334354456</Text>
              <Text style={styles.phoneLabel}>Mobile</Text>
            </View>
            <View style={styles.phoneActions}>
              <Pressable style={styles.icon}>
                <MaterialIcons name="chat" size={24} color="black" />
              </Pressable>
              <Pressable style={styles.icon}>
                <Ionicons name="call-outline" size={24} color="black" />
              </Pressable>
              <Pressable style={styles.icon}>
                <Entypo name="video-camera" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <TouchableOpacity style={styles.option}>
            <FontAwesome6 name="heart" size={24} color="black" />
            <Text style={styles.optionText}>Block Synk_User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <MaterialCommunityIcons name="cancel" size={24} color="red" />
            <Text style={styles.optionTextRed}>Block Synk_User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <AntDesign name="dislike2" size={24} color="red" />
            <Text style={styles.optionTextRed}>Report Synk_User</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'red',
    paddingTop:30
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
    // backgroundColor:'pink',
    // height:200
  },
  headerDots: {
    paddingRight: 10,
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'blue',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
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
  },
  phoneNumber: {
    fontSize: 16,
    color: '#666',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
  },
  infoSection: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionContent: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  optionTextRed: {
    marginLeft: 10,
    fontSize: 16,
    color: 'red',
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  optionSubText: {
    fontSize: 14,
    color: '#666',
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  phoneLabel: {
    fontSize: 14,
    color: '#666',
  },
  phoneActions: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default ChatInfo;
