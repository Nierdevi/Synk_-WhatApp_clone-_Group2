import React, { useState } from 'react';
import { View, Text, TextInput,StyleSheet, TouchableOpacity,Image,SafeAreaView,Alert  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import primaryColors from '../constants/colors';
import CountryCode from '../components/CountryCode';
import { useTheme } from '../constants/themeContext';
import auth from '@react-native-firebase/auth';
// import {firestore}


const PhoneNumScreen = ({ navigation }) => {
    const [countryCode, setCountryCode] = useState('+1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState(null);


    // const handleNext = () => {
    // // Alert.alert('Phone Number is' `${phoneNumber}`);
    //     // Navigate to the verification page and pass the phone number as a parameter
    //     // navigation.navigate('SignIn', { phoneNumber });
    //     console.log(phoneNumber)
    // };

    // const Number=countryCode + phoneNumber
    Number="+233201364739"
    const handleCountrySelect = (code) => {
        setCountryCode(code);
    // const Number=countryCode + phoneNumber
    };

    // const handleSubmit = () => {
    //     // Handle phone number submission
    //     // console.log(`Phone Number: ${countryCode} ${phoneNumber}`);
    //     console.log(Number)
    //     navigation.navigate('Verification',{countryCode,phoneNumber})
    // };

    // const handleSubmit = async () => {
        // try {
        //   const confirmation = await auth().signInWithPhoneNumber(`+${Number}`);
        //   navigation.navigate('Verification', { confirmation,countryCode,phoneNumber });
        // } catch (error) {
        //   console.error('Error sending OTP:', error);
        //   Alert.alert('Error', 'Failed to send OTP. Please try again.');
        // }
        // Handle the button press
            //     async function handleSubmit(phoneNumber) {
            //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            //     setConfirm(confirmation);
            // }


        const signInWithPhoneNumber = async ()=>{
            try{
            const confirmation= await auth().signInWithPhoneNumber(Number);
            setConfirm(confirmation)
            } catch (error){
                console.log('Error sending otp',error);

            }
        }


    return (
        <SafeAreaView style={{flex:1,paddingTop:55,}}>
            <View style={styles.container}>

                <Image 
                    source={require('../assets/login-animate.png')}
                    resizeMode="contain"
                    style={styles.image}
                />

                <Text style={styles.title}>Verify Phone Number </Text>
                <View style={{flexDirection:'row',gap:20,alignItems:'flex-end',width:'60%',paddingBottom:2}}>
                    <Text style={{fontSize:15,fontWeight:'500',paddingLeft:5.4}}>Country </Text>
                    <Text style={{fontSize:15,fontWeight:'500',paddingLeft:6.5}}>Phone </Text>
                </View>

                <View style={styles.inputComponent}>
                    <CountryCode onSelectCountry={handleCountrySelect} />

                    <TextInput
                        style={styles.input}
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        caretHidden={true}
                        textAlign='left'
                    />
                </View>

                <TouchableOpacity style={styles.nextButton} onPress={signInWithPhoneNumber}>
                        <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingBottom:200,
    // height:hp('50%')
    
},
image:{
    width:wp('60%'),
    height:hp("60%")
},
title: {
    fontSize: 30,
    marginBottom: 30,
    // paddingBottom:40
},
inputComponent:{
    width:wp("80%"),
    flexDirection:'row',
    // backgroundColor:'yellow',
    alignItems:'center',
    justifyContent:'center'
},
input: {
    width: wp('40%'),
    height: 45,
    backgroundColor: '#e9e9e9', 
    borderColor: primaryColors.purple,
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginLeft:5,
    borderBottomWidth:2,
    borderTopWidth:2,
    paddingVertical:2,
},
nextButton: {
    width: wp('50%'),
    backgroundColor: primaryColors.purple,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginTop:25,
},
nextButtonText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
},
});

export default PhoneNumScreen;
