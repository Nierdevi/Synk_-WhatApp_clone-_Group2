import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ActivityIndicator, TouchableOpacity,Pressable } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import primaryColors from '../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../constants/themeContext';
import { Separator  } from '../components/Sepator';

const PhoneNumScreen = ({route}) => {
  const { theme } = useTheme();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const toggleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setLoading(false);
    }, 2000); // 2 second delay
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ?  primaryColors.black : primaryColors.white }]}>

      {loading && <ActivityIndicator size={[wp('15%'),hp('15%')]} color={primaryColors.purple} style={styles.activityIndicator} />}

      <View style={[styles.card,{ backgroundColor: theme === 'dark' ?  '#E5E7EB' : primaryColors.white }]}>
          <TextInput style={styles.input} 
              placeholder="Email" 
              clearButtonMode="while-editing"
              onChangeText={email => setForm({ ...form, email })}
              />

          <Pressable style={styles.btn} onPress={() => {}} >
              <Text style={styles.btnText}> {isSignUp ? "Sign Up" : 'Sign In'}</Text>
          </Pressable>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:primaryColors.white,
    backgroundColor:primaryColors.white,
  },
  card:{
    width:wp('85%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    backgroundColor:primaryColors.white,
    borderRadius:10,
    elevation:6
  },
  header: {
    fontSize: 50,
    textAlign:'center',
    marginBottom: 20,
    width:wp('60%')
  },
  activityIndicator:{
    position:'absolute',
    top:30
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D4D4D8',
    borderRadius: 5,
    paddingRight: 40,
    paddingRight: 40,
  },
  PassWordcontainer:{
    position:'relative',
    flexDirection:'row',
  },
  PassWordcontainerIcon:{
    position:'absolute',
    right:10,
    top:13,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 23,
    borderWidth: 1,
    backgroundColor: primaryColors.purple,
    borderColor: primaryColors.purple,
    width:200,
    marginTop:5
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  toggleButton:{
    width:wp('50%'),
    marginLeft:80,
    marginVertical:6,
  },
  toggleButtonText:{
    fontSize:16.6,
  },
  googleIcon: {
    marginRight: 10,
  },
});

export default PhoneNumScreen;
