import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { lessonSteps } from './lesson_data';

interface HeaderProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export default function Header({ currentStep, setCurrentStep }: HeaderProps) {
  return (
    <View className="bg-white shadow-md p-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold text-gray-800">Japanese Lesson</Text>
        <TouchableOpacity className="md:hidden">
          <X className="h-6 w-6 text-gray-600" />
        </TouchableOpacity>
      </View>
      <View className="hidden md:flex-row md:space-x-4 mt-4">
        {lessonSteps.map((step, index) => (
          <TouchableOpacity
            key={index}
            className={`px-3 py-2 rounded-md ${
              currentStep === index
                ? 'bg-blue-500'
                : 'bg-gray-100'
            }`}
            onPress={() => setCurrentStep(index)}
          >
            <Text
              className={`text-sm font-medium ${
                currentStep === index ? 'text-white' : 'text-gray-600'
              }`}
            >
              {step.type.charAt(0).toUpperCase() + step.type.slice(1)} {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}