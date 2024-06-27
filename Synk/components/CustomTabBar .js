import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  // Determine if the tab bar should be visible
  const routeName = state.routes[state.index].name;
  const hiddenRoutes = ['ChatRoom', 'ChatInfo', 'GroupRoom', 'GroupInfo'];
  if (hiddenRoutes.includes(routeName)) {
    return null;
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName;
        if (route.name === 'Chats') {
          iconName = 'chatbubbles';
        } else if (route.name === 'Groups') {
          iconName = 'people';
        } else if (route.name === 'Updates') {
          iconName = 'time';
        } else if (route.name === 'Calls') {
          iconName = 'call';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <Icon name={iconName} size={24} color={isFocused ? '#673ab7' : '#222'} />
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: hp('10%'),
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: hp('2%'),
  },
  tab: {
    alignItems: 'center',
  },
});

export default CustomTabBar;
