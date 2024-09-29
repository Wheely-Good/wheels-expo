import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';

interface HeaderProps {
  onEndSession: () => void;
  remainingCards: number;
}

export default function Header({ onEndSession, remainingCards }: HeaderProps) {
  return (
    <View className="bg-white shadow-md p-4 flex-row justify-between items-center">
      <Text className="text-xl font-bold text-gray-800">Flashcards</Text>

      <View className="flex-row items-center space-x-2">
        <Text className="sm:text-lg font-semibold text-gray-600">Cards Left:</Text>
        <View className="bg-primary rounded-full px-3 py-1">
          <View style={{ width: 40, alignItems: 'center' }}>
            <Text className="text-white sm:text-lg font-bold">{remainingCards}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={onEndSession} className="ml-4">
        <X className="h-6 w-6 text-gray-600" />
      </TouchableOpacity>
    </View>
  );
}
