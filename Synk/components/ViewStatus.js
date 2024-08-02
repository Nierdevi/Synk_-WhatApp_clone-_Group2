import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Dimensions,SafeAreaView,Pressable } from 'react-native';
import { Video } from 'expo-av';
import { getStatusesByPhoneNumber,getCurrentUserStatuses } from '../backend/statusService';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DateTime from './DateTime';
import { primaryColors } from '../constants/colors';
import { Ionicons, Entypo } from '@expo/vector-icons';


const ViewStatus = ({ route, navigation }) => {
  const { userData,contactName } = route.params;
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const flatListRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {  
        const fetchedStatuses = await getStatusesByPhoneNumber(userData.phoneNumber);
        setStatuses(fetchedStatuses);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, [userData.phoneNumber]);

  const handleNext = () => {
    if (currentIndex < statuses.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const renderItem = ({ item }) => {
    const mediaItem = item.media[0]; // Assumes only one media item per status
    return (
      <View style={styles.mediaContainer}>
        {mediaItem.mediaType === 'image' ? (
          <Image
            source={{ uri: mediaItem.mediaUrl }}
            style={styles.media}
            onError={() => console.log('Failed to load image:', mediaItem.mediaUrl)}
            resizeMode='contain'
          />
        ) : (
          <>
            <Video
              ref={videoRef}
              source={{ uri: mediaItem.mediaUrl }}
              style={styles.media}
              resizeMode="contain"
              isLooping={true}
              shouldPlay
              onPlaybackStatusUpdate={(status) => {
                setIsBuffering(status.isBuffering);
                if (status.didJustFinish) {
                  handleNext();
                }
              }}
              onError={(error) => console.log('Failed to load video:', error)}
            />
            {isBuffering && (
              <View style={styles.bufferingContainer}>
                <ActivityIndicator size="large" color={primaryColors.purple} />
              </View>
            )}
          </>
        )}
        {mediaItem.text && <Text style={styles.caption}>{mediaItem.text}</Text>}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={primaryColors.purple} />
      </View>
    );
  }
  const profilePicture = userData.profilePicture ? { uri: userData.profilePicture } : require('../assets/Avator.jpg');
  const date=statuses.length > 0 && new Date(statuses[currentIndex]?.createdAt)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={{marginLeft:15}}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Image source={profilePicture} style={styles.profilePicture} />
        <Text style={styles.userName}>{contactName}</Text>
        <Text style={styles.timestamp}>{DateTime(date)}</Text>
      </View>
      <View style={styles.progressContainer}>
        {statuses.map((_, index) => (
          <View key={index} style={styles.progressBarBackground}>
            {index === currentIndex && (
              <View style={styles.progressBarForeground} />
            )}
          </View>
        ))}
      </View>
      <FlatList
        ref={flatListRef}
        data={statuses}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        onScrollToIndexFailed={(info) => {
          console.error('Failed to scroll to index:', info);
        }}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
          if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
            if (statuses[newIndex].media[0].mediaType === 'video') {
              videoRef.current?.playAsync();
            }
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181B',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    // backgroundColor:'yellow',
    width:wp('100%'),
    marginTop:30,
    height:50,

  },
  profilePicture: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginLeft: 10,
    // backgroundColor:'red'
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:10
  },
  timestamp: {
    color: 'white',
    fontSize: 15,
    marginLeft: 'auto',
    fontWeight:'400',
    marginRight:15,
    alignSelf:'center'
  },
  progressContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 2,
    marginBottom: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 2,
    backgroundColor: 'gray',
    marginHorizontal: 1,
  },
  progressBarForeground: {
    height: 2,
    backgroundColor: 'white',
    width: '100%',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80%',
  },
  mediaContainer: {
    width: wp('100%'),
    height: '90%',
    // backgroundColor: 'red',
    justifyContent: 'center'
  },
  media: {
    alignSelf: 'flex-start',
    width: wp('100%'),
    height: '100%',
  },
  caption: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  bufferingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewStatus;
