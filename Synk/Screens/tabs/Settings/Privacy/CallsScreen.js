import { StyleSheet, Text, View, Pressable, Switch, TouchableOpacity, Alert } from 'react-native';
import React, {useState} from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const CallsScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const handlePress = () => {
        // Handle the link press
        Alert.alert('Learn more pressed');
    };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>Calls</Text>
        </View>
        <TouchableOpacity onPress={toggleSwitch} style={styles.can}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <Text style={styles.label}>Silence unknown callers</Text>
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
            <Text style={styles.pod}>Calls from unknown numbers will be silenced. They will still be shown in the Calls tab and in your notifications.</Text>
            <TouchableOpacity style={{maxWidth: 60,}} onPress={handlePress}>
                <Text style={styles.Text2}>Learn more</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    </View>
  )
}

export default CallsScreen

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
        padding: 10,

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
        top: -10,
    },
    Text2:{
        color: 'blue',
        fontSize: 13,
        fontWeight: 'bold',
        top: 3,
        paddingTop: 10,
        top:-20.5,
    },
})