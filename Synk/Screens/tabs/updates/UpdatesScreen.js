import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraComponent from '../../../components/CameraComponent';
import Fab from '../../../components/fab';
import StatusList from '../../../components/StatusList ';
import { primaryColors } from '../../../constants/colors';

const DefaultProfileImg = () => (
  <View style={styles.statusContainer}>
      <View style={styles.statusWrapperDefault}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.statusImg} />
          <View style={styles.plusSign}>
              <Text style={styles.plusText}>+</Text>
          </View>
      </View>
      <Text style={styles.statusUser}>My Status</Text>
  </View>
);

const UpdatesScreen = ({ navigation }) => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [statuses, setStatuses] = useState([
      { id: 1, user: 'Synk', img: 'https://via.placeholder.com/50', total: 3, viewed: 1 }
  ]);
  const [channels, setChannels] = useState([]);
  const [followedChannels, setFollowedChannels] = useState([]);
  const [suggestedChannels, setSuggestedChannels] = useState([
      { id: 3, name: 'Synk', img: require('../../../assets/AppLogo.png'), followers: '7.5M' },
      { id: 4, name: 'CNN', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png', followers: 3200 },
      { id: 5, name: 'BBC News', img: 'https://asset.brandfetch.io/idtEghWGp4/idN4Y37uWH.png', followers: 9500 },
      { id: 6, name: 'TechCrunch', img: 'https://cdn.prod.website-files.com/60d07e2eecb304cb4350b53f/6630b429cd796ca047a8079d_techcrunch_logo.png', followers: 1500 },
      { id: 7, name: 'National Geographic', img: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Nat_Geo_HD.png', followers: 800 },
      { id: 8, name: 'ESPN', img: 'https://upload.wikimedia.org/wikipedia/commons/6/60/ESPN_logos.png', followers: 2000 }
  ]);

  const openCamera = () => {
    setIsCameraVisible(true);
  };

  const closeCamera = () => {
    setIsCameraVisible(false);
  };

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const apiKeyNYT = 'xICQ9NoAelPxIAplcKVta3keJdV5y2ur';
        const responseNYT = await fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKeyNYT}`);
        const dataNYT = await responseNYT.json();
        const latestArticleNYT = dataNYT.results[0];

        const nyTimesChannel = {
          id: 1,
          name: 'The New York Times',
          description: latestArticleNYT.title.split('.')[0] || 'Top stories',
          img: 'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg',
          time: getTimeAgo(latestArticleNYT.published_date),
          unread: dataNYT.results.length
        };

        const apiKeyBBC = 'c5dc75c07497410f91ee4702f12712e0';
        const responseBBC = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKeyBBC}`);
        const dataBBC = await responseBBC.json();
        const latestArticleBBC = dataBBC.articles[0];

        const bbcChannel = {
          id: 2,
          name: 'BBC News',
          description: latestArticleBBC.title.split('.')[0] || 'Top stories',
          img: 'https://asset.brandfetch.io/idtEghWGp4/idN4Y37uWH.png',
          time: getTimeAgo(latestArticleBBC.publishedAt),
          unread: dataBBC.articles.length
        };

        setChannels([nyTimesChannel, bbcChannel]);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    const getTimeAgo = (publishedDate) => {
      const date = new Date(publishedDate);
      const now = new Date();
      const seconds = Math.floor((now - date) / 1000);

      if (seconds < 60) return `${seconds} seconds ago`;
      else if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
      else if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
      else return `${Math.floor(seconds / 86400)} days ago`;
    };

    fetchChannels();
  }, []);

  const handleSelectChannel = (channel) => {
    navigation.navigate('ChannelDetails', { channel });
    navigation.setOptions({ headerShown: false });
  };

  const handleFollowChannel = (channelId) => {
    setFollowedChannels(prevState =>
      prevState.includes(channelId)
        ? prevState.filter(id => id !== channelId)
        : [...prevState, channelId]
    );

    updateChannelFollowers(channelId, followedChannels.includes(channelId) ? 'unfollow' : 'follow');
  };

  const updateChannelFollowers = (channelId, action) => {
    setSuggestedChannels(prevState =>
      prevState.map(channel => {
        if (channel.id === channelId) {
          const updatedCount = action === 'follow' ? channel.followers + 1 : channel.followers - 1;
          return {
            ...channel,
            followers: updatedCount
          };
        }
        return channel;
      })
    );
  };

  return (
    <Provider>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <StatusList />
          </View>
          <View style={styles.section}>
            <View style={styles.channelsHeader}>
              <Text style={styles.title}>Channels</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Explore', { channels })}>
                <Text style={styles.exploreText}>Explore &gt;</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={channels}
              renderItem={({ item }) => (
                <TouchableOpacity key={item.id} onPress={() => handleSelectChannel(item)}>
                  <View style={styles.listItem}>
                    <Image source={{ uri: item.img }} style={styles.channelImg} />
                    <View style={styles.channelInfo}>
                      <Text style={styles.channelName}>{item.name}</Text>
                      <Text style={styles.channelDescription} numberOfLines={1}>{item.description}</Text>
                    </View>
                    <View style={styles.channelMeta}>
                      <Text style={styles.channelTime}>{item.time}</Text>
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{item.unread}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.findChannelsContainer}>
            <Text style={styles.findChannelsText}>Find Channels to Follow</Text>
            <FlatList
              data={suggestedChannels}
              renderItem={({ item }) => (
                <View style={styles.suggestedChannelItem}>
                  <Image source={typeof item.img === 'string' ? { uri: item.img } : item.img} style={styles.suggestedChannelImg} />
                  <View style={styles.suggestedChannelInfo}>
                    <View style={styles.channelHeader}>
                      <Text style={styles.suggestedChannelName}>{item.name}</Text>
                      <Ionicons name="checkmark-circle" size={16} color={primaryColors.purple} style={styles.verifiedIcon} />
                    </View>
                    <Text style={styles.followersCount}>{item.followers.toLocaleString()} followers</Text>
                  </View>
                  {followedChannels.includes(item.id) ? (
                    <TouchableOpacity
                      style={[styles.followButton, styles.followingButton]}
                      onPress={() => handleFollowChannel(item.id)}
                    >
                      <Text style={styles.followButtonText}>Unfollow</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={() => handleFollowChannel(item.id)}
                    >
                      <Text style={styles.followButtonText}>Follow</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity style={styles.exploreMoreButton} onPress={() => navigation.navigate('Explore',{channels})}>
                          <Text style={styles.exploreMoreButtonText}>Explore More</Text>
                      </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.bottomRightIcons}>
                <TouchableOpacity style={[styles.bottomIcon, styles.pencilIcon, { marginBottom: 10 }]} onPress={() => navigation.navigate('EditStatus')}>
                    <Ionicons name="pencil" size={24} color="#fff" />
                </TouchableOpacity>
                <Fab type="updates" handlePress={openCamera}  />
              </View>
              <CameraComponent isVisible={isCameraVisible} onClose={closeCamera} />
          </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 20
},
title: {
    marginBottom: 10,
    color: '#555',
    fontSize: 18,
    fontWeight: 'bold'
},
statusContainer: {
    alignItems: 'center',
    marginRight: 15
},
statusWrapperDefault: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
},
statusImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: 2
},
  plusSign: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: primaryColors.purple,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
},
plusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
},
statusUser: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold'
},
  channelsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
},
 exploreText: {
    color: primaryColors.purple,
    fontSize: 16,
    fontWeight: 'bold'
},
listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
},
channelImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
},
channelInfo: {
    flex: 1,
    flexDirection: 'column'
},
channelName: {
    fontWeight: 'bold'
},
channelDescription: {
    color: '#888'
},
channelMeta: {
    alignItems: 'flex-end'
},
channelTime: {
    fontSize: 12,
    color: '#888'
},
unreadBadge: {
    backgroundColor: primaryColors.purple,
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginTop: 2
},
unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
},
findChannelsContainer: {
    paddingHorizontal: 20,
    marginTop: 20
},
findChannelsText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey'
},
suggestedChannelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between'
},
suggestedChannelImg: {
    width: 50,
    height: 50,
    borderRadius: 25
},
suggestedChannelInfo: {
    marginLeft: 10,
    flex: 1
},
channelHeader: {
    flexDirection: 'row',
    alignItems: 'center'
},
suggestedChannelName: {
    fontWeight: 'bold',
    marginBottom: 5
},
verifiedIcon: {
    marginLeft: 5
},
followersCount: {
    color: '#888',
    marginBottom: 5
},
followButton: {
    backgroundColor: primaryColors.purple,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center'
},
followButtonText: {
    color: '#fff',
    fontWeight: 'bold'
},
  followButtonText: {
    fontSize: 14,
      color: '#fff'
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  exploreMoreButton: {
    marginTop: 10,
    marginBottom: 120,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12, 
    borderRadius: 20,
    borderColor: primaryColors.purple,
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'flex-start' 
},
exploreMoreButtonText: {
    color: primaryColors.purple,
    fontSize: 14, // Reduced font size
    fontWeight: 'bold'
},
bottomRightIcons: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    alignItems: 'flex-end',
    height:140,
    marginRight:-16,
    marginBottom:-20
},
pencilIcon: {
    backgroundColor: 'grey',
    borderRadius: 15,
    width: 45,
    height: 45,
    right: 20,
},
bottomIcon: {
    backgroundColor: primaryColors.purple,
    borderRadius: 15,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
},
menuButton: {
    position: 'absolute',
    top: 10,
    right: 10
},
exploreText: {
    color: primaryColors.purple,
    fontWeight: 'bold'
}
});

export default UpdatesScreen;
