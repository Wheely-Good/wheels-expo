import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useFlashcardStore } from '@/hooks/useFlashcardStore';

export default function LessonsPage() {
  const router = useRouter();
  const { cards, resetDailyCount, getDueAndNewCardCounts, startStudySession, maxNewCardsPerDay, setMaxNewCardsPerDay } = useFlashcardStore((state) => ({
    cards: state.cards,
    resetDailyCount: state.resetDailyCount,
    getDueAndNewCardCounts: state.getDueAndNewCardCounts,
    startStudySession: state.startStudySession,
    maxNewCardsPerDay: state.maxNewCardsPerDay, // Get the max new cards
    setMaxNewCardsPerDay: state.setMaxNewCardsPerDay, // Get the method to set max new cards
  }));

  const [newMaxCards, setNewMaxCards] = useState(maxNewCardsPerDay); // State for input
  const [isEditing, setIsEditing] = useState(false); // Track if user is editing
  const [showUpdatedMessage, setShowUpdatedMessage] = useState(false); // Track if the updated message is shown


  useEffect(() => {
    resetDailyCount();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Refresh the counts when the page is focused
      getDueAndNewCardCounts();
    }, [getDueAndNewCardCounts])
  );

  const { dueCount, newCount } = getDueAndNewCardCounts();

  const statistics = useMemo(() => {
    const totalCards = cards.length;
    const now = new Date();

    const forecastGroups = [
      { name: 'Due now', count: dueCount },
      { name: 'Due in 5 mins', count: 0 },
      { name: 'Due in 10 mins', count: 0 },
      { name: 'Due in 30 mins', count: 0 },
      { name: 'Due in 1 hour', count: 0 },
      { name: 'Due later', count: 0 },
    ];

    cards.forEach(card => {
      if (!card.new && card.nextReview > now) {
        const timeDiff = (card.nextReview.getTime() - now.getTime()) / (1000 * 60); // Difference in minutes
        if (timeDiff <= 5) forecastGroups[1].count++;
        else if (timeDiff <= 10) forecastGroups[2].count++;
        else if (timeDiff <= 30) forecastGroups[3].count++;
        else if (timeDiff <= 60) forecastGroups[4].count++;
        else forecastGroups[5].count++;
      }
    });

    const learningCards = cards.filter(card => !card.new && card.interval < 60 * 24 * 30).length; // Cards with interval < 30 days
    const masteredCards = totalCards - learningCards - cards.filter(card => card.new).length;

    return {
      totalCards,
      dueCount,
      newCount,
      masteredCards,
      learningCards,
      forecastGroups,
    };
  }, [cards, dueCount, newCount]);

  // Helper function to return "card" or "cards" based on count
  const cardText = (count: number) => count === 1 ? "card" : "cards";

  const handleMaxCardsChange = () => {
    setMaxNewCardsPerDay(newMaxCards); // Set max new cards in the store
    setIsEditing(false); // Hide input field
    setShowUpdatedMessage(true); // Show success message

    // Hide the success message after a few seconds
    setTimeout(() => setShowUpdatedMessage(false), 2000);
  };
  const handleInputChange = (text: string) => {
    const value = parseInt(text, 10); // Parse input to an integer
    if (!isNaN(value)) {
      setNewMaxCards(value); // Update state with the parsed number
    } else {
      setNewMaxCards(0); // Optionally set to 0 if input is invalid
    }
  };

  const handleStartSession = () => {
    startStudySession();
    router.push('./srs/studySession');
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-6 pb-20">
        <Text className="text-3xl font-bold text-gray-800 mb-6">Your Flashcards</Text>

        <View>
          {/* Card statistics */}
          <Text className="text-lg sm:text-xl font-semibold mb-2">
            You have {statistics.dueCount} due {cardText(statistics.dueCount)} and {statistics.newCount} new {cardText(statistics.newCount)} left to study today.
          </Text>

          {/* Display the max new cards and the Change button */}
          {!isEditing && (
              <View className="flex flex-row items-center my-2 gap-4 h-8">
                <Text className="text-lg">
                  New cards per day: <Text className='mx-2'>{maxNewCardsPerDay}</Text>
                </Text>
                <TouchableOpacity onPress={() => setIsEditing(true)} className="bg-primary rounded-lg px-4 py-2">
                  <Text className="text-white text-md font-semibold">Change</Text>
                </TouchableOpacity>
              </View>
          )}
          {/* Display the input field and Set button if editing */}
          {isEditing && (
            <View className="flex flex-row items-center my-2 gap-4 h-8">
              <Text className="text-lg">
                New cards per day:
              </Text>
              <TextInput
                value={newMaxCards.toString()} // Convert to string for the TextInput
                onChangeText={handleInputChange} // Handle input change
                keyboardType="numeric"
                className="border w-12 border-gray-300 rounded-lg p-2 text-lg"
              />
              <TouchableOpacity onPress={handleMaxCardsChange} className="bg-primary rounded-lg px-4 py-2">
                <Text className="text-white text-md font-semibold">Set</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text className={`${showUpdatedMessage ? 'visible' : 'invisible'} text-primary text-md font-semibold`}>Updated!</Text>
        </View>

        <View className="items-center my-3">
          {(statistics.dueCount > 0 || statistics.newCount > 0) ? (
            <TouchableOpacity
              onPress={handleStartSession}
              className="bg-primary rounded-lg px-6 py-3"
            >
              <Text className="text-white text-lg font-semibold">Start Study Session</Text>
            </TouchableOpacity>
          ) : (
            <Text className="text-lg text-gray-600">No cards are due for review.</Text>
          )}
        </View>

        <View className="mb-6">
          <Text className="text-lg sm:text-xl font-semibold mb-2">Overview</Text>
          <View className="rounded-lg bg-white p-4 shadow-md">
            <Text className="text-md sm:text-lg mb-2 font-bold">Due Cards: {statistics.dueCount}</Text>
            <Text className="text-md sm:text-lg mb-2 font-bold">New Cards: {statistics.totalCards - statistics.learningCards}</Text>
            <Text className="text-md sm:text-lg mb-2 font-bold">Total Cards: {statistics.totalCards}</Text>
            <Text className="text-md sm:text-lg mb-2">Learning: {statistics.learningCards} {cardText(statistics.learningCards)}</Text>
            <Text className="text-md sm:text-lg">Mastered: {statistics.masteredCards} {cardText(statistics.masteredCards)}</Text>
          </View>
        </View>

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

      </ScrollView>
    </SafeAreaView>
  );
}