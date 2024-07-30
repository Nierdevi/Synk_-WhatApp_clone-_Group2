import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Animated, LogBox, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { getStatusesByPhoneNumber } from '../backend/statusService';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


// Ignore warnings related to Animated API
LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);

const ViewStatus = ({ route,navigation }) => {
  const { userData } = route.params;
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const fetchedStatuses = await getStatusesByPhoneNumber(userData.phoneNumber);
        console.log("formatted stat: ", fetchedStatuses);
        setStatuses(fetchedStatuses);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, [userData.phoneNumber]);

  // useEffect(() => {
  //   if (statuses.length > 0) {
  //     const currentStatus = statuses[currentIndex];
  //     let duration = 10000; // Default 10 seconds for images
  //     if (currentStatus.media[0].mediaType === 'video') {
  //       duration = 30000; // Maximum 30 seconds for videos
  //     }

  //     Animated.timing(progressAnim, {
  //       toValue: 1,
  //       duration: duration,
  //       useNativeDriver: false,
  //     }).start(({ finished }) => {
  //       if (finished) {
  //         handleNext();
  //       }
  //     });
  //   }
  // }, [currentIndex, statuses]);

  useEffect(() => {
    getStatusesByPhoneNumber(userData.phoneNumber).then((res)=>{
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          console.log("stat: ",statuses)
          const nextIndex =prevIndex + 1 ;
          if(nextIndex!==res.length)
            flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
          else
          {
            clearInterval(intervalId)
            navigation.goBack()
          }
          console.log("next index: ",nextIndex)
          return nextIndex;
        });
      }, 10000); // 10 seconds
  
      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    })
    
  }, []);

  const handleNext = () => {
    if (currentIndex < statuses.length - 1) {
      progressAnim.setValue(0);
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      progressAnim.setValue(0);
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const renderItem = ({ item }) => {
    console.log("Current item:", item);
    const mediaItem = item.media[0]; // Assumes only one media item per status
    // const dimensions = mediaDimensions[index] || { width: Dimensions.get('window').width, height: 300 };
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
           <Video
             source={{ uri: mediaItem.mediaUrl }}
             style={styles.media}
             // useNativeContr/ols
            //  resizeMode="contain"
             isLooping={false}
             onPlaybackStatusUpdate={(status) => {
               if (status.didJustFinish) {
                 handleNext();
               }
             }}
             onError={(error) => console.log('Failed to load video:', error)}
           />
         )}
         {mediaItem.text && <Text style={styles.caption}>{mediaItem.text}</Text>}
      </View>
      // <>
      //   {mediaItem.mediaType === 'image' ? (
      //     <Image
      //       source={{ uri: mediaItem.mediaUrl }}
      //       style={styles.media}
      //       onError={() => console.log('Failed to load image:', mediaItem.mediaUrl)}
      //     />
      //   ) : (
      //     <Video
      //       source={{ uri: mediaItem.mediaUrl }}
      //       style={styles.media}
      //       // useNativeContr/ols
      //       resizeMode="contain"
      //       isLooping={false}
      //       onPlaybackStatusUpdate={(status) => {
      //         if (status.didJustFinish) {
      //           handleNext();
      //         }
      //       }}
      //       onError={(error) => console.log('Failed to load video:', error)}
      //     />
      //   )}
      //   {mediaItem.text && <Text style={styles.caption}>{mediaItem.text}</Text>}
      //   </>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.timestamp}>
          {statuses.length > 0 && new Date(statuses[currentIndex]?.createdAt).toLocaleString()}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        {statuses.map((_, index) => (
          <View key={index} style={styles.progressBarBackground}>
            {index === currentIndex ? (
              <Animated.View
                style={[
                  styles.progressBarForeground,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            ) : (
              <View style={styles.progressBarForeground} />
            )}
          </View>
        ))}
      </View>
      <FlatList
        ref={flatListRef}
        data={statuses}
        renderItem={renderItem}
        // renderItem={()=>{
        //   return <Text style={{fontSize:70, margin:200}}>Nmsr </Text>
        // }}
        keyExtractor={(item) => item.$id}
        horizontal
        pagingEnabled
        // scrollEnabled={false} // Disable manual scrolling
        onScrollToIndexFailed={(info) => {
          console.error('Failed to scroll to index:', info);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 'auto',
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
    backgroundColor:'red',
    justifyContent:'center'
  },
  media: {
    alignSelf:'flex-start',
    width: wp('100%'),
    height: '100%',
  },
  caption: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewStatus;
