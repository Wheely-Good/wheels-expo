import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { Text } from '@/components/base/Text';

interface ResultModalProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({
  isVisible,
  onClose,
  message,
}: ResultModalProps) {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="lg:ml-16 bg-white p-6 rounded-lg sm:w-[425px]">
          <Text className="text-lg mb-2">{message}</Text>
          <TouchableOpacity
            onPress={onClose}
            className={"w-full p-2 rounded bg-blue-500"}
          >
            <Text className="text-center text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
