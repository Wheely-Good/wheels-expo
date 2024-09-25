// components/StudySession.tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Flashcard from '@/components/srs_page/Flashcard';
import { superMemoV2, Card } from '@/lib/superMemov2';

const initialCards: Card[] = [
  {
    id: '1',
    englishWord: 'apple',
    japaneseWord: 'りんご',
    interval: 1,
    repetition: 0,
    easiness: 2.5,
    nextReview: new Date(),
  },
  {
    id: '2',
    englishWord: 'dog',
    japaneseWord: '犬',
    interval: 1,
    repetition: 0,
    easiness: 2.5,
    nextReview: new Date(),
  },
  {
    id: '3',
    englishWord: 'book',
    japaneseWord: '本',
    interval: 1,
    repetition: 0,
    easiness: 2.5,
    nextReview: new Date(),
  },
];

const StudySession: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  const currentCard = cards[currentCardIndex];

  const handleGrade = (card: Card, grade: number) => {
    const updatedCard = superMemoV2(card, grade);
    const updatedCards = [...cards];
    updatedCards[currentCardIndex] = updatedCard;
    setCards(updatedCards);

    // Move to the next card
    const nextIndex = currentCardIndex + 1;
    if (nextIndex < cards.length) {
      setCurrentCardIndex(nextIndex);
    } else {
      setCurrentCardIndex(0); // Loop back to the first card after completing all
    }
  };

  if (!currentCard) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='text-xl'>No cards to review!</Text>
      </View>
    );
  }

  return <Flashcard card={currentCard} onGrade={handleGrade} />;
};

export default StudySession;
