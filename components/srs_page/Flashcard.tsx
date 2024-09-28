import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/lib/superMemov2';
import { Volume2 } from 'lucide-react-native';
import { Button } from '../ui/button';

interface FlashcardProps {
  card: Card;
  gradeItem: (card: Card, grade: number) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, gradeItem }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
  }, [card]);

  return (
    <View className="flex h-full w-full justify-between items-center">
      {/* Flashcard Content */}
      <View className='flex-grow w-full p-6 items-center justify-center '>
        <View className=" bg-blue-100 min-h-96 p-6 rounded-lg shadow-md max-w-md w-full">
          <View className="flex mt-20 items-center relative">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-gray-800 text-center">{card.englishWord}</Text>
            </View>
            <TouchableOpacity>
              <Volume2 className="h-7 w-7 mt-4 text-gray-600" />
            </TouchableOpacity>
          </View>
          {revealed ? (
            <Text className="text-2xl mt-10 text-center text-gray-700">{card.japaneseWord}</Text>
          ) : null}
        </View>
      </View>

      {/* Footer with Reveal or Grade buttons */}
      <View className="flex items-center mb-14 lg:mb-0 p-4 w-full border-t border-gray-300">
        <View className="max-w-md w-full">
        {revealed ? (
          <View>
            {/* First row: No Clue and Something */}
            {/* <View className="flex flex-row justify-between mb-4">
              <TouchableOpacity
                className="flex-1 border-2 border-red-500 px-4 py-2 mx-1 rounded-lg bg-white"
                onPress={() => gradeItem(card, 1)}
              >
                <Text className="text-red-500 text-2xl text-center">No Clue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 border-2 border-orange-500 px-4 py-2 mx-1 rounded-lg bg-white"
                onPress={() => gradeItem(card, 2)}
              >
                <Text className="text-orange-500 text-2xl text-center">Something</Text>
              </TouchableOpacity>
            </View> */}

            {/* Second row: Hard, Good, Easy */}
            <View className="flex flex-row justify-between">
              <TouchableOpacity
                className="flex-1 border-2 border-yellow-500 px-4 py-2 mx-1 rounded-lg bg-white"
                onPress={() => gradeItem(card, 3)}
              >
                <Text className="text-yellow-500 text-2xl text-center">Hard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 border-2 border-blue-500 px-4 py-2 mx-1 rounded-lg bg-white"
                onPress={() => gradeItem(card, 4)}
              >
                <Text className="text-blue-500 text-2xl text-center">Good</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 border-2 border-green-500 px-4 py-2 mx-1 rounded-lg bg-white"
                onPress={() => gradeItem(card, 5)}
              >
                <Text className="text-green-500 text-2xl text-center">Easy</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Button
            onClick={() => setRevealed(true)}
            className='flex-1 border-2 px-4 py-2 mx-1'
          >
            <Text className="text-2xl text-white text-center">Reveal</Text>
          </Button>
        )}
        </View>
      </View>
    </View>
  );
};

export default Flashcard;
