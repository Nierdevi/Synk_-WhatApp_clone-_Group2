import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      // screenOptions={{
      //   tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      //   headerShown: false,
      // }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Chats',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name='home' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name='code-slash' color={color} />
            ),
          }}
        />
    </Tabs>
  );
}
