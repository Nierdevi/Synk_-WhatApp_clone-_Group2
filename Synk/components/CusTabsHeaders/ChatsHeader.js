import { Entypo, Feather, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppLogo from '../../assets/AppLogo.png';
import { primaryColors } from '../../constants/colors';
import { useTheme } from '../../constants/themeContext';
import CameraComponent from '../CameraComponent';
import { PopupMenu } from '../PopupMenu';

const isIOS = Platform.OS === 'ios';

export default function ChatsHeader() {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const openCamera = () => setIsCameraVisible(true);
  const closeCamera = () => setIsCameraVisible(false);

  const openEventModal = () => setIsEventModalVisible(true);
  const closeEventModal = () => setIsEventModalVisible(false);

  const handleSelectDate = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleSubmitEvent = () => {
    console.log('Event Date:', selectedDate);
    console.log('Event Title:', eventTitle);
    console.log('Event Description:', eventDescription);
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
    setMenuVisible(false);
  };

  const handleNavigateToLinked = () => {
    // Handle navigation to Linked Devices
  };

  const toggleDrawer = () => setIsDrawerVisible(!isDrawerVisible);

  const closeModal = () => setIsDrawerVisible(false);

  const stopPropagation = event => {
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
            <Text style={styles.eventTitle}>Event Scheduling</Text>
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
    backgroundColor: 'white',
    elevation: 3,
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
  popupMenu: {
    position: 'absolute',
    marginTop: 20,
    backgroundColor: 'white',
    width: wp("47%"),
    top: 12,
    right: -10,
    borderRadius: 10,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  eventModalContent: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 100, 
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendar: {
    marginBottom: 20,
  },
  eventDetails: {
    marginBottom: 20,
  },
  eventText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 'auto',
  },
  headerImage1: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  me: {
    flex: 1,
  },
  drawerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerText1: {
    fontSize: 14,
    color: '#666',
  },
  check: {
    marginLeft: 'auto',
  },
  plus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});
