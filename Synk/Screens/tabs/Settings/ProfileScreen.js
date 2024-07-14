import { StyleSheet, Text, View, Pressable, Image,} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AppLogo from '../../../assets/AppLogo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <View style={styles.head}>
        <Pressable>
          <Image source={AppLogo} style={styles.headerImage} />
        </Pressable>
        <Pressable style={styles.iconContainer}>
          <Ionicons name="camera-outline" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.cont}>
        <TouchableOpacity style={styles.profileInfo}>
          <View style={styles.profileIcon}>
            <Ionicons name="person-outline" size={30} color="black" />
          </View>
          <View style={styles.profileText}>
            <View style={{flexDirection: 'row',}}>
              <View>
                <Text style={styles.profileTitle}>Name</Text>
                <Text style={styles.profileValue}>~Katyal</Text>
              </View>
              <MaterialCommunityIcons name="draw-pen" size={24} color="black" style={styles.pen} />
            </View>
            <Text style={styles.profileTitle1}>
              This  is not your username or pin. This name will be visible to
            </Text>
            <Text style={styles.profileTitle2}>
              your WhatsApp contacts.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileInfo}>
          <View style={styles.profileIcon}>
          <Ionicons name="alert-circle-outline" size={30} color="black" />
          </View>
          <View style={[styles.profileText1, {borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: 'Lightgray',}]}>
            <View>
              <Text style={styles.profileTitle}>About</Text>
              <Text style={styles.profileValue}>
                si wis pacem, para bellum
              </Text>
            </View>
            <MaterialCommunityIcons name="draw-pen" size={24}  style={styles.pen1} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileInfo}>
          <View style={styles.profileIcon}>
            <Ionicons name="call-outline" size={30} color="black" />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileTitle}>Phone</Text>
            <Text style={styles.profileValue}>+233 50 343 4750</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
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
        paddingRight: 250,
    },
    headerImage: {
        width: 170,
        height: 170,
        borderRadius: 100,
    },
    head: {
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#82f060',
        height: 50,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 1, // Adjust the position as needed
        right: 95,  // Adjust the position as needed
    },
    cont: {
      flex: 1,
      //backgroundColor: '#000',
      paddingLeft: 16,
      paddingTop: 16,
      paddingBottom: 16,
    },
    profileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    profileIcon: {
      marginRight: 16,
    },
    profileText: {
      flex: 1,
      
    },
    profileText1: {
      flex: 1,
      flexDirection: 'row',
    },
    profileTitle: {
      fontSize: 12,
      color: 'grey',
      fontWeight: "bold",
    },
    profileTitle1: {
      fontSize: 11.5,
      color: 'black',
    },
    profileTitle2: {
      fontSize: 11.5,
      color: 'black',
      paddingBottom: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'Lightgray',
    },
    profileValue: {
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
      paddingBottom: 5,
    },
    pen:{
      height: 22,
      right: -200,
      bottom: -8,
      color:"black",
    },
    pen1:{
      height: 22,
      right: -85,
      bottom: -6,
      color:"black",
    },
});
