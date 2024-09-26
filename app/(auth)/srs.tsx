// App.js or your main screen component
import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useFlashcardStore } from '@/hooks/useFlashcardStore';

export default function LessonsPage() {
  const router = useRouter();
  const { dueCards, getDueCards } = useFlashcardStore((state) => ({
    dueCards: state.dueCards,
    getDueCards: state.getDueCards,
  }));

  // Fetch due cards when the component mounts and when it gains focus
  useFocusEffect(
    React.useCallback(() => {
      getDueCards();
    }, [getDueCards])
  );

  // Optional: Refresh due cards every minute while the user is on the page
  useEffect(() => {
    const intervalId = setInterval(() => {
      getDueCards();
    }, 60000); // 1 minute interval

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [getDueCards]);

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl mb-4">Due Cards: {dueCards.length}</Text>
      {dueCards.length > 0 ? (
        <Button title="Start Study Session" onPress={() => router.push('./srs/studySession')} />
      ) : (
        <Text className="text-lg mt-4">No cards are due for review.</Text>
      )}
    </View>
  );
}
