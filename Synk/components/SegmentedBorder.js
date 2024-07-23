import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const SegmentedBorder = ({ segments, children }) => {
  const segmentAngle = 360 / segments;
  const radius = 30; // Half of the width/height of the image plus border

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {children}
      </View>
      {Array.from({ length: segments }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            {
              transform: [
                { rotate: `${index * segmentAngle}deg` },
                { translateX: radius }
              ]
            }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segment: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: '#00f', // Color for the border segments
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});

export default SegmentedBorder;
