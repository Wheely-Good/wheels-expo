import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useProfileStore } from '@/hooks/useProfileStore';
import Loading from '@/components/Loading';
import Avatar from '@/components/account_page/Avatar';
import SuccessModal from '@/components/account_page/SuccessModal';

export default function AccountPage() {
  const router = useRouter();

  const { session, isLoading, signOut } = useAuthStore((state) => ({
    session: state.session,
    isLoading: state.isLoading,
    signOut: state.signOut,
  }));

  const { updateProfile, getProfile } = useProfileStore((state) => ({
    updateProfile: state.updateProfile,
    getProfile: state.getProfile,
  }));

  const handleSignOut = async () => {
    await signOut();
    router.replace('/sign-in');
  };

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const profileData = await getProfile();
      if (profileData) {
        setUsername(profileData.username || '');
        setFullName(profileData.full_name || '');
        setAvatarUrl(profileData.avatar_url || null);  // Default to null if invalid
      }
      setLoading(false);
    };

    if (session) {
      fetchProfile();
    }
  }, [session, getProfile]);

  const handleProfileUpdate = async () => {
    const currentProfile = await getProfile();
    if (currentProfile && (currentProfile.username !== username || currentProfile.full_name !== fullName)) {
      await updateProfile({ username, full_name: fullName });
      setShowModal(true);
    }
  };

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center justify-center p-6 min-h-screen">
        <View className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">Account Settings</Text>

          <Avatar url={avatarUrl} size={150} onUpload={(newAvatarUrl) => setAvatarUrl(newAvatarUrl)} />

          <View className="space-y-4 mt-6">
            <Text className="font-medium text-gray-700">Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />

            <Text className="font-medium text-gray-700">Username</Text>
            <TextInput
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />

            <TouchableOpacity onPress={handleProfileUpdate} className="rounded-md bg-blue-600 px-4 py-2 mt-4">
              <Text className="text-white text-center">Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignOut} className="rounded-md bg-red-500 px-4 py-2 mt-4">
              <Text className="text-white text-center">Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SuccessModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        message="Profile updated successfully!"
      />
    </ScrollView>
  );
}
