import React from 'react';
import { View, Text } from 'react-native';
import OptionsHeader from '@/components/OptionsHeader';

export default function TrainingPage() {
  return (
    <View className="flex-1">
      <View className="bg-white border-b border-gray-200 p-4">
        <OptionsHeader section="training" />
      </View>
      <View className="flex-1 p-6">
        <Text className="text-3xl font-bold text-gray mb-4">Training</Text>
        <Text className="text-lg text-gray-600">
          Access your personalized training programs and track your progress.
        </Text>
        {/* Add training-specific content here */}
      </View>
    </View>
  );
}