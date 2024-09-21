import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, Play } from 'lucide-react-native';
import { Text } from "@/components/base/Text";

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps): JSX.Element {
  const router = useRouter();

  return (
    <View className="px-4 pt-16">
      <Text font="extraBold" className="text-5xl font-extrabold text-white text-center mb-6">
        Master IELTS Speaking with <Text font="extraBold" className="text-yellow-400">Wheels</Text>
      </Text>
      <Text font="medium" className="text-xl text-white text-center mb-10 max-w-2xl mx-auto">
        Accelerate your English speaking skills and ace your IELTS test with our interactive platform
      </Text>
      <View className="flex-row justify-center space-x-4">
        <TouchableOpacity
          className="bg-white px-6 py-3 rounded-full flex-row items-center"
          onPress={() => router.push('/sign-up')}
        >
          <Text font="medium" className="text-indigo-600 font-medium">Start Free Trial</Text>
          <ArrowRight className="ml-2 h-5 w-5 text-indigo-600" />
        </TouchableOpacity>
        <TouchableOpacity
          className="border-2 border-white px-6 py-3 rounded-full flex-row items-center"
          onPress={() => scrollToSection('demo')}
        >
          <Text font="medium" className="text-white font-medium">Learn More</Text>
          <Play className="ml-2 h-5 w-5 text-white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}