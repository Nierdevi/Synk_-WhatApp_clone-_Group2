import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert,Modal } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTheme } from '../constants/themeContext'
import primaryColors from '../constants/colors';
import Countdown from '../components/Timer';
import uuid from 'uuid';


 const Verification = ({navigation,route}) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [countdownKey, setCountdownKey] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [VerificationId, setVerificationId] = useState(false);
  const inputs = useRef([]);
  const { theme, toggleTheme } = useTheme();

  const { confirmation ,countryCode, phoneNumber } = route.params;


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

  // const handleSubmit = () => {
  //   Alert.alert('OTP Submitted', `Your OTP is: ${otp.join('')}`);
  //   navigation.replace('Tabs');
  // };
  // const handleSubmit = async () => {
  //   const otpString = otp.join('');
  //   try {
  //     const credential = auth.PhoneAuthProvider.credential(confirmation.verificationId, otpString);
  //     await auth().signInWithCredential(credential);
  //     // navigation.replace('MainScreen'); // Replace with your main screen name
  //   } catch (error) {
  //     console.error('Error verifying OTP:', error);
  //     Alert.alert('Verification Failed', 'The OTP entered is incorrect. Please try again.');
  //   }
  // };

  // const hey =()=>{
  //   const phoneProvider = new firebase.auth.PhoneAuthProvider;
  //   phoneProvider
  //   .verifyPhoneNumber(confirmation)
  //   .then(setVerificationId);

  // }
  // const confirmCode=()=>{
  //   const credential=firebase.auth.PhoneAuthProvider.credential(
  //     VerificationId,
  //     code
  //   )
  //   firebase.auth().signInWithCredential(Credential)
  //   .then(()=>{
  //     setCode('');
  //   })
  //   .catch((error)=>{
  //     Alert.alert(
  //       "login good"
  //     )
  //   }) 
  // };
  

  const handleResendComplete = () => {
    setIsResendDisabled(false);
  };

  const handleResend = () => {
    setIsResendDisabled(true);
    setCountdownKey(prevKey => prevKey + 1); // Change key to force remount
    // Logic to resend the OTP goes here
};

  // Function to censor the phone number
  const censorPhoneNumber = (number) => {
    const length = number.length;
    return length > 4 ? `${'*'.repeat(length - 4)}${number.slice(length - 4)}` : number;
  };

  return (
    <View style={[styles.container,{paddingBottom:200}]}>

      <Text style={styles.title}> OTP Verification</Text>
      <Text style={styles.title2}> Enter the 6 digit that has been sent to </Text>
      <Text style={styles.title3}>{countryCode} {censorPhoneNumber(phoneNumber)}</Text>

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

      <TouchableOpacity style={{paddingLeft:125,flexDirection:'row'}}
        onPress={handleResend}
        disabled={isResendDisabled}
        >
        <Text style={{fontSize:15,alignItems:'center',justifyContent:'center'}}>Resend code in </Text>
        <Countdown key={countdownKey} start={120} onComplete={handleResendComplete}/>
        <Text> seconds</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
});


export default Verification;