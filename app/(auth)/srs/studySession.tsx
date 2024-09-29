import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Card } from '@/lib/superMemov2';
import { useFlashcardStore } from '@/hooks/useFlashcardStore';
import { useRouter } from 'expo-router';
import Header from '@/components/srs_page/Header';
import Footer from '@/components/srs_page/Footer';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import Flashcard from '@/components/srs_page/Flashcard';

export default function StudySession() {
  const router = useRouter();
  const { dueCards, currentCardIndex, gradeCard } = useFlashcardStore((state) => ({
    dueCards: state.dueCards,
    currentCardIndex: state.currentCardIndex,
    gradeCard: state.gradeCard,
  }));

  const currentCard = dueCards[currentCardIndex] || null;
  const nextCard = dueCards[currentCardIndex + 1] || null;

  const [revealed, setRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const flip = useSharedValue(0);
  const slideAnimation = useSharedValue(0);

  useEffect(() => {
    setRevealed(false);
    flip.value = 0;
    slideAnimation.value = 0;
  }, [currentCardIndex]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${flip.value * 180}deg` },
      { translateX: interpolate(slideAnimation.value, [0, 1], [0, -400], Extrapolation.CLAMP) },
    ],
    opacity: interpolate(slideAnimation.value, [0, 1], [1, 0], Extrapolation.CLAMP),
    backfaceVisibility: 'hidden',
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${(flip.value + 1) * 180}deg` },
      { translateX: interpolate(slideAnimation.value, [0, 1], [0, -400], Extrapolation.CLAMP) },
    ],
    opacity: interpolate(slideAnimation.value, [0, 1], [1, 0], Extrapolation.CLAMP),
    backfaceVisibility: 'hidden',
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(slideAnimation.value, [0, 1], [400, 0], Extrapolation.CLAMP) },
    ],
    opacity: interpolate(slideAnimation.value, [0, 1], [0, 1], Extrapolation.CLAMP),
  }));

  const revealCard = useCallback(() => {
    setRevealed(true);
    flip.value = withTiming(1, { duration: 500 });
  }, [flip]);

  const handleGrade = useCallback((card: Card, grade: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    slideAnimation.value = withTiming(1, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(gradeCard)(card, grade);
        runOnJS(setRevealed)(false);
        runOnJS(setIsAnimating)(false);
        flip.value = 0;
        slideAnimation.value = 0;
      }
    });
  }, [isAnimating, slideAnimation, gradeCard, flip]);

  const handleEndSession = () => {
    router.push('./');
  };

  if (!currentCard) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-xl mb-4 text-center">
          You have completed all of your due cards for now!
        </Text>
        <TouchableOpacity
          onPress={() => router.push('./')}
          className="bg-blue-500 rounded-lg px-4 py-2"
        >
          <Text className="text-white text-lg">Return to menu</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View style={{ zIndex: 1, elevation: 5 }}>
        <Header onEndSession={handleEndSession} remainingCards={dueCards.length - currentCardIndex} />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center">
          <View className="flex-1 w-full justify-center items-center">
            <View className="relative flex-grow w-full min-h-96 overflow-hidden">
              <Animated.View
                style={[frontStyle, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
                className="flex-grow w-full p-6 items-center justify-center"
              >
                <Flashcard card={currentCard} revealed={false} />
              </Animated.View>

              <Animated.View
                style={[backStyle, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
                className="flex-grow w-full p-6 items-center justify-center"
              >
                <Flashcard card={currentCard} revealed={true} />
              </Animated.View>

              {nextCard && (
                <Animated.View
                  style={[nextCardStyle, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
                  className="flex-grow w-full p-6 items-center justify-center"
                >
                  <Flashcard card={nextCard} revealed={false} />
                </Animated.View>
              )}
            </View>
            <Footer card={currentCard} revealed={revealed} gradeItem={handleGrade} revealCard={revealCard} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
