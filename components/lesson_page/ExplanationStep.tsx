import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/card';

interface ExplanationStepProps {
  content: string;
}

const ExplanationStep: React.FC<ExplanationStepProps> = ({ content }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.text}>{content}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#333333',
  },
});

export default ExplanationStep;