import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/lib/superMemov2';
import { Button } from '@/components/ui/button';

interface FooterProps {
  card: Card;
  revealed: boolean;
  gradeItem: (card: Card, grade: number) => void;
  revealCard: () => void;
}

export default function Footer({ card, revealed, gradeItem, revealCard }: FooterProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(false);
  }, [revealed]);

  const handleGrade = useCallback((grade: number) => {
    setIsDisabled(true);
    gradeItem(card, grade);
  }, [card, gradeItem]);

  const gradeButtons = [
    // { grade: 1, text: 'No clue', color: 'red' },
    // { grade: 2, text: 'Something', color: 'orange' },
    { grade: 1, text: 'Hard', color: 'yellow' },
    { grade: 4, text: 'Good', color: 'blue' },
    { grade: 5, text: 'Easy', color: 'green' },
  ];

  return (
    <View className="items-center mb-14 lg:mb-0 p-4 w-full border-t border-gray-300">
      <View className="max-w-md w-full">
        {revealed ? (
          <View className="flex flex-row justify-between">
            {gradeButtons.map(({ grade, text, color }) => (
              <TouchableOpacity
                key={grade}
                className={`flex-1 border-2 border-${color}-500 px-4 py-2 mx-1 rounded-lg bg-white`}
                onPress={() => handleGrade(grade)}
                disabled={isDisabled}
              >
                <Text className={`text-${color}-500 text-2xl text-center`}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Button
            onClick={revealCard}
            className='flex-1 border-2 px-4 py-2 mx-1'
          >
            <Text className="text-2xl text-white text-center">Reveal</Text>
          </Button>
        )}
      </View>
    </View>
  );
}