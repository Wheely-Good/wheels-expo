import React from 'react';
import { View, Text } from 'react-native';

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <View className="bg-blue-900 p-4">
      <View className="items-end">
        <Text className="text-white text-sm">
          © {currentYear} Wheels. All rights reserved.
        </Text>
      </View>
    </View>
  );
}