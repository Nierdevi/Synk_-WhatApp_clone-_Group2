// CountryPickerComponent.js
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView  } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import primaryColors from '../constants/colors';

const CountryCode = ({ onSelectCountry }) => {
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');

    const handleCountrySelect = (item) => {
    setCountryCode(item.dial_code);
    setShow(false);
    onSelectCountry(item.dial_code);
    };

    const handleKeyPress = ({ nativeEvent: { key }})=>{
        if (key='Backspace'){
            setShow(false)
        }
    }

    return (
    <View style={styles.container}>
        <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.button}
        >
        <Text style={styles.buttonText}>
            {countryCode }
        </Text>
        </TouchableOpacity>

        <SafeAreaView>
          <CountryPicker
          show={show}
          pickerButtonOnPress={handleCountrySelect}
          style={styles.countryPicker}
          />
        </SafeAreaView>

    </View>
    );
    };

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 45,
    width:70,
    borderColor: primaryColors.purple,
    justifyContent: 'center',
    backgroundColora:'yellow',
    alignItems: 'center',
    borderBottomWidth:2,
    borderTopWidth:2,
    marginBottom:10,
    backgroundColor: '#e9e9e9', 
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign:'center',
  },
  countryPicker: {
    paddingTop:200,
    // Custom styles for the country picker if needed
  },
});

export default CountryCode;
