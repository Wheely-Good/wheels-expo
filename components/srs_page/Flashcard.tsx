import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/lib/superMemov2';

interface FlashcardProps {
  card: Card;
  onGrade: (card: Card, grade: number) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, onGrade }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
  }, [card]);

  return (
    <View className="flex-1 justify-center items-center p-4 bg-white">
      <View className="bg-blue-100 p-6 rounded-lg shadow-md w-full">
        <Text className="text-3xl text-center font-bold text-gray-800">{card.englishWord}</Text>
        {revealed ? (
          <Text className="text-2xl mt-4 text-center text-gray-700">{card.japaneseWord}</Text>
        ) : (
          <TouchableOpacity
            onPress={() => setRevealed(true)}
            className="mt-4 bg-blue-500 px-6 py-2 rounded-full"
          >
            <Text className="text-lg text-white text-center">Reveal</Text>
          </TouchableOpacity>
        )}
      </View>

      {revealed && (
        <View className="mt-6 w-full flex flex-row justify-between">
          <TouchableOpacity
            className="bg-green-500 px-4 py-2 rounded-full"
            onPress={() => onGrade(card, 5)}
          >
            <Text className="text-white text-lg">Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-full"
            onPress={() => onGrade(card, 4)}
          >
            <Text className="text-white text-lg">Good</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-yellow-500 px-4 py-2 rounded-full"
            onPress={() => onGrade(card, 3)}
          >
            <Text className="text-white text-lg">Hard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-orange-500 px-4 py-2 rounded-full"
            onPress={() => onGrade(card, 2)}
          >
            <Text className="text-white text-lg">Forgot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 rounded-full"
            onPress={() => onGrade(card, 1)}
          >
            <Text className="text-white text-lg">No clue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Flashcard;
