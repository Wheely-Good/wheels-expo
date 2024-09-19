import React from 'react';
import { Text, ScrollView, } from 'react-native';
import CustomPressable from '@/components/ui/CustomPressable';

type OptionsHeaderProps = {
  section: 'tests' | 'lessons' | 'training';
};

const options = {
  tests: ['General Test 1', 'Advanced Test 1', 'General Test 2'],
  lessons: ['Introduction to Wheels', 'Basic Techniques', 'Advanced Maneuvers', 'Safety Procedures'],
  training: ['Beginner Program', 'Intermediate Program', 'Advanced Program'],
};

export default function OptionsHeader({ section }: OptionsHeaderProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}>
      {options[section].map((option, index) => (
        <CustomPressable
          onPress={() => {}}
          key={index}
          className="px-4 py-2 mr-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition duration-300 whitespace-nowrap"
        >
          <Text>{option}</Text>
        </CustomPressable>
      ))}
    </ScrollView>
  );
}