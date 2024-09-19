import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Mic } from 'lucide-react-native';
import CustomPressable from '@/components/ui/CustomPressable';

interface HeaderProps {
  isScrolled: boolean;
  scrollToSection: (sectionId: string) => void;
}

export default function Header({ isScrolled, scrollToSection }: HeaderProps): JSX.Element {
  return (
    <View className={`z-50 transition-all duration-300 ${isScrolled ? 'bg-indigo-600' : 'bg-transparent'}`}>
      <View className="flex-row justify-between items-center px-4 py-4">
        {/* Logo */}
        <View className="flex-row items-center">
          <Mic className="h-6 w-6 mr-2 text-white" />
          <Text className="text-white text-xl font-bold">Wheels</Text>
        </View>

        {/* Navigation Links */}
        <View className="flex-row space-x-6">
          {['features', 'demo', 'pricing'].map((section) => (
            <CustomPressable
              key={section}
              onPress={() => scrollToSection(section)}
            >
              <Text className="text-white capitalize">{section}</Text>
            </CustomPressable>
          ))}
        </View>

        {/* Auth Buttons */}
        <View className="flex-row items-center space-x-4">
        <Link href="/sign-in">
            <Text className="text-white">Log in</Text>
        </Link>
        <Link href="/sign-up" className="bg-white px-4 py-2 rounded-full">
            <Text className="text-indigo-600 font-semibold">Sign up</Text>
        </Link>
        </View>
      </View>
    </View>
  );
}