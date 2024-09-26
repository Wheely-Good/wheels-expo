// store/useFlashcardStore.ts
import { create } from 'zustand';
import { superMemoV2, Card } from '@/lib/superMemov2';
// Zustand store definition
interface FlashcardState {
  cards: Card[];
  currentCardIndex: number;
  dueCards: Card[];
  setCards: (newCards: Card[]) => void;
  getDueCards: () => void;
  gradeCard: (card: Card, grade: number) => void;
}

export const useFlashcardStore = create<FlashcardState>((set, get) => ({
  cards: [
    // Hardcoded initial cards for testing (replace with your own data)
    {
      id: '1',
      englishWord: 'apple',
      japaneseWord: 'りんご',
      interval: 1,  // Interval in minutes
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
  ],
  currentCardIndex: 0,
  dueCards: [],

  // Set cards function to initialize or update the card list
  setCards: (newCards) => set(() => ({ cards: newCards })),

  // Get due cards that need to be reviewed
  getDueCards: () => {
    const now = new Date();
    const cards = get().cards;
    const dueCards = cards.filter(card => card.nextReview <= now);
    set(() => ({ dueCards }));
  },

  // Grade the card and update its state
  gradeCard: (card, grade) => {
    const updatedCard = superMemoV2(card, grade);
    const cards = get().cards.map(c => (c.id === card.id ? updatedCard : c));

    // Update the state with the new card data
    set({ cards });

    // Refresh the due cards list after grading
    get().getDueCards();
  },
}));
``
