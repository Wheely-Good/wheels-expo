import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProfileStore } from '@/hooks/useProfileStore';
import SuccessModal from './SuccessModal';
import { User } from 'lucide-react-native';


interface AvatarProps {
  url: string | null;
  size?: number;
  onUpload: (url: string) => void;
}

export default function Avatar({ url, size = 150, onUpload }: AvatarProps) {
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newAvatarUri, setNewAvatarUri] = useState<string | null>(null); // Local URI shown only after successful upload

  const uploadAvatar = useProfileStore((state) => state.uploadAvatar);

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
        setNewAvatarUri(uri); // Set local URI only after successful upload
        setShowModal(true); // Show the success modal after a successful upload
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="items-center">
      {newAvatarUri || url ? (
        <Image
          source={{ uri: newAvatarUri || url || undefined }} // Display the new avatar only after successful upload
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <View className="w-[150px] h-[150px] rounded-full bg-gray-300 flex items-center justify-center">
          <User className="w-[140px] h-[140px] text-gray-500"/>
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
      <SuccessModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        message="Avatar uploaded successfully!"
      />
    </View>
  );
}
