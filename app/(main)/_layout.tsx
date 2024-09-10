import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import DesktopNavigation from '@/components/DesktopNavigation';
import MobileNavigation from '@/components/MobileNavigation';

export default function MainLayout() {
  return (
    <View className="flex flex-col h-screen bg-gray-50">
      <DesktopNavigation />
      <View className="lg:ml-16 flex-1 flex flex-col">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <MobileNavigation />
    </View>
  );

  
}