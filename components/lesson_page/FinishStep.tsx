import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FinishStepProps {
  score: number;
}

const FinishStep: React.FC<FinishStepProps> = ({ score }) => {
  const percentage = Math.round((score / 6) * 100); // Assuming 6 questions total

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Nice going.{'\n'}You're nearly perfect.</Text>
      <Text style={styles.emoji}>😍</Text>
      <Text style={styles.score}>{percentage}%</Text>
      <Button
        style={styles.reviewButton}
        onPress={() => {/* TODO: Implement review functionality */}}
      >
        Review errors (1)
      </Button>
      <Button
        style={styles.continueButton}
        onPress={() => {/* TODO: Implement continue functionality */}}
      >
        Continue
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3b82f6',
  },
  reviewButton: {
    width: '100%',
    marginBottom: 8,
    backgroundColor: '#dbeafe',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
  },
});

export default FinishStep;