import React from 'react';
import { View, Text } from 'react-native';

export default function HomePage() {
  return (
    <View className="space-y-6">
      <Text className="text-4xl font-bold text-blue-600">Welcome to Wheels</Text>
      <Text className="text-lg text-gray-600">
        Improve your skills and prepare for tests with our interactive lessons and practice sessions.
      </Text>
    </View>
  );
}