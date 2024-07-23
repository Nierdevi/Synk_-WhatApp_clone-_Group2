import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const SegmentedBorder = ({ segments, children }) => {
  const segmentCount = Math.max(segments, 1);
  const segmentAngle = 360 / segmentCount;
  const radius = 30; // Half of the fixed width/height

  const segmentStyles = Array.from({ length: segmentCount }).map((_, index) => ({
    transform: [
      { rotate: `${index * segmentAngle}deg` },
      { translateX: radius - 4 },
    ],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {children}
        {segmentStyles.map((style, index) => (
          <View key={index} style={[styles.segment, style]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 60,
    height: 60,
  },
  imageWrapper: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  segment: {
    position: 'absolute',
    width: 4,
    height: 30,
    backgroundColor: 'rgba(0, 0, 255, 0.5)', // Adjust color as needed
    borderRadius: 2,
  },
});

export default SegmentedBorder;
