export interface Card {
  id: string;
  englishWord: string;
  japaneseWord: string;
  interval: number;
  repetition: number;
  easiness: number;
  nextReview: Date;
}

export function superMemoV2(card: Card, grade: number): Card {
  let { interval, repetition, easiness } = card;

  // Update easiness based on the grade
  easiness = Math.max(1.3, easiness + 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

  if (grade >= 3) {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easiness);
    }
    repetition += 1;
  } else {
    repetition = 0;
    interval = 1;
  }

  return {
    ...card,
    interval,
    repetition,
    easiness,
    nextReview: new Date(new Date().setDate(new Date().getDate() + interval)),
  };
}
