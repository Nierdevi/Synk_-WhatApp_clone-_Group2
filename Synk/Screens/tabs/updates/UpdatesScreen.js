import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider, Menu, Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  const [statuses, setStatuses] = useState([
      { id: 1, user: 'Synk', img: 'https://via.placeholder.com/50', total: 3, viewed: 1 }
  ]);

  const [channels, setChannels] = useState([]);
  const [followedChannels, setFollowedChannels] = useState([]);

  const Applogo=require('../../../assets/AppLogo.png')
  console.log(Applogo)

  const suggestedChannels = [
      { id: 3, name: 'Synk', img: Applogo, followers: '6.7k followers' },
      { id: 4, name: 'CNN', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png', followers: '3.2k followers' },
      { id: 5, name: 'BBC News', img: 'https://www.newscaststudio.com/wp-content/uploads/2024/03/bbc-news-logo-new-1536x867.jpg', followers: '900 followers' },
      { id: 6, name: 'TechCrunch', img: 'https://cdn.prod.website-files.com/60d07e2eecb304cb4350b53f/6630b429cd796ca047a8079d_techcrunch_logo.png', followers: '1.5k followers' },
      { id: 7, name: 'National Geographic', img: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Nat_Geo_HD.png', followers: '800 followers' },
      { id: 8, name: 'ESPN', img: 'https://upload.wikimedia.org/wikipedia/commons/6/60/ESPN_logos.png', followers: '2k followers' }
  ];
  

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
                  img: 'https://www.newscaststudio.com/wp-content/uploads/2024/03/bbc-news-logo-new-1536x867.jpg',
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
      navigation.setOptions({ headerShown: false })
  };

  const handleFollowChannel = (channelId) => {
      setFollowedChannels(prevState => [...prevState, channelId]);
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
      <Provider>
          <View style={styles.container}>
              <ScrollView>
                  <View style={styles.section}>
                      <Text style={styles.title}>Status</Text>
                      <FlatList
                          horizontal
                          data={[{ id: 'default', user: 'My Status', img: 'https://via.placeholder.com/50' }, ...statuses]}
                          renderItem={({ item }) => (
                              item.id === 'default' ? (
                                  <DefaultProfileImg />
                              ) : (
                                  <View key={item.id} style={styles.statusContainer}>
                                      <View style={[
                                          styles.statusWrapper,
                                          { borderColor: item.viewed < item.total ? primaryColors.purple : '#ccc' }
                                      ]}>
                                          <Image source={{ uri: item.img }} style={styles.statusImg} />
                                      </View>
                                      <Text style={styles.statusUser}>{item.user}</Text>
                                  </View>
                              )
                          )}
                          keyExtractor={item => item.id.toString()}
                          showsHorizontalScrollIndicator={false}
                      />
                  </View>
                  <View style={styles.section}>
                      <View style={styles.channelsHeader}>
                          <Text style={styles.title}>Channels</Text>
                          <TouchableOpacity onPress={() => navigation.navigate('Explore',{channels})}>
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
                                          <Text style={styles.channelDescription}>{item.description}</Text>
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
                                      <Text style={styles.followersCount}>{item.followers}</Text>
                                  </View>
                                  {followedChannels.includes(item.id) ? (
                                          <Text style={styles.followingText}>Following</Text>
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
                  <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('CameraStatus')}>
                      <Ionicons name="camera" size={24} color="#fff" />
                  </TouchableOpacity>
              </View>
              <Menu
                  visible={menuVisible}
                  onDismiss={closeMenu}
                  anchor={
                      <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
                          <Ionicons name="ellipsis-vertical" size={24} color="black" />
                      </TouchableOpacity>
                  }
              >
                  <Menu.Item onPress={() => {}} title="Status privacy" />
                  <Menu.Item onPress={() => {}} title="Create channel" />
                  <Divider />
                  <Menu.Item onPress={() => {}} title="Settings" />
              </Menu>
          </View>
      </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff'
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
  statusContainer: {
      alignItems: 'center',
      marginRight: 15
  },
  statusWrapper: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
  },
  statusWrapperDefault: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
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
  statusImg: {
      width: 50,
      height: 50,
      borderRadius: 25,
      zIndex: 2
  },
  statusUser: {
      marginTop: 5,
      textAlign: 'center',
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
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10
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
  followingText: {
      color: '#888',
      fontWeight: 'bold'
  },
  followButton: {
      backgroundColor: primaryColors.purple,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
      alignItems: 'center'
  },
  followButtonText: {
      color: '#fff',
      fontWeight: 'bold'
  },
  followingText: {
      fontSize: 14,
      color: primaryColors.purple
  },
  exploreMoreButton: {
      marginTop: 10,
      marginBottom: 120,
      backgroundColor: '#fff',
      paddingVertical: 8, // Reduced padding
      paddingHorizontal: 12, // Reduced padding
      borderRadius: 20,
      borderColor: primaryColors.purple,
      borderWidth: 1,
      alignItems: 'center',
      alignSelf: 'flex-start' // Align button to the left
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
      alignItems: 'flex-end'
  },
  pencilIcon: {
      backgroundColor: 'grey',
      borderRadius: 15,
      width: 45,
      height: 45,
      right: 9,
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
  channelsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10
  },
  exploreText: {
      color: primaryColors.purple,
      fontWeight: 'bold'
  }
});

export default UpdatesScreen;
