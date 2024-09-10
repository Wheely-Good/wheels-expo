import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function AccountPage() {
  return (
    <View className="flex-1 p-6">
      <Text className="text-3xl font-bold text-blue-600 mb-6">Account Settings</Text>
      <View className="space-y-4">
        <View className="space-y-2">
          <Text className="text-sm font-medium text-gray-700">Name</Text>
          <TextInput
            placeholder="Your name"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </View>
        <View className="space-y-2">
          <Text className="text-sm font-medium text-gray-700">Email</Text>
          <TextInput
            placeholder="Your email"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            keyboardType="email-address"
          />
        </View>
        <View className="space-y-2">
          <Text className="text-sm font-medium text-gray-700">New Password</Text>
          <TextInput
            placeholder="New password"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            secureTextEntry
          />
        </View>
        <TouchableOpacity className="rounded-md bg-blue-600 px-4 py-2 mt-4">
          <Text className="text-white text-center">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}