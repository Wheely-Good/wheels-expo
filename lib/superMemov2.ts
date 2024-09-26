export interface Card {
  id: string;
  englishWord: string;
  japaneseWord: string;
  interval: number;  // In minutes now
  repetition: number;
  easiness: number;
  nextReview: Date; // When the card should be reviewed next
  audioSource: string;
}

export const superMemoV2 = (card: Card, grade: number): Card => {
  const now = new Date();
  let { interval, repetition, easiness } = card;

  // If grade is less than 3, reset repetition and interval
  if (grade < 3) {
    repetition = 0;
    interval = 1; // Reset to 1 minute for immediate review
  } else {
    if (repetition === 0) {
      interval = 1; // First repetition interval (in minutes)
    } else if (repetition === 1) {
      interval = 6; // Second repetition interval (6 minutes)
    } else {
      interval = Math.round(interval * easiness); // Subsequent intervals
    }
    repetition += 1;
  }

  // Adjust the easiness factor based on performance
  easiness = Math.max(1.3, easiness + 0.1 - (5 - grade) * 0.08);

  // Set next review time to current time + interval in minutes
  const nextReview = new Date(now.getTime() + interval * 60000);

  return {
    ...card,
    interval,
    repetition,
    easiness,
    nextReview,
  };
};
