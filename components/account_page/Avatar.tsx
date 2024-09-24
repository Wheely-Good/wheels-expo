import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';

interface AvatarProps {
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}

export default function Avatar({ url, size = 150, onUpload }: AvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) setAvatarUrl(url);
  }, [url]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      await uploadAvatar(asset.uri);
    }
  };

  const uploadAvatar = async (uri: string) => {
    try {
      setUploading(true);
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session?.user) {
        throw new Error('Session error or no user on the session!');
      }

      const userId = sessionData.session.user.id;
      const fileName = `avatar-${userId}-${Date.now()}.jpg`;
      const filePath = `avatars/${fileName}`;

      const photo = await fetch(uri);
      const photoBlob = await photo.blob();

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, photoBlob, {
          contentType: 'image/jpeg'
        });

      if (uploadError) throw uploadError;

      const { data, error: urlError } = await supabase.storage
        .from('avatars')
        .getPublicUrl(filePath) as { data: { publicUrl: string }; error: Error | null };

      if (urlError || !data?.publicUrl) {
        throw new Error('Error getting public URL');
      }

      setAvatarUrl(data.publicUrl);
      onUpload(data.publicUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="items-center">
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <View className={`w-[${size}px] h-[${size}px] rounded-full bg-gray-300 flex items-center justify-center`}>
          <Text>No Image</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={pickImage}
        disabled={uploading}
        className={`mt-2 rounded-md bg-blue-600 px-4 py-2 ${uploading ? 'opacity-50' : ''}`}
      >
        <Text className="text-white text-center">Change Avatar</Text>
      </TouchableOpacity>
      {uploading && <Text className="mt-2">Uploading...</Text>}
    </View>
  );
}
