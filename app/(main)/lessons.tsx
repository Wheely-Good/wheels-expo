import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CheckCircle, Clock } from 'lucide-react-native';
import OptionsHeader from '@/components/OptionsHeader';

export default function LessonsPage() {
  const lessons = [
    { id: 1, name: 'Introduction to Wheels', status: 'completed' },
    { id: 2, name: 'Basic Techniques', status: 'in-progress' },
    { id: 3, name: 'Advanced Maneuvers', status: 'not-started' },
    { id: 4, name: 'Safety Procedures', status: 'not-started' },
  ];

  return (
    <View className="flex-1">
      <View className="bg-white border-b border-gray-200 p-4">
        <OptionsHeader section="lessons" />
      </View>
      <ScrollView className="flex-1 p-6">
        <Text className="text-3xl font-bold text-blue-600 mb-4">Lessons</Text>
        {lessons.map((lesson) => (
          <View key={lesson.id} className="rounded-lg bg-white p-6 shadow-md mb-4">
            <Text className="text-xl font-semibold text-blue-600">{lesson.name}</Text>
            <View className="flex-row items-center mt-2">
              {lesson.status === 'completed' && (
                <>
                  <CheckCircle className="text-green-500" size={16} />
                  <Text className="text-green-500 ml-2">Completed</Text>
                </>
              )}
              {lesson.status === 'in-progress' && (
                <>
                  <Clock className="text-yellow-500" size={16} />
                  <Text className="text-yellow-500 ml-2">In Progress</Text>
                </>
              )}
              {lesson.status === 'not-started' && (
                <Text className="text-gray-500">Not Started</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}