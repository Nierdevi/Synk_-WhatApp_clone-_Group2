import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import primaryColors from '../constants/colors'; // Adjust path as necessary

export const PopupMenu = ({ visible, onClose, menuItems }) => {
  return (
    <Menu opened={visible} onBackdropPress={onClose} style={styles.menuOption}>
      <MenuTrigger />
      <MenuOptions>
        {menuItems.map((item, index) => (
          <MenuOption key={index} onSelect={item.onPress}>
            <Text style={styles.menuOptionText}>{item.label}</Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuOption:{
    borderRadius:50
  },
  menuOptionText: {
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
});

