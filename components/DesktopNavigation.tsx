import React from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';
import { Book, TestTube2, User, Bike, Dumbbell } from 'lucide-react-native';

export default function DesktopNavigation() {
  return (
    <View className="hidden lg:flex w-16 bg-primary h-screen fixed left-0 top-0 flex-col items-center justify-between py-4">
      <View className="space-y-8 mt-5">
        <Link href="/" className="block text-white">
          <Bike className="h-6 w-6 mb-4" />
        </Link>
        <Link href="/tests" className="block text-white">
          <TestTube2 className="h-6 w-6" />
        </Link>
        <Link href="/lessons" className="block text-white">
          <Book className="h-6 w-6" />
        </Link>
        <Link href="/training" className="block text-white">
          <Dumbbell className="h-6 w-6" />
        </Link>
      </View>
      <Link href="/account" className="block text-white">
        <User className="h-6 w-6" />
      </Link>
    </View>
  );
}