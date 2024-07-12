import { StyleSheet, Text, View, Image, Switch, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const AppUpdatesScreen = () => {
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [notifyUpdate, setNotifyUpdate] = useState(true);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>App update settings</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.body}>Auto-update WhatsApp</Text>
          <Switch
            value={autoUpdate}
            onValueChange={(value) => setAutoUpdate(value)}
            style={styles.switch}
          />
        </View>
        <Text style={styles.body1}>Automatically update app over WiFi.</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.headerText}>Notifications</Text>
        <View style={styles.row}>
          <Text style={styles.body}>WhatsApp update available</Text>
          <Switch
            value={notifyUpdate}
            onValueChange={(value) => setNotifyUpdate(value)}
            style={styles.switch}
          />
        </View>
        <Text style={styles.body1}>
          Get notified when updates are available.
        </Text>
      </View>
    </View>
  );
};

export default AppUpdatesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  backButton: {
    position: "absolute",
    left: 25,
    fontSize: 29,
    bottom: 45,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'Lightgray',
    backgroundColor: 'white',
    paddingTop: 50,
    paddingLeft: 10,
},
headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
    paddingRight: 120,
    //paddingBottom: 10,
},
  content: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
  },
  body1: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 10,
    color: "gray",
  },
  switch: {
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});
