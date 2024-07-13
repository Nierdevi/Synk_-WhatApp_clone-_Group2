import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const HelpScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.headerTitle}>Help</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.item}>
          <Icon name="help-outline" size={24} color="black" />
          <View style={styles.textContainer}>
            <Text style={styles.itemText}>Help center</Text>
            <Text style={styles.itemSubText}>Get help, contact us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="description" size={24} color="black" />
          <View style={styles.textContainer}>
            <Text style={styles.itemText}>Terms and Privacy Policy</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="report-problem" size={24} color="black" />
          <View style={styles.textContainer}>
            <Text style={styles.itemText}>Channel reports</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="info-outline" size={24} color="black" />
          <View style={styles.textContainer}>
            <Text style={styles.itemText}>App info</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
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
    paddingRight: 250,
},
  content: {
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    borderBottomColor: "#ddd",
    //borderBottomWidth: 1,
  },
  textContainer: {
    marginLeft: 20,
  },
  itemText: {
    color: "black",
    fontSize: 18,
  },
  itemSubText: {
    color: "gray",
    fontSize: 14,
  },
});
