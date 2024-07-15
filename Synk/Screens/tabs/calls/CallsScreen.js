import { View, Text, StyleSheet, FlatList, Button, Image,TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { primaryColors, SecondaryColors } from '../../../constants/colors';
import { useTheme } from '../../../constants/themeContext';
import Fab from '../../../components/fab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import CallHeader from '../../../components/CusTabsHeaders/CallHeader';
import { Feather } from '@expo/vector-icons';


const CALL_HISTORY_KEY = 'callHistory';

const getCallHistory = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CALL_HISTORY_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error reading call history', e);
    return [];
  }
};

const saveCallHistory = async (callHistory) => {
  try {
    const jsonValue = JSON.stringify(callHistory);
    await AsyncStorage.setItem(CALL_HISTORY_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving call history', e);
  }
};

 const clearCallHistory = async () => {
  try {
    await AsyncStorage.removeItem(CALL_HISTORY_KEY);
  } catch (e) {
    console.error('Error clearing call history', e);
  }
};



export default function CallsScreen({ navigation, route }) {
  const { theme, toggleTheme } = useTheme();
  const [callHistory, setCallHistory] = useState([]);

  useEffect(() => {
    const loadCallHistory = async () => {
      const history = await getCallHistory();
      setCallHistory(history);
    };
    loadCallHistory();
  }, []);

  const handleClearCallLogs = async () => {
    await clearCallHistory();
    setCallHistory([]);
  };

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'CallsScreen';
    if (routeName === 'CallsScreen') {
      navigation.setOptions({
        tabBarStyle: {
          display: 'flex',
          height: 80,
          backgroundColor: theme === 'dark' ? 'black' : 'white',
        },
      });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    }
  }, [navigation, route, theme]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CallHeader handleClearCallLogs={handleClearCallLogs} />
    });
  }, [navigation, handleClearCallLogs]);

  const addDummyCall = async () => {
    const newCall = {
      id: Date.now(),
      type: 'voice', // 'voice' or 'video'
      status: 'missed', // 'answered', 'missed', 'declined'
      direction: 'outgoing', // 'incoming' or 'outgoing'
      timestamp: new Date().toISOString(),
      name: 'Akuffo Addo', // Dummy name
      profilePicture: 'https://via.placeholder.com/150', // Dummy profile picture URL
    };
    const updatedCallHistory = [...callHistory, newCall];
    setCallHistory(updatedCallHistory);
    await saveCallHistory(updatedCallHistory);
  };

  const renderItem = ({ item }) => {
    let statusColor = item.status === 'missed' || item.status === 'declined' ? 'red' : 'green';
    let callTypeIcon = item.type === 'voice' ? 'phone' : 'videocam';
    let directionIcon = item.direction === 'incoming' ? 'call-received' : 'call-made';
    let Color = statusColor;

    return (
      <View style={[styles.callItem,]}>
        <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
        <View style={styles.callDetails}>
          <Text style={[styles.name,{color:Color}]}>{item.name}</Text>
          <View style={styles.icons}>
            <Icon name={directionIcon} type="material" color={Color} size={19} />
            <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()} </Text>
          </View>
        </View>
        <View>
          <Icon name={callTypeIcon} type="material" />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity style={{width:wp('100%'),paddingHorizontal:20,paddingVertical:6,justifyContent:'flex-start',flexDirection:'row',}}>
      <View style={{width:45,height:45,borderRadius:30,backgroundColor:primaryColors.purple,alignItems:'center',justifyContent:'center'}}>
        <Feather name="link-2" size={24} color="black" />
      </View>
      <View style={{marginLeft:20,justifyContent:'center'}}>
        <Text style={{fontSize:16,fontWeight:'700'}}>Create Call Link </Text>
        <Text>Share a link for your Synk Call </Text>
      </View>
    </TouchableOpacity>
      <Text style={{fontSize:16,fontWeight:'500',textAlign:'left',width:wp('100%'),paddingHorizontal:20}}>Recent </Text>
      <FlatList
        data={callHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Add Dummy Call" onPress={addDummyCall} />
      <Fab type="calls" handlePress={() => { /* Add your handler here */ }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:wp('100%'),
    // backgroundColor:'ye'
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    // borderWidth: 1,
    marginVertical: 5,
    width:wp('95%'),
    flex:1
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  callDetails: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize:16
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    // color:'blue'
  },
  timestamp: {
    color: 'gray',
    marginLeft:10
  },
});
