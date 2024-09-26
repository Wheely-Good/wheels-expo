import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useFlashcardStore } from '@/hooks/useFlashcardStore';

export default function LessonsPage() {
  const router = useRouter();
  const { cards, dueCards, getDueCards } = useFlashcardStore((state) => ({
    cards: state.cards,
    dueCards: state.dueCards,
    getDueCards: state.getDueCards,
  }));

  useFocusEffect(
    React.useCallback(() => {
      getDueCards();
    }, [getDueCards])
  );

  const statistics = useMemo(() => {
    const totalCards = cards.length;
    const dueCardsCount = dueCards.length;
    const now = new Date();

    const forecastGroups = [
      { name: 'Due now', count: 0 },
      { name: 'Due in 5 mins', count: 0 },
      { name: 'Due in 10 mins', count: 0 },
      { name: 'Due in 30 mins', count: 0 },
      { name: 'Due in 1 hour', count: 0 },
      { name: 'Due later', count: 0 },
    ];

    cards.forEach(card => {
      const timeDiff = (card.nextReview.getTime() - now.getTime()) / (1000 * 60); // Difference in minutes
      if (timeDiff <= 0) forecastGroups[0].count++;
      else if (timeDiff <= 5) forecastGroups[1].count++;
      else if (timeDiff <= 10) forecastGroups[2].count++;
      else if (timeDiff <= 30) forecastGroups[3].count++;
      else if (timeDiff <= 60) forecastGroups[4].count++;
      else forecastGroups[5].count++;
    });

    const learningCards = cards.filter(card => card.interval < 60 * 24 * 30).length; // Cards with interval < 30 days
    const masteredCards = totalCards - learningCards;

    return {
      totalCards,
      dueCardsCount,
      masteredCards,
      learningCards,
      forecastGroups,
    };
  }, [cards, dueCards]);

  // Helper function to return "card" or "cards" based on count
  const cardText = (count: number) => count === 1 ? "card" : "cards";

  return (
    <ScrollView className="flex-1 p-6 pb-20">
      <Text className="text-3xl font-bold text-gray-800 mb-6">Your Flashcards</Text>

      <View className="mb-6">
        <Text className="text-lg sm:text-xl font-semibold mb-2">Overview</Text>
        <View className="rounded-lg bg-white p-4 shadow-md">
          <Text className="text-md sm:text-lg mb-2 font-bold">Due Cards: {statistics.dueCardsCount}</Text>
          <Text className="text-md sm:text-lg mb-2 font-bold">Total Cards: {statistics.totalCards}</Text>
          <Text className="text-md sm:text-lg mb-2">Learning: {statistics.learningCards} {cardText(statistics.learningCards)}</Text>
          <Text className="text-md sm:text-lg">Mastered: {statistics.masteredCards} {cardText(statistics.masteredCards)}</Text>
        </View>
      </View>

      {/* TODO: Replace with bar chart */}
      <View className="mb-6">
        <Text className="text-lg sm:text-xl font-semibold mb-2">Upcoming Reviews Forecast</Text>
        <View className="rounded-lg bg-white p-4 shadow-md">
          {statistics.forecastGroups.map((group, index) => (
            <Text key={index} className="text-md sm:text-lg mb-2">
              {group.name}: {group.count} {cardText(group.count)}
            </Text>
          ))}
        </View>
      </View>

      <View className="items-center mt-2">
        {statistics.dueCardsCount > 0 ? (
          <TouchableOpacity
            onPress={() => router.push('./srs/studySession')}
            className="bg-blue-500 rounded-lg px-6 py-3"
          >
            <Text className="text-white text-lg font-semibold">Start Study Session</Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-lg text-gray-600">No cards are due for review.</Text>
        )}
      </View>
    </ScrollView>
  );
}