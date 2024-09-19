import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Loading from '@/components/Loading';
import { useAuthStore } from '@/hooks/useAuthStore';
import CustomPressable from '@/components/ui/CustomPressable';

export default function AccountPage() {
  const router = useRouter();
  const { isLoading, signOut } = useAuthStore((state) => ({
    isLoading: state.isLoading,
    signOut: state.signOut
  }));

  if (isLoading) {
    return <Loading />;
  }

  const handleSignOut = async () => {
    await signOut();
    router.replace('/sign-in');
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center justify-center p-6 min-h-screen">
        <View className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <Text className="text-2xl font-bold text-blue-600 mb-6 text-center">Account Settings</Text>
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
            <CustomPressable
              onPress={() => {}}
              className="rounded-md bg-blue-600 px-4 py-2 mt-4"
            >
              <Text className="text-white text-center">Save Changes</Text>
            </CustomPressable>
            <CustomPressable
              onPress={handleSignOut}
              className="rounded-md bg-red-500 px-4 py-2 mt-4"
            >
              <Text className="text-white text-center">Sign Out</Text>
            </CustomPressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}