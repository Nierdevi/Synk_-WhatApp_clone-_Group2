import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import primaryColors from '../constants/colors'; // Adjust path as necessary

export const PopupMenu = ({ visible, onClose, menuItems,style }) => {
  return (
    <Menu opened={visible} onBackdropPress={onClose} style={styles.menuOption}>
      <MenuTrigger />
      <MenuOptions style={[styles.options,style]}>
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
    borderRadius:60,
    // paddingTop:200
  },
  menuOptionText: {
    padding: 10,
    fontSize: 16,
    color: 'black',
    // borderRadius:50
  },
  options:{
    // marginTop:20
  }
});

