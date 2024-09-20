import React, { useEffect, useState } from 'react';
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
  const [displayedSentence, setDisplayedSentence] = useState(sentence);
  const [displayedTranslation, setDisplayedTranslation] = useState(translation);

  // When the modal becomes visible, freeze the sentence and translation so that the data from the next question is not displayed during fade out
  useEffect(() => {
    if (isVisible) {
      setDisplayedSentence(sentence);
      setDisplayedTranslation(translation);
    }
  }, [isVisible, sentence, translation]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className={`bg-white p-6 rounded-lg sm:w-[425px] ${isCorrect ? 'bg-green-100' : 'bg-gray-100'}`}>
          <Text className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? 'Correct' : 'Incorrect'}
          </Text>
          <Text className="text-lg font-semibold mb-2">{displayedSentence}</Text>
          <Text className="text-gray-600 mb-4">{displayedTranslation}</Text>
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
