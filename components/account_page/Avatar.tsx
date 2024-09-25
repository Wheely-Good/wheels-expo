import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '@/hooks/useAuthStore';

interface AvatarProps {
  url: string | null;
  size?: number;
  onUpload: (url: string) => void;
}

export default function Avatar({ url, size = 150, onUpload }: AvatarProps) {
  const [uploading, setUploading] = useState(false);
  const uploadAvatar = useAuthStore((state) => state.uploadAvatar);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      handleUpload(result.assets[0].uri);
    }
  };

  const handleUpload = async (uri: string) => {
    try {
      setUploading(true);
      const currentAvatarUrl = url;
      const newAvatarUrl = await uploadAvatar(uri, currentAvatarUrl);
      if (newAvatarUrl) {
        onUpload(newAvatarUrl);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="items-center">
      {url ? (
        <Image
          source={{ uri: url }}
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
        className={`mt-2 w-40 h-9 rounded-md bg-blue-600 px-4 py-2`}
      >
        {uploading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-white text-center">Change Avatar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}