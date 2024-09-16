import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Mic, Play } from 'lucide-react-native';

export default function ExperienceLesson(): JSX.Element {
  return (
    <View className="bg-gray-100 py-16 px-4">
      <View className="max-w-7xl mx-auto">
        <Text className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Experience an IELTS Speaking Lesson
        </Text>
        <View className="bg-white rounded-lg shadow-lg overflow-hidden">
          <View className="p-6">
            <Text className="text-2xl font-bold text-gray-900 mb-4">Topic: Describing a Memorable Journey</Text>
            <Text className="text-gray-600 mb-6">In this lesson, you'll practice describing a memorable journey you've taken. We'll focus on using descriptive language, proper tenses, and structuring your response.</Text>
            <View className="space-y-4">
              <View className="flex-row items-start">
                <Mic className="h-6 w-6 text-blue-600" />
                <Text className="ml-3 text-gray-700">
                  <Text className='font-bold'>Describe a memorable journey you have taken. You should say:</Text>
                  {"\n"}
                  {"\n"}  • Where you went
                  {"\n"}  • Who you went with
                  {"\n"}  • What you did during the journey
                  {"\n"}
                  {"\n"}And explain why it was memorable for you.
                </Text>
              </View>
              <TouchableOpacity className="flex-row items-center justify-center w-full bg-blue-600 px-4 py-2 rounded-md">
                <Play className="h-5 w-5 mr-2 text-white" />
                <Text className="text-white font-semibold">Start Practice Session</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}