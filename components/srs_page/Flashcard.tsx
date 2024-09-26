import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/lib/superMemov2';
import { Audio } from 'expo-av';
import { Volume2 } from 'lucide-react-native';

interface FlashcardProps {
  card: Card;
  onGrade: (card: Card, grade: number) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, onGrade }) => {
  const [revealed, setRevealed] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    setRevealed(false);
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [card]);

  const playAudio = async (audioUrl: string) => {
    if (sound) {
      await sound.stopAsync();
      sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
    setSound(newSound);
    await newSound.playAsync();
  };

  return (
    <View className="flex-1 w-full max-w-md justify-center items-center p-4">
      <View className="bg-blue-100 p-6 rounded-lg shadow-md w-full">
      <View className="flex flex-row justify-between items-center relative">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-gray-800 text-center">{card.englishWord}</Text>
          </View>
          <TouchableOpacity onPress={() => playAudio(card.audioSource)} className="absolute right-0">
            <Volume2 className="h-5 w-5 text-gray" />
          </TouchableOpacity>
        </View>
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
        <View className="mt-6 w-full">
          {/* First row: Something and No Clue */}
          <View className="flex flex-row justify-between mb-4">
            <TouchableOpacity
              className="flex-1 border-2 border-red-500 px-4 py-2 mx-1 rounded-lg bg-white"
              onPress={() => onGrade(card, 1)}
            >
              <Text className="text-red-500 text-lg text-center">No Clue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 border-2 border-orange-500 px-4 py-2 mx-1 rounded-lg bg-white"
              onPress={() => onGrade(card, 2)}
            >
              <Text className="text-orange-500 text-lg text-center">Something</Text>
            </TouchableOpacity>
          </View>

          {/* Second row: Hard, Good, Easy */}
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              className="flex-1 border-2 border-yellow-500 px-4 py-2 mx-1 rounded-lg bg-white"
              onPress={() => onGrade(card, 3)}
            >
              <Text className="text-yellow-500 text-lg text-center">Hard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 border-2 border-blue-500 px-4 py-2 mx-1 rounded-lg bg-white"
              onPress={() => onGrade(card, 4)}
            >
              <Text className="text-blue-500 text-lg text-center">Good</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 border-2 border-green-500 px-4 py-2 mx-1 rounded-lg bg-white"
              onPress={() => onGrade(card, 5)}
            >
              <Text className="text-green-500 text-lg text-center">Easy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Flashcard;
