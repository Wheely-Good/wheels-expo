import React from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';
import { Book, TestTube2, User, Dumbbell, Bike } from 'lucide-react-native';

export default function MobileNavigation() {
  return (
    <View className="lg:hidden fixed bottom-0 left-0 right-0 bg-blue-600 p-4">
      <View className="flex flex-row justify-around">
        <Link href="/" >
          <Bike color="white" />
        </Link>
        <Link href="/tests" >
          <TestTube2 color="white" />
        </Link>
        <Link href="/lessons" >
          <Book color="white" />
        </Link>
        <Link href="/training" >
          <Dumbbell color="white" />
        </Link>
        <Link href="/account" >
          <User color="white" />
        </Link>
      </View>
    </View>
  );
}