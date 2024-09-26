import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Flashcard from '@/components/srs_page/Flashcard';
import { Card } from '@/lib/superMemov2';
import { useFlashcardStore } from '@/hooks/useFlashcardStore';
import { useRouter } from 'expo-router';
import Header from '@/components/srs_page/Header';

const StudySession: React.FC = () => {
  const router = useRouter(); // For navigation
  const { dueCards, currentCardIndex, gradeCard } = useFlashcardStore((state) => ({
    dueCards: state.dueCards,
    currentCardIndex: state.currentCardIndex,
    gradeCard: state.gradeCard,
  }));

  const currentCard = dueCards[currentCardIndex] || null;

  const handleGrade = (card: Card, grade: number) => {
    gradeCard(card, grade);
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Fixed Header with shadow */}
      <View style={{ zIndex: 1, elevation: 5 }}>
        <Header />
      </View>

      {/* Scrollable area below the header */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 justify-center items-center">
          {currentCard ? (
            <Flashcard card={currentCard} onGrade={handleGrade} />
          ) : (
            <View className="justify-center items-center">
              <Text className="text-xl mb-4 text-center">
                You have completed all of your due cards for now!
              </Text>
              <TouchableOpacity
                onPress={() => router.push('./')}
                className="bg-blue-500 rounded-lg px-4 py-2"
              >
                <Text className="text-white text-lg">Return to menu</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudySession;
