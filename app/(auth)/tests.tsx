import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import OptionsHeader from '@/components/OptionsHeader';

export default function TestsPage() {
  const tests = [
    { id: 1, name: 'General Test 1', date: '2023-05-15', score: 7.5 },
    { id: 2, name: 'Advanced Test 1', date: '2023-05-20', score: 8.0 },
    { id: 3, name: 'General Test 2', date: '2023-05-25', score: 7.0 },
  ];

  return (
    <View className="flex-1">
      <View className="bg-white border-b border-gray-200 p-4">
        <OptionsHeader section="tests" />
      </View>
      <ScrollView className="flex-1 p-6">
        <Text className="text-3xl font-bold text-blue-600 mb-4">Your Tests</Text>
        <TouchableOpacity className="rounded-md bg-blue-600 px-4 py-2 mb-4">
          <Text className="text-white text-center">Take New Test</Text>
        </TouchableOpacity>
        {tests.map((test) => (
          <View key={test.id} className="rounded-lg bg-white p-6 shadow-md mb-4">
            <Text className="text-xl font-semibold text-blue-600">{test.name}</Text>
            <Text className="text-sm text-gray-500">Date: {test.date}</Text>
            <Text className="text-sm text-gray-500">Score: {test.score}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}