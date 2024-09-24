import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/hooks/useAuthStore';
import Loading from '@/components/Loading';
import Avatar from '@/components/account_page/Avatar';

export default function AccountPage() {
  const { session, isLoading, signOut } = useAuthStore((state) => ({
    session: state.session,
    isLoading: state.isLoading,
    signOut: state.signOut,
  }));

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!session || !session.user) {
        throw new Error('No user on the session!');
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      if (data) {
        setUsername(data.username || '');
        setFullName(data.full_name || '');
        setAvatarUrl(data.avatar_url);
        console.log('Profile data:', data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      Alert.alert('Error', 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const updateProfile = async (newAvatarUrl?: string) => {
    try {
      setLoading(true);
      if (!session || !session.user) {
        throw new Error('No user on the session!');
      }

      const updates = {
        id: session.user.id,
        username,
        full_name: fullName,
        avatar_url: newAvatarUrl || avatarUrl,
        updated_at: new Date().toISOString(),
      };

      console.log('Updating profile with:', updates);

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      Alert.alert('Success', 'Profile updated successfully!');
      if (newAvatarUrl) setAvatarUrl(newAvatarUrl);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = (url: string) => {
    console.log('New avatar URL:', url);
    updateProfile(url);
  };

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center justify-center p-6 min-h-screen">
        <View className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">Account Settings</Text>

          <Avatar
            url={avatarUrl}
            size={150}
            onUpload={handleAvatarUpload}
          />

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

            <TouchableOpacity onPress={() => updateProfile()} className="rounded-md bg-blue-600 px-4 py-2 mt-4">
              <Text className="text-white text-center">Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignOut} className="rounded-md bg-red-500 px-4 py-2 mt-4">
              <Text className="text-white text-center">Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}