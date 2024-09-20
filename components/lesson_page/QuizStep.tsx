import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizStepProps {
  question: string;
  sentence: string;
  options: string[];
  quizAnswer: string;
  setQuizAnswer: (answer: string) => void;
  checkAnswer: (answer: string) => void;
}

const QuizStep: React.FC<QuizStepProps> = ({
  question,
  sentence,
  options,
  quizAnswer,
  setQuizAnswer,
  checkAnswer,
}) => {
  const [sentenceStart, sentenceEnd] = sentence.split('＿＿＿');

  return (
    <Card style={styles.card}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.sentence}>
        {sentenceStart}
        <Text style={styles.answer}>{quizAnswer}</Text>
        {sentenceEnd}
      </Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <Button
            key={index}
            variant={quizAnswer === option ? 'default' : 'outline'}
            style={[
              styles.optionButton,
              quizAnswer === option && styles.selectedOption,
            ]}
            onPress={() => {
              setQuizAnswer(option);
              checkAnswer(option);
            }}
          >
            {option}
          </Button>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  sentence: {
    marginBottom: 16,
    color: '#333333',
  },
  answer: {
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#dbeafe',
  },
  selectedOption: {
    backgroundColor: '#3b82f6',
  },
});

export default QuizStep;