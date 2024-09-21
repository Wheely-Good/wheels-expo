import React from 'react';
import { View } from 'react-native';
import { Text } from "@/components/base/Text";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps): JSX.Element {
  return (
    <View className="bg-white p-6 rounded-lg shadow-md w-[48%] mb-8">
      <View className="flex flex-row justify-center mb-4">
        {icon}
      </View>
      <Text className="text-lg font-semibold text-gray-900 mb-2 text-center">{title}</Text>
      <Text className="text-gray-600 text-center">{description}</Text>
    </View>
  );
}
