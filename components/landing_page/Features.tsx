import React from 'react';
import { View } from 'react-native';
import { Text } from "@/components/base/Text";
import { Mic, Book, BarChart, Users } from 'lucide-react-native';
import FeatureCard from '@/components/landing_page/FeatureCard';

export default function Features(): JSX.Element {
  return (
    <View className="py-16 px-4">
      <View className="max-w-7xl mx-auto">
        <Text font="bold" className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Why Choose Wheels for IELTS Speaking?
        </Text>
        <View className="flex-row flex-wrap justify-between">
          <FeatureCard
            icon={<Mic className="h-10 w-10 text-indigo-600" />}
            title="Real-time Speaking Practice"
            description="Practice with our AI-powered speaking partner that simulates real IELTS conversations."
          />
          <FeatureCard
            icon={<Book className="h-10 w-10 text-indigo-600" />}
            title="Comprehensive Lessons"
            description="Access a wide range of lessons covering all aspects of the IELTS speaking test."
          />
          <FeatureCard
            icon={<BarChart className="h-10 w-10 text-indigo-600" />}
            title="Detailed Analytics"
            description="Track your progress with in-depth analysis of your speaking performance."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-indigo-600" />}
            title="Expert Feedback"
            description="Receive personalized feedback from IELTS experts to improve your skills."
          />
        </View>
      </View>
    </View>
  );
}