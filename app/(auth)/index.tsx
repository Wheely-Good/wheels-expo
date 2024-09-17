import React from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '@/hooks/useAuthStore';

export default function HomePage() {
  const { session } = useAuthStore();

  return (
    <View className="space-y-6 p-6">
      <Text className="text-4xl font-bold text-blue-600">Welcome to Wheels</Text>
      <Text className="text-lg text-gray-600">
        Improve your skills and prepare for tests with our interactive lessons and practice sessions.
      </Text>
      <Text>User ID: {session?.user.id}</Text>
    </View>
  );
}