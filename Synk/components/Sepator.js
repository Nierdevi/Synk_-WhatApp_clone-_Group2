import { View, Text, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Separator = ({ name }) => {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.line} />
      <Text style={styles.separatorText}>{name}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  separatorContainer: {
    width:"100%",
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
  },
  separatorText: {
    width:20,
    flexDirection: 'row',
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
    flexWrap:'wrap',
    // backgroundColor:'red'
  },
});


