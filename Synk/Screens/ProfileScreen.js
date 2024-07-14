import { StyleSheet, Text, View, Pressable,TextInput,Image} from 'react-native';
import React,{useState,useEffect} from 'react';
// import {Image} from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AppLogo from '../assets/AppLogo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addUsernameToDatabase, getcurrentUserData,addAboutToDatabase,getUserProfilePicture,uploadProfilePicture } from '../backend/userService';
import { getUser } from '../constants/userContext';
import { primaryColors, SecondaryColors } from '../constants/colors';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const[about,setAbout]= useState(' ')
  const [username, setUsername] = useState(' '); // Initial username
  const [newAbout, setnewAbout ]= useState(about); // Initial username
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [isAboutEditing, setIsAboutEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [profilePicture, setProfilePicture] = useState(null);
  const { session } = getUser();

  const currentUserId=session.userId;
  const currentUserPhoneNumber=session.phoneNumber;

  const formatPhoneNumber = (phoneNumber) => {
    // Remove any non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    // Check if the number starts with a country code
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{4})$/);
    if (match) {
        return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return phoneNumber; 
};

  useFocusEffect(
    React.useCallback(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getcurrentUserData(currentUserId);
                // console.log(userData);
                setUsername(userData.username);
                setNewUsername(userData.username);
                setAbout(userData.about)
                setnewAbout(userData.about)
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, [currentUserId])
);

useFocusEffect(
  React.useCallback(() => {
      const fetchProfilePicture = async () => {
          try {
              const url = await getUserProfilePicture(currentUserId);
              // console.log("url: ",url)
              setProfilePicture(url);
          } catch (error) {
              console.error("Failed to fetch profile picture:", error);
          }
      };

      fetchProfilePicture();
  }, [currentUserId])
);

const handleImageSelect = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
  }
  console.log('Permissions granted:', permissionResult.granted);

  const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
  });
  console.log('ImagePicker result:', result);

  console.log("not canceled",!result.canceled)
  console.log(result.assets)
  if (result && !result.canceled && result.assets && result.assets.length > 0) {
    const uri = result.assets[0].uri;
    console.log('Image URI:', uri);


      try {
          const newImageUrl = await uploadProfilePicture(currentUserId, uri);
          setProfilePicture(newImageUrl);
      } catch (error) {
          console.error("Failed to upload profile picture:", error);
      }
  }
};

  const handleUsernameEdit = () => {
    setIsUserEditing(true);
};
  const handleAboutEdit = () => {
    setIsAboutEditing(true);
};

//set username...
const handleSavePress = async () => {
        // console.log(currentUserId)
    try {
        await addUsernameToDatabase(currentUserId, newUsername);
        setUsername(newUsername);
    } catch (error) {
        console.error("Failed to update username:", error);
    } finally {
        setIsUserEditing(false);
    }
};

//set about
const handleStatusSavePress = async () => {
        // console.log(currentUserId)
    try {
        await addAboutToDatabase(currentUserId, newAbout);
        setAbout(newAbout);
    } catch (error) {
        console.error("Failed to update about:", error);
    } finally {
        setIsAboutEditing(false);
    }
};


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      {/* <View style={styles.head}>
        <Pressable>
          <Image source={AppLogo} style={styles.headerImage} />
        </Pressable>
        <Pressable style={styles.iconContainer}>
          <Ionicons name="camera-outline" size={24} color="black" />
        </Pressable>
      </View> */}

      <View style={styles.head}>
        <Pressable onPress={handleImageSelect}>
            <Image 
                source={profilePicture ? { uri: profilePicture } : AppLogo} 
                style={styles.headerImage} 
                cachePolicy='memory-disk'
                // resizeMode='cover'
            />
        </Pressable>
        <Pressable style={styles.iconContainer} onPress={handleImageSelect}>
            <Ionicons name="camera-outline" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.cont}>

      {/*handle username */}
      <TouchableOpacity style={styles.profileInfo} onPress={handleUsernameEdit} onLongPress={()=>{setIsUserEditing(false)}}>
        <View style={styles.profileIcon}>
            <Ionicons name="person-outline" size={30} color="black" />
        </View>
        <View style={styles.profileText}>
            <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>
                <View style={{flex:1}}>
                    <Text style={styles.profileTitle}>Username</Text>
                    {isUserEditing ? (
                        <TextInput
                            style={styles.profileValueInput}
                            value={newUsername}
                            onChangeText={setNewUsername}
                            onSubmitEditing={handleSavePress}
                        />
                    ) : (
                        <Text style={styles.profileValue}>{username}</Text>
                    )}
                </View>
                {isUserEditing ? (
                    <TouchableOpacity onPress={handleSavePress} style={{padding:5,backgroundColor:primaryColors.purple,borderRadius:20}}>
                        <Text style={{color:'white'}}>Save </Text>
                    </TouchableOpacity>
                ) : (
                    <MaterialCommunityIcons name="pencil-outline" size={24} color="black" />
                )}
            </View>
            <Text style={styles.profileTitle1}>
                This is not your username or pin. This name will be visible to your WhatsApp contacts.
            </Text>
        </View>
      </TouchableOpacity>

          {/*handle about */}

          <TouchableOpacity style={styles.profileInfo} onPress={handleAboutEdit} onLongPress={()=>{setIsAboutEditing(false)}}>
        <View style={styles.profileIcon}>
            <Ionicons name="alert-circle-outline" size={30} color="black" />
        </View>
        <View style={[styles.profileText,{borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: 'Lightgray',}]}>
            <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>
                <View style={{flex:1}}>
                    <Text style={styles.profileTitle}>About</Text>
                    {isAboutEditing ? (
                        <TextInput
                            style={styles.profileValueInput}
                            value={newAbout}
                            onChangeText={setnewAbout}
                            onSubmitEditing={handleStatusSavePress}
                        />
                    ) : (
                        <Text style={styles.profileValue}>{about}</Text>
                    )}
                </View>
                {isAboutEditing ? (
                    <TouchableOpacity onPress={handleStatusSavePress} style={{padding:5,backgroundColor:primaryColors.purple,borderRadius:20}}>
                        <Text style={{color:'white'}}>Save </Text>
                    </TouchableOpacity>
                ) : (
                    <MaterialCommunityIcons name="pencil-outline" size={24} color="black" />
                )}
            </View>
        </View>
      </TouchableOpacity>

        <TouchableOpacity style={styles.profileInfo}>
          <View style={styles.profileIcon}>
            <Ionicons name="call-outline" size={30} color="black" />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileTitle}>Phone</Text>
            <Text style={styles.profileValue}>{formatPhoneNumber(currentUserPhoneNumber)}</Text>
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
        backgroundColor:SecondaryColors.secPurple,
        width:wp("100%"),
        // paddingHorizontal:20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',
        backgroundColor: 'white',
        paddingTop: 50,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 10,
        paddingRight: 250,
        paddingBottom: 10,
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
      paddingHorizontal:20,
      width:wp('95'),
      // backgroundColor:'blue',
      alignSelf:'center',
      marginTop:20
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
      fontSize: wp('3.5%'),
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
      aligItems:'flex-end',
      left:0
    },
    pen1:{
      height: 22,
      right: -85,
      bottom: -6,
    },
    profileValueInput:{
      backgroundColor:'red',
      paddingHorizontal:4,
      alignSelf:'center',
      // flex:1
      fontSize:wp('4%')
    }
});
