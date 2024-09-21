import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from "@/components/base/Text";
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function CallToAction(): JSX.Element {
  const router = useRouter();

  return (
    <View className="bg-blue-600 text-white py-16 px-4">
      <View className="max-w-7xl mx-auto text-center">
        <Text font="bold" className="text-3xl text-white font-extrabold mb-8">Ready to Boost Your IELTS Speaking Score?</Text>
        <TouchableOpacity
          className="bg-white px-8 py-3 rounded-md inline-flex flex-row justify-center items-center"
          onPress={() => router.push('/sign-up')}
        >
          <Text className="text-blue-600 text-lg font-medium">Get Started Now</Text>
          <ArrowRight className="ml-2 h-5 w-5 text-blue-600 inline" />
        </TouchableOpacity>
      </View>
    </View>
  );
}