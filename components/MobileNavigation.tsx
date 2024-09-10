import React from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';
import { Book, TestTube2, User, Home, Dumbbell } from 'lucide-react';

export default function MobileNavigation() {
  return (
    <View className="lg:hidden fixed bottom-0 left-0 right-0 bg-blue-600 p-4">
      <View className="flex flex-row justify-around">
        <Link href="/" className="text-white">
          <Home className="h-6 w-6" />
        </Link>
        <Link href="/tests" className="text-white">
          <TestTube2 className="h-6 w-6" />
        </Link>
        <Link href="/lessons" className="text-white">
          <Book className="h-6 w-6" />
        </Link>
        <Link href="/training" className="text-white">
          <Dumbbell className="h-6 w-6" />
        </Link>
        <Link href="/account" className="text-white">
          <User className="h-6 w-6" />
        </Link>
      </View>
    </View>
  );
}