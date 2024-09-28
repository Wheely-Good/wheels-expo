import React from 'react';
import { View, Text } from 'react-native';

export default function Header() {
  return (
    <View className="bg-white shadow-md p-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold text-gray-800">Flashcards</Text>
      </View>
    </View>
  );
}