import { StyleSheet, Text, View, Pressable, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
const PassKeysScreen = ({navigation}) => {

  const handlePress = () => {
    // Handle the link press
    Alert.alert('Learn more pressed');
  };

  const handleDelete = () => {
    // Handle the link press
    Alert.alert('Delete pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Passkeys</Text>
      </View>
      <View style={{padding: 20,}}>
        <View>
          <Text style={styles.head}>Manage your passkey</Text>
          <Text style={styles.grey}>Access Synk the same way you unlock your phone:</Text>
          <Text style={styles.grey}>with your fingerprint, face or screen lock. Your passkey</Text>
          <Text style={styles.grey}>gives you a secure and easy way to log back into your account.</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.Text2}>Learn more</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style ={styles.tab}>
            <View style={styles.icon}>
              <MaterialIcons name="key" size={24} />
            </View>
            <View style={{paddingBottom:15,}}>
            <Text style={{fontSize: 20, fontWeight:'bold',}}>Passkey</Text>
            <Text>This will be used to verify your account</Text>
          </View>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
          
        </View>
      </View>
    </View>
  );
};

export default PassKeysScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop: 30,
    backgroundColor: 'yellow',
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
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
    paddingRight: 100,
  },
  head:{
    fontSize: 28,
    fontWeight:'bold',
    paddingBottom: 10,
  },
  grey:{
    color: 'grey',
    lineHeight: 18,
  },
  Text2:{
    color: 'blue',
    fontSize: 13,
    fontWeight: 'bold',
    top: 3,
    paddingTop: 5,
    left: 48,
    top:-20.5,
  },
  delete:{
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold',
    right:207,
    top: 35,
  },
  tab:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 15,
    paddingBottom:30,
    borderRadius: 8,
  },
  icon: {
    marginRight: 10,
    height: 50,
    width: 50,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    color:"black" ,
  },
 
})