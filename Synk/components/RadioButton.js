// RadioButton.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ label, value, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(value)}>
      <View style={[styles.radioCircle, selected && styles.selectedRadioCircle]}>
        {selected && <View style={styles.selectedInnerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadioCircle: {
    borderColor: '#59c96b',
  },
  selectedInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#59c96b',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RadioButton;
