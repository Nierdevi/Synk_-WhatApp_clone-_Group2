import React, { useState } from 'react';
import { View, Text,StyleSheet, TouchableOpacity,Image,SafeAreaView,Alert  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PhoneInput  from 'react-native-international-phone-number'
import {primaryColors} from '../constants/colors';
import { useTheme } from '../constants/themeContext';
import {createUser} from '../backend/verificationService';
import { databases } from '../backend/appwrite';
import { Query } from 'appwrite';


const PhoneNumScreen = ({ navigation }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const { theme, toggleTheme } = useTheme();
    const [sentToken, setSentToken] = useState(null);


    const Number=`${selectedCountry?.callingCode}${inputValue.replaceAll(" ","")}`;
    const countryCode=selectedCountry?.callingCode
    const phoneNumber=inputValue.replaceAll(" ","")
    function handleInputValue(phoneNumber) {
        setInputValue(phoneNumber);
    }

    function handleSelectedCountry(country) {
        setSelectedCountry(country);
    }

    const checkPhoneNumberExists = async (phoneNumber) => {
        try {
            const response = await databases.listDocuments('6685cbc40036f4c6a5ad', '6685cc6600212adefdbf', [
                Query.equal('phoneNumber', phoneNumber),
            ]);

            return response.documents.length > 0;
        } catch (error) {
            console.error('Error checking phone number:', error);
            throw error;
        }
    };

    const handleSubmit = async () => {
        try {
            const phoneNumberExists = await checkPhoneNumberExists(Number);

            if (phoneNumberExists) {
                Alert.alert('Phone Number Exists', 'The phone number you entered already exists.');
                return;
            }else{
                const u = await createUser(Number);
                setSentToken(u);
                console.log(u)
                Alert.alert(
                    "Resent sent", "Verify OTP",
                    [{
                        text: "OK",
                        onPress: () => navigation.navigate('Verification', { token: u, countryCode, phoneNumber,Number })
                    }],
                    { cancelable: false }
                );

                
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <SafeAreaView style={[styles.safeCon,{backgroundColor:theme === 'dark' ?  primaryColors.black : primaryColors.white}]}>
            <View style={styles.container}>

                <Image
                    source={require('../assets/login-animate.png')}
                    resizeMode="contain"
                    style={styles.image}
                />

                <Text style={[styles.title,{color:theme === 'dark' ?  primaryColors.white : primaryColors.black}]}>Verify Phone Number </Text>
                <View style={{ width: wp("85%"), flex: 1, padding: 24 }}>
                <PhoneInput
                    value={inputValue}
                    onChangePhoneNumber={handleInputValue}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={handleSelectedCountry}
                    defaultCountry='US'
                    phoneInputStyles={{
                        container:{
                            borderColor:primaryColors.purple,
                            paddingLeft:0,
                            // marginBottom:-200,
                            marginTop: -6,
                            elevation:5
                        },
                        flagContainer:{
                            width:105,
                        },
                        flag:{
                            marginLeft:4,

                        },
                        divider:{
                            marginRight:5,
                        },
                        caret:{
                            marginRight:-8,
                        },
                    }}
                />
                {/* <View style={{ marginTop: 10 }}>
                    <Text>
                    Country:{' '}
                    {`${selectedCountry?.name?.en} (${selectedCountry?.cca2})`}
                    </Text>
                    <Text>
                    Phone Number:{' '}
                    {`${selectedCountry?.callingCode} ${inputValue}`}
                    </Text>
                </View> */}
            </View>

                <TouchableOpacity style={styles.nextButton} onPress={handleSubmit} >
                        <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeCon:{
        flex:1,
        paddingTop:55
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0',
    paddingBottom:200,
    // height:hp('50%')

},
image:{
    width:wp('50%'),
    height:hp("50%"),
    marginBottom:-100,
},
title: {
    fontSize: 30,
    marginBottom: 0,
    textAlign:'left'
    // paddingBottom:40
},
nextButton: {
    width: wp('50%'),
    backgroundColor: primaryColors.purple,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginTop:50,
    marginBottom:110,
},
nextButtonText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
},
});

export default PhoneNumScreen;
