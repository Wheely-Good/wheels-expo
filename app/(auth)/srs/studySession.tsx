// components/StudySession.tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Flashcard from '@/components/srs_page/Flashcard';
import { Card } from '@/lib/superMemov2';
import { useFlashcardStore } from '@/hooks/useFlashcardStore';

const StudySession: React.FC = () => {
  const { dueCards, currentCardIndex, getDueCards, gradeCard } = useFlashcardStore((state) => ({
    dueCards: state.dueCards,
    currentCardIndex: state.currentCardIndex,
    getDueCards: state.getDueCards,
    gradeCard: state.gradeCard,
  }));

  // Fetch due cards when the component loads
  useEffect(() => {
    getDueCards();
  }, [getDueCards]);

  const currentCard = dueCards[currentCardIndex] || null;

  const handleGrade = (card: Card, grade: number) => {
    gradeCard(card, grade);
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
