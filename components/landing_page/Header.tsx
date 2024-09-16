import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Mic } from 'lucide-react-native';

interface HeaderProps {
  isScrolled: boolean;
  scrollToSection: (sectionId: string) => void;
}

export default function Header({ isScrolled, scrollToSection }: HeaderProps): JSX.Element {
  const router = useRouter();

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
            <TouchableOpacity key={section} onPress={() => scrollToSection(section)}>
              <Text className="text-white capitalize">{section}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Auth Buttons */}
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="text-white">Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white px-4 py-2 rounded-full"
            onPress={() => router.push('/signup')}
          >
            <Text className="text-indigo-600 font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}