import { create } from 'zustand';
import { superMemoV2, Card } from '@/lib/superMemov2';
import flashcardsData from '@/data/flashcards.json';

interface FlashcardState {
  cards: Card[];
  currentCardIndex: number;
  sessionCards: Card[];
  newCardsStudiedToday: number; // New property to track new cards studied today
  maxNewCardsPerDay: number; // Set to 5
  startStudySession: () => void;
  gradeCard: (card: Card, grade: number) => void;
  isSessionComplete: () => boolean;
  getDueAndNewCardCounts: () => { dueCount: number; newCount: number };
  resetDailyCount: () => void;
  setMaxNewCardsPerDay: (count: number) => void; // Method to update max new cards per day
}

export const useFlashcardStore = create<FlashcardState>((set, get) => ({
  cards: flashcardsData.map(card => ({
    ...card,
    nextReview: new Date(card.nextReview),
    new: card.new || false,
  })) as Card[],
  currentCardIndex: 0,
  sessionCards: [],
  newCardsStudiedToday: 0, // Initialize new cards studied today
  maxNewCardsPerDay: 5, // Set the maximum number of new cards to study per day

  resetDailyCount: () => {
    const now = new Date();
    const lastReset = new Date(/* Get last reset date from storage or state */);

    // Check if the last reset was not today
    if (lastReset.toDateString() !== now.toDateString()) {
      set({ newCardsStudiedToday: 0 });
      // Update lastReset date in storage or state
    }
  },

  startStudySession: () => {
    const now = new Date();
    const dueCards = get().cards.filter(card => !card.new && card.nextReview <= now);

    // Limit the number of new cards based on how many have been studied today
    const newCardsAvailable = get().cards.filter(card => card.new);
    const newCards = newCardsAvailable.slice(0, get().maxNewCardsPerDay - get().newCardsStudiedToday);

    const sessionCards = [...dueCards, ...newCards];
    set(() => ({ sessionCards, currentCardIndex: 0 }));
  },

  gradeCard: (card, grade) => {
    // Check if the card was new and increment the newCardsStudiedToday count
    if (card.new) {
      set(state => ({ newCardsStudiedToday: state.newCardsStudiedToday + 1 }));
    }

    const updatedCard = superMemoV2(card, grade);
    const cards = get().cards.map(c => (c.id === card.id ? updatedCard : c));

    const sessionCards = get().sessionCards.filter(c => c.id !== updatedCard.id);

    const now = new Date();
    const dueCards = get().cards.filter(c => !c.new && c.nextReview <= now && !get().sessionCards.some(sc => sc.id === c.id));

    set({
      cards,
      sessionCards: [...sessionCards, ...dueCards],
    });
    console.log(sessionCards);
  },

  isSessionComplete: () => {
    return get().sessionCards.length === 0;
  },

  getDueAndNewCardCounts: () => {
    const now = new Date();
    const dueCount = get().cards.filter(card => !card.new && card.nextReview <= now).length;
    const newCount = Math.min(
      get().cards.filter(card => card.new).length,
      get().maxNewCardsPerDay - get().newCardsStudiedToday
    );
    return { dueCount, newCount };
  },

  setMaxNewCardsPerDay: (count: number) => {
    set({ maxNewCardsPerDay: count });
    // Optionally save to local storage
    localStorage.setItem('maxNewCardsPerDay', count.toString());
  },
}));
