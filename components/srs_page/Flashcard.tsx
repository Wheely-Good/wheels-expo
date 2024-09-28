import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/lib/superMemov2';
import { Volume2 } from 'lucide-react-native';

interface FlashcardProps {
  card: Card;
  revealed: boolean;
}

export default function Flashcard ({ card, revealed }: FlashcardProps) {
  return (
    <View className="bg-blue-100 min-h-96 p-6 rounded-lg shadow-md w-full">
      <View className="flex mt-20 items-center relative">
        <View className="flex-1">
          <Text className="text-3xl font-bold text-gray-800 text-center">{card.englishWord}</Text>
        </View>
        <TouchableOpacity>
          <Volume2 className="h-7 w-7 mt-4 text-gray-600" />
        </TouchableOpacity>
      </View>
      {revealed && <Text className="text-2xl mt-10 text-center text-gray-700">{card.japaneseWord}</Text>}
    </View>
  );
};