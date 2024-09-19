import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, Play } from 'lucide-react-native';
import CustomPressable from '@/components/ui/CustomPressable';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps): JSX.Element {
  const router = useRouter();

  return (
    <View className="px-4 pt-16">
      <Text className="text-5xl font-extrabold text-white text-center mb-6">
        Master IELTS Speaking with <Text className="text-yellow-400">Wheels</Text>
      </Text>
      <Text className="text-xl text-white text-center mb-10 max-w-2xl mx-auto">
        Accelerate your English speaking skills and ace your IELTS test with our interactive platform
      </Text>
      <View className="flex-row justify-center space-x-4">
        <CustomPressable
          className="bg-white px-6 py-3 rounded-full flex-row items-center"
          onPress={() => router.push('/sign-up')}
        >
          <Text className="text-indigo-600 font-medium">Start Free Trial</Text>
          <ArrowRight className="ml-2 h-5 w-5 text-indigo-600" />
        </CustomPressable>
        <CustomPressable
          className="border-2 border-white px-6 py-3 rounded-full flex-row items-center"
          onPress={() => scrollToSection('demo')}
        >
          <Text className="text-white font-medium">Learn More</Text>
          <Play className="ml-2 h-5 w-5 text-white" />
        </CustomPressable>
      </View>
    </View>
  );
}