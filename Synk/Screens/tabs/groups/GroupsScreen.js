import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Fab from '../../../components/fab';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { primaryColors } from '../../../constants/colors';

export default function GroupsScreen({ navigation }) {
  return (
    <View style={{flex:1,}}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.mo1}>
              <TouchableOpacity style={styles.man1}>
                <View style={styles.fab}>
                  <MaterialIcons name="groups" size={44} color="black" />
                </View>
                  <Text style={styles.groupTitle}>FOLC COMMUNITY 😷❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="volume-up" size={24} color="black" />
                  </View>
                  <Text style={styles.message}>Announcements ~ Dr. Joy-Philippe Bruce: https://udn...</Text>
                  <Text style={styles.time}>10:48 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="groups" size={24} color="black" />
                  </View>
                  <Text style={styles.message1}>OUR A1 CHARISMA FAMILEE❤️ ~ gafia? 👀🙏</Text>
                  <Text style={styles.time}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 10,}}>
                  <Ionicons name="arrow-back" size={24} color="#000" style={styles.viewAll} />
                  <Text style={styles.viewAllnow}>View all</Text>
              </TouchableOpacity>
        </View>

        <View style={styles.mo1}>
              <TouchableOpacity style={styles.man1}>
                <View style={styles.fab}>
                  <MaterialIcons name="groups" size={44} color="black" />
                </View>
                  <Text style={styles.groupTitle}>FOLC COMMUNITY 😷❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="volume-up" size={24} color="black" />
                  </View>
                  <Text style={styles.message}>Announcements ~ Dr. Joy-Philippe Bruce: https://udn...</Text>
                  <Text style={styles.time}>10:48 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="groups" size={24} color="black" />
                  </View>
                  <Text style={styles.message1}>OUR A1 CHARISMA FAMILEE❤️ ~ gafia? 👀🙏</Text>
                  <Text style={styles.time}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 10,}}>
                  <Ionicons name="arrow-back" size={24} color="#000" style={styles.viewAll} />
                  <Text style={styles.viewAllnow}>View all</Text>
              </TouchableOpacity>
        </View>

        <View style={styles.mo1}>
              <TouchableOpacity style={styles.man1}>
                <View style={styles.fab}>
                  <MaterialIcons name="groups" size={44} color="black" />
                </View>
                  <Text style={styles.groupTitle}>FOLC COMMUNITY 😷❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="volume-up" size={24} color="black" />
                  </View>
                  <Text style={styles.message}>Announcements ~ Dr. Joy-Philippe Bruce: https://udn...</Text>
                  <Text style={styles.time}>10:48 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="groups" size={24} color="black" />
                  </View>
                  <Text style={styles.message1}>OUR A1 CHARISMA FAMILEE❤️ ~ gafia? 👀🙏</Text>
                  <Text style={styles.time}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 10,}}>
                  <Ionicons name="arrow-back" size={24} color="#000" style={styles.viewAll} />
                  <Text style={styles.viewAllnow}>View all</Text>
              </TouchableOpacity>
        </View>

        <View style={styles.mo1}>
              <TouchableOpacity style={styles.man1}>
                <View style={styles.fab}>
                  <MaterialIcons name="groups" size={44} color="black" />
                </View>
                  <Text style={styles.groupTitle}>FOLC COMMUNITY 😷❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="volume-up" size={24} color="black" />
                  </View>
                  <Text style={styles.message}>Announcements ~ Dr. Joy-Philippe Bruce: https://udn...</Text>
                  <Text style={styles.time}>10:48 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageContainer}>
                  <View style={styles.icon}>
                    <MaterialIcons name="groups" size={24} color="black" />
                  </View>
                  <Text style={styles.message1}>OUR A1 CHARISMA FAMILEE❤️ ~ gafia? 👀🙏</Text>
                  <Text style={styles.time}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 10,}}>
                  <Ionicons name="arrow-back" size={24} color="#000" style={styles.viewAll} />
                  <Text style={styles.viewAllnow}>View all</Text>
              </TouchableOpacity>
        </View>
      </ScrollView>
      <Fab type="groups" handlePress={{}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  contentContainer: {
    alignItems: 'center',
  },
  mo: {
    backgroundColor: 'white',
    width: '100%',
    height: '14%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  mo1: {
    backgroundColor: 'white',
    width: '96%',
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 20,
  },
  fab: {
    bottom: 15,
    right: 10,
    width: 70,
    height: 70,
    backgroundColor: primaryColors.purple,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 25,
  },
  man: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  man1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'Lightgray',
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
    height: 30,
    width: 30,
    backgroundColor: '#607af0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  message: {
    color: 'black',
    flex: 1,
    fontSize: 14,
    paddingTop: 15,
  },
  message1: {
    color: 'black',
    flex: 1,
    fontSize: 14,
    paddingTop: 5,
  },
  time: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 10,
  },
  viewAll: {
    color: '#00BFFF',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 50,
  },
  viewAllnow: {
    color: '#00BFFF',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 5,
  },
});
