import React, { useState } from 'react';
import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo, Feather, FontAwesome, FontAwesome6,MaterialIcons } from '@expo/vector-icons';
import AppLogo from '../../assets/AppLogo.png';
import { primaryColors } from '../../constants/colors';
import { useTheme } from '../../constants/themeContext';
import CameraComponent from '../CameraComponent';
import { PopupMenu } from '../PopupMenu';

const isIOS = Platform.OS === 'ios';

export default function ChatsHeader({navigation}) {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [isEventsListModalVisible, setIsEventsListModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [events, setEvents] = useState([]);
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const openCamera = () => setIsCameraVisible(true);
  const closeCamera = () => setIsCameraVisible(false);

  const openEventModal = () => setIsEventModalVisible(true);
  const closeEventModal = () => setIsEventModalVisible(false);

  const openEventsListModal = () => setIsEventsListModalVisible(true);
  const closeEventsListModal = () => setIsEventsListModalVisible(false);

  const handleSelectDate = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleSubmitEvent = () => {
    const newEvent = { date: selectedDate, title: eventTitle, description: eventDescription };
    setEvents([...events, newEvent]);
    setSelectedDate('');
    setEventTitle('');
    setEventDescription('');
    closeEventModal();
  };

  const menuItems = [
    { label: 'New broadcast', onPress: () => {} },
    { label: 'Linked Devices', onPress: () => handleNavigateToLinked() },
    { label: 'Settings', onPress: () => handleNavigateToSettings() },
    { label: 'Switch accounts', onPress: () => toggleDrawer() },
  ];

  const handleNavigateToSettings = () => {
    navigation.replace("SettingsScreen")
    setMenuVisible(false);
  };

  const handleNavigateToLinked = () => {
    // Handle navigation to Linked Devices
  };

  const toggleDrawer = () => setIsDrawerVisible(!isDrawerVisible);

  const closeModal = () => setIsDrawerVisible(false);

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  // Define icon colors
  const calendarIconColor = theme === 'dark' ? primaryColors.blue : primaryColors.green;
  const cameraIconColor = theme === 'dark' ? primaryColors.red : primaryColors.orange;
  const dotsIconColor = theme === 'dark' ? primaryColors.purple : primaryColors.gray;

  return (
    <View style={[{ paddingTop: isIOS ? insets.top : insets.top + 10 }, styles.container, { backgroundColor: theme === 'dark' ? primaryColors.black : primaryColors.white }]}>
      <Text style={[styles.text, { color: theme === 'dark' ? primaryColors.white : primaryColors.black }]}>Chats</Text>
      <View style={styles.option}>
        <TouchableOpacity onPress={openEventModal} style={styles.calendarIcon}>
          <FontAwesome name="calendar-plus-o" size={22} color={calendarIconColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera} style={styles.cameraIcon}>
          <Feather name="camera" size={22} color={cameraIconColor} />
        </TouchableOpacity>
        <Pressable style={[styles.dots, { color: dotsIconColor }]} onPress={() => setMenuVisible(true)}>
          <PopupMenu visible={menuVisible} onClose={() => setMenuVisible(false)} menuItems={menuItems} style={styles.popupMenu} />
          <Entypo name="dots-three-vertical" size={20} color={dotsIconColor} />
        </Pressable>
        <CameraComponent isVisible={isCameraVisible} onClose={closeCamera} />
      </View>

      {/* Event Scheduling Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEventModalVisible}
        onRequestClose={closeEventModal}
      >
        <Pressable style={styles.modalContainer} onPress={closeEventModal}>
          <Pressable style={styles.eventModalContent} onPress={stopPropagation}>
            <View style={styles.eventHeader}>
              <Text style={styles.eventTitle}>Event Scheduling</Text>
              <TouchableOpacity onPress={openEventsListModal} style={styles.viewEventsIcon}>
                <MaterialIcons name="event" size={26} color={calendarIconColor} />
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={handleSelectDate}
              markedDates={{ [selectedDate]: { selected: true, marked: true, dotColor: primaryColors.primary } }}
              style={styles.calendar}
            />
            <View style={styles.eventDetails}>
              <Text style={styles.eventText}>Event Title:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event title"
                value={eventTitle}
                onChangeText={setEventTitle}
              />
              <Text style={styles.eventText}>Event Description:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event description"
                value={eventDescription}
                onChangeText={setEventDescription}
                multiline
              />
            </View>
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: primaryColors.purple }]} onPress={handleSubmitEvent}>
              <Text style={styles.saveButtonText}>Save Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.closeButton, { backgroundColor: primaryColors.purple }]} onPress={closeEventModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Events List Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEventsListModalVisible}
        onRequestClose={closeEventsListModal}
      >
        <Pressable style={styles.modalContainer} onPress={closeEventsListModal}>
          <Pressable style={styles.eventsListContent} onPress={stopPropagation}>
            <Text style={styles.eventTitle}>Events List</Text>
            <ScrollView>
              {events.map((event, index) => (
                <View key={index} style={styles.eventItem}>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  <Text style={styles.eventItemTitle}>{event.title}</Text>
                  <Text style={styles.eventDescription}>{event.description}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={[styles.closeButton, { backgroundColor: primaryColors.purple }]} onPress={closeEventsListModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Drawer Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDrawerVisible}
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalContainer} onPress={closeModal}>
          <Pressable style={styles.drawerContent} onPress={stopPropagation}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={AppLogo} style={styles.headerImage1} />
              <View style={styles.me}>
                <Text style={styles.drawerText}>Synk_User</Text>
                <Text style={styles.drawerText1}>+233 50 343 4750</Text>
              </View>
              <FontAwesome6 name="circle-check" size={24} style={styles.check} />
            </View>
            <TouchableOpacity style={styles.plus}>
              <Feather name="plus-circle" size={34} color="black" />
              <Text style={styles.drawerText}>Add account</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    height: hp('12%'),
    paddingHorizontal: wp('4%'),
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('30%'), 
  },
  calendarIcon: {
    paddingLeft: 10, 
    paddingRight: 5, 
  },
  cameraIcon: {
    paddingLeft: 5, 
    paddingRight: 0, 
  },
  dots: {
    paddingLeft: 5, 
    paddingRight: 5, 
  },
  headerImage1: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  me: {
    paddingLeft: 15,
  },
  drawerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    paddingLeft: 15,
  },
  drawerText1: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'gray',
    paddingLeft: 15,
  },
  check: {
    color: '#4169E1',
    marginLeft: 'auto',
  },
  plus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  eventModalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  eventsListContent: {
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewEventsIcon: {
    padding: 5,
  },
  calendar: {
    marginBottom: 10,
  },
  eventDetails: {
    marginBottom: 20,
  },
  eventText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  drawerContent: {
    width: '90%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  eventItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  popupMenu:{
    position:'absolute',
    marginTop:20,
    backgroundColor:'white',
    width:wp("47%"),
    top:12,
    right:-10,
    borderRadius:10,
    elevation:2,
  },
});
