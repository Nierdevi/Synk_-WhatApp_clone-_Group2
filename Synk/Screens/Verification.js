import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert,Modal } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {} from ''
import { useTheme } from '../constants/themeContext'
import {primaryColors} from '../constants/colors';


import {verifyUser} from '../backend/verificationService';
import {addUserToDatabase} from '../backend/userService';
import { createUser } from '../backend/verificationService';
import {getUser} from '../constants/userContext';


 const Verification = ({navigation,route}) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [modalVisible, setModalVisible] = useState(false);
  // const [verifiedUser, setVerifiedUser] = useState(null);
  const inputs = useRef([]);
  const { theme, toggleTheme } = useTheme();
  const {setSession}=getUser();

  const { countryCode, phoneNumber, token,Number } = route.params;

  // const countryCode='+233'
  // const phoneNumber='746487373'
  
  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically focus next input if the current input has a value
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }, index) => {
    if (key === 'Backspace' && index > 0) {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else {
        inputs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleResend = () => {
    // Logic to resend the OTP goes here

};

  // Function to censor the phone number
  const censorPhoneNumber = (number) => {
    const length = number.length;
    return length > 4 ? `${'*'.repeat(length - 4)}${number.slice(length - 4)}` : number;
  };

  const verifyNumber = async()=>{
    const otpCode = otp.join('');
    // console.log(otpCode);
    if (otpCode.length !== 6) {
      Alert.alert('Incomplete OTP', 'Please enter all 6 digits of the OTP.');
      return;
    }

    try {
      const session = await verifyUser(token.userId, otpCode);
      if (session) {
          const userId = session.userId;
          await addUserToDatabase(userId, countryCode + phoneNumber);
          setSession(session)
          await AsyncStorage.setItem('session', JSON.stringify(session));
          console.log(session)
          Alert.alert('Verification Successful', 'You have been successfully verified.', [
              { text: 'OK', 
                onPress: () => navigation.replace('Tabs') 
              },
          ]);
      }
  } catch (error) {

      console.log(error);
      Alert.alert('Verification Failed', 'The OTP you entered is incorrect or expired. Please try again.');
      
  }

 }


 const resendCode = async () => {
  try {
    const newToken = await createUser(Number);
    // Alert.alert('OTP Resent', 'A new OTP has been sent to your phone number.');
    route.params.token = newToken; // Update the token parameter
  } catch (error) {
    console.log(error);
    Alert.alert('Resend Failed', 'Failed to resend the OTP. Please try again.');
  }
};

  useEffect(() => {
    inputs.current[0].focus();
  }, []);


  return (
    <View style={[styles.container,{paddingBottom:200},{backgroundColor:theme === 'dark' ?  primaryColors.black : primaryColors.white}]}>

      <Text style={[styles.title,{color:theme=='dark' ? primaryColors.white : primaryColors.black}]}> OTP Verification</Text>
      <Text style={[styles.title2,{color:theme=='dark' ? primaryColors.white : primaryColors.black}]}> Enter the 6 digit that has been sent to </Text>
      <Text style={[styles.title3,{color:theme=='dark' ? primaryColors.white : primaryColors.black}]}>{countryCode} {censorPhoneNumber(phoneNumber)}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            value={digit}
            ref={(ref) => inputs.current[index] = ref}
            selectionColor={primaryColors.purple}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.ResendButtom} onPress={resendCode}>
        <Text style={{fontSize:wp('3.5%'),fontWeight:'500'}}>Resend code </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={verifyNumber}>
        <Text style={styles.submitButtonText}>Verify</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Verification Successful!</Text>
        </View>
      </Modal>

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    // justifyContent:'flex-start',
    width:wp('100%'),
  },
  title: {
    width:"70%",
    fontSize: 40,
    marginBottom: 10,
    fontWeight:'600',
    textAlign:'center'
  },
  title2:{
    width:"65%",
    fontSize: 18,
    color:'#A3A3A3'
  },
  title3:{
    width:"30%",
    fontSize: 17,
    marginBottom: 50,
  },
  otpContainer: {
    width:wp('80%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 60,
    borderWidth : 2,
    backgroundColor: '#e9e9e9',
    borderBottom:0,
    borderColor:primaryColors.purple,
    textAlign: 'center',
    fontSize: 18,
    borderRadius:10,
  },
  submitButton: {
    width:wp('50%'),
    backgroundColor: primaryColors.purple,
    paddingVertical: 14,
    // paddingHorizontal: 20,
    borderRadius: 50,
    marginTop:20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 19,
    textAlign:'center',
    fontWeight:'bold',
  },
  ResendButtom:{
    paddingHorizontal:20,
    width:wp('90%'),
    alignItems:'flex-end',
  }
});


export default Verification;