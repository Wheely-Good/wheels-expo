import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Volume2, Flag } from 'lucide-react-native';

interface ResultModalProps {
  isVisible: boolean;
  isCorrect: boolean;
  onClose: () => void;
  sentence: string;
  translation: string;
}

export default function ResultModal({
  isVisible,
  isCorrect,
  onClose,
  sentence,
  translation,
}: ResultModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className={`bg-white p-6 rounded-lg w-5/6 ${isCorrect ? 'bg-green-100' : 'bg-gray-100'}`}>
          <Text className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-700' : 'text-gray-700'}`}>
            {isCorrect ? 'Correct' : 'Not correct'}
          </Text>
          <Text className="text-lg font-semibold mb-2">{sentence}</Text>
          <Text className="text-gray-600 mb-4">{translation}</Text>
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity className="bg-gray-200 p-2 rounded">
              <Volume2 className="h-5 w-5 text-gray-600" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 p-2 rounded">
              <Flag className="h-5 w-5 text-gray-600" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className={`w-full p-2 rounded ${isCorrect ? 'bg-green-500' : 'bg-blue-500'}`}
          >
            <Text className="text-center text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}