import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import OptionsHeader from '@/components/OptionsHeader';
import { useRouter } from 'expo-router';

export default function LessonsPage() {
  const router = useRouter();

  // Hardcoded lesson
  const lesson = { id: 1, name: 'Introduction to Wheels', status: 'completed' };

  return (
    <View className="flex-1">
      <View className="bg-white border-b border-gray-200 p-4">
        <OptionsHeader section="lessons" />
      </View>
      <ScrollView className="flex-1 p-6">
        <Text className="text-3xl font-bold text-blue-600 mb-4">Lessons</Text>
        <TouchableOpacity
          className="rounded-lg bg-white p-6 shadow-md mb-4"
          onPress={() => router.push('/(auth)/LessonPage')}
        >
          <Text className="text-xl font-semibold text-blue-600">{lesson.name}</Text>
          <View className="flex-row items-center mt-2">
            {lesson.status === 'completed' && (
              <>
                <CheckCircle className="text-green-500" size={16} />
                <Text className="text-green-500 ml-2">Completed</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
