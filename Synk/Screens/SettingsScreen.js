import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };

  const navigateToAccount = () => {
    navigation.navigate('Account')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.option} onPress={navigateToAccount}>
          <Text style={styles.optionText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={navigateToNotifications}>
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="help" size={24} color="#fff" />
        <View style={styles.sect}>
          <Text style={styles.sectionTitle}>Help</Text>
          <Text style={styles.sectionDescription}>Help center, contact us, privacy policy</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="person" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginLeft: 10 }}>Invite a friend</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="update" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginLeft: 10 }}>App updates</Text>
      </TouchableOpacity>

      <Text style={{ color: '#fff', marginTop: 20, fontSize: 12 }}>Also from Meta</Text>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="mail" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginLeft: 10 }}>Open Instagram</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <MaterialIcons name="facebook" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginLeft: 10 ,}}>Open Facebook</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
  signOutButton: {
    marginTop: 40,
    paddingVertical: 15,
    backgroundColor: '#ff5c5c',
    borderRadius: 5,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
