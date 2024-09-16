import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export default function PricingCard({ title, price, features, highlighted = false }: PricingCardProps): JSX.Element {
  return (
    <View className={`bg-white p-6 rounded-lg shadow-md ${highlighted ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
      <Text className="text-2xl font-bold text-gray-900 mb-4">{title}</Text>
      <Text className="text-4xl font-extrabold text-blue-600 mb-6">
        {price}<Text className="text-lg font-normal text-gray-500">/month</Text>
      </Text>
      <View className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <View key={index} className="flex-row items-center">
            <ArrowRight className="h-5 w-5 text-green-500 mr-2" />
            <Text>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity className={`w-full py-2 px-4 rounded-md ${highlighted ? 'bg-blue-600' : 'bg-gray-200'}`}>
        <Text className={`text-center font-medium ${highlighted ? 'text-white' : 'text-gray-800'}`}>Choose Plan</Text>
      </TouchableOpacity>
    </View>
  );
}
