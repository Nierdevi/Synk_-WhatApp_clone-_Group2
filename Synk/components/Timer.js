import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Countdown = ({ start,onComplete  }) => {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    setCount(start); // Reset the timer when the `start` prop changes
  }, [start]);

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup the timer on component unmount
    } else if (count===0){
      onComplete(); // Notify that the timer has completed
    }
  }, [count, onComplete]);

  return (
    <View style={styles.container}>
      <Text style={styles.countdownText}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    // lineHeight:29,
  },
  countdownText: {
    fontSize: 14,
    color: '#333',
    alignSelf:'center',
    // paddingTop:10
  },
});

export default Countdown;
