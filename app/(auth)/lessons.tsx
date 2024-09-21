import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { CheckCircle, Clock } from 'lucide-react-native';
import OptionsHeader from '@/components/OptionsHeader';
import { useRouter } from 'expo-router';

export default function LessonsPage() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 3 : 1; // Use 3 columns for tablet size and above

  const lessons = [
    { id: 1, name: 'Introduction to Wheels', status: 'completed' },
    { id: 2, name: 'Basic Techniques', status: 'in-progress' },
    { id: 3, name: 'Advanced Maneuvers', status: 'not-started' },
    { id: 4, name: 'Safety Procedures', status: 'not-started' },
  ];

  const renderLessonCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      key={item.id}
      className={`${numColumns === 1 ? 'w-full' : 'w-1/3'} p-2`}
      onPress={() => {
        if (item.id === 1) {
          router.push('/lessons/sample');
        }
      }}
    >
      <View className="rounded-lg bg-white p-4 shadow-md">
        <Text className="text-xl font-semibold text-gray mb-2">{item.name}</Text>
        <View className="flex-row items-center">
          {item.status === 'completed' && (
            <>
              <CheckCircle className="text-green-500" size={16} />
              <Text className="text-green-500 ml-2">Completed</Text>
            </>
          )}
          {item.status === 'in-progress' && (
            <>
              <Clock className="text-yellow-500" size={16} />
              <Text className="text-yellow-500 ml-2">In Progress</Text>
            </>
          )}
          {item.status === 'not-started' && (
            <Text className="text-gray-500">Not Started</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <View className="bg-white border-b border-gray-200 p-4">
        <OptionsHeader section="lessons" />
      </View>
      <ScrollView className="flex-1 p-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-3xl font-bold text-gray">Lessons</Text>
          <TouchableOpacity className="rounded-md bg-primary px-4 py-2">
            <Text className="text-white text-center text-sm">New Lesson</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-wrap">
          {lessons.map((lesson) => renderLessonCard({ item: lesson }))}
        </View>
      </ScrollView>
    </View>
  );
}