import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
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
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>About</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    section: {
        padding: 20
    },
    title: {
        marginBottom: 10,
        color: '#555',
        fontSize: 18,
        fontWeight: 'bold'
    },
    channelsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    exploreText: {
        color: 'purple',
        fontSize: 16,
        fontWeight: 'bold'
    },
    statusContainer: {
        alignItems: 'center',
        marginRight: 15
    },
    statusWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    statusWrapperDefault: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    plusSign: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'purple',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    plusText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    pencilIcon: {
        position: 'absolute',
        bottom: 0,
        right: 30,
        backgroundColor: 'purple',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    statusImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        zIndex: 2
    },
    statusUser: {
        marginTop: 5,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    channelImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    channelInfo: {
        flex: 1,
        flexDirection: 'column'
    },
    channelName: {
        fontWeight: 'bold'
    },
    channelDescription: {
        color: '#888'
    },
    channelMeta: {
        alignItems: 'flex-end'
    },
    channelTime: {
        fontSize: 12,
        color: '#888'
    },
    unreadBadge: {
        backgroundColor: 'purple',
        borderRadius: 12,
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginTop: 2
    },
    unreadText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    },
    findChannelsContainer: {
        paddingHorizontal: 20,
        marginTop: 20
    },
    findChannelsText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    suggestedChannelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    suggestedChannelImg: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    suggestedChannelInfo: {
        marginLeft: 10
    },
    suggestedChannelName: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    followButton: {
        backgroundColor: 'purple',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    followButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    exploreMoreButton: {
        marginTop: 10,
        backgroundColor: 'purple',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center'
    },
    exploreMoreButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    bottomRightIcons: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    bottomIcon: {
        backgroundColor: 'purple',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SettingsScreen;
