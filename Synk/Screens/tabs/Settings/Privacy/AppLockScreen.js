import { StyleSheet, Text, View, Pressable, Switch, TouchableOpacity, Alert } from 'react-native';
import React, {useState} from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const AppLockScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>App lock</Text>
        </View>
        <TouchableOpacity onPress={toggleSwitch} style={styles.can}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <Text style={styles.label}>Unlock with biometric</Text>
                <View style={styles.switchContainer}>
                    <Switch
                        trackColor={{ false: '#767577', true: '#ffffff' }}
                        thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <Text style={styles.pod}>When enabled, you'll need fingerprint, face or other unique identifiers to open Synk. You can still answer calls if Synk is locked</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AppLockScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
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
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
        paddingRight: 100,
    },
    can: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'Lightgray',

    },
    label: {
        fontSize: 16,
        marginRight: 10,
        fontWeight: 'bold',
        color: 'grey',
    },
    switchContainer: {
        marginLeft: 'auto', // Pushes the switch to the right end
    },
    pod:{
        paddingRight: 100,
        top: -15,
    },
})