import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, useWindowDimensions } from 'react-native';
import OptionsHeader from '@/components/OptionsHeader';

export default function TestsPage() {
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 3 : 1; // Use 3 columns for tablet size and above

  const tests = [
    { id: 1, name: 'General Test 1', date: '2023-05-15', score: 7.5 },
    { id: 2, name: 'Advanced Test 1', date: '2023-05-20', score: 8.0 },
    { id: 3, name: 'General Test 2', date: '2023-05-25', score: 7.0 },
  ];

  const renderTestCard = ({ item }: { item: any }) => (
    <View className={`${numColumns === 1 ? 'w-full' : 'w-1/3'} p-2`}>
      <View className="rounded-lg bg-white p-4 shadow-md">
        <Text className="text-lg font-semibold text-gray">{item.name}</Text>
        <Text className="text-xs text-gray-500">Date: {item.date}</Text>
        <Text className="text-xs text-gray-500">Score: {item.score}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <View className="bg-white border-b border-gray-200 p-4">
        <OptionsHeader section="tests" />
      </View>
      <ScrollView className="flex-1 p-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-3xl font-bold text-gray">Your Tests</Text>
          <TouchableOpacity className="rounded-md bg-blue-600 px-4 py-2">
            <Text className="text-white text-center text-sm">New Test</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tests}
          renderItem={renderTestCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'flex-start' }}
        />
      </ScrollView>
    </View>
  );
}