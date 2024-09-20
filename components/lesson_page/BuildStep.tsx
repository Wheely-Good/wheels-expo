import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react-native';

interface BuildStepProps {
  sentence: string;
  options: string[];
  buildSentence: string[];
  setBuildSentence: (sentence: string[]) => void;
}

const BuildStep: React.FC<BuildStepProps> = ({
  sentence,
  options,
  buildSentence,
  setBuildSentence,
}) => {
  const sentenceParts = sentence.split('＿＿＿');

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Build the sentence</Text>
      <View style={styles.sentenceContainer}>
        <Text style={styles.sentencePart}>{sentenceParts[0]}</Text>
        <View style={styles.buildPartsContainer}>
          {buildSentence.map((part, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              style={styles.buildPartButton}
              onPress={() => setBuildSentence(buildSentence.filter((_, i) => i !== index))}
            >
              {part}
            </Button>
          ))}
        </View>
        <Text style={styles.sentencePart}>{sentenceParts[1]}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <Button
          variant="ghost"
          size="icon"
          onPress={() => setBuildSentence([])}
          style={styles.resetButton}
        >
          <RotateCcw size={20} color="#3b82f6" />
        </Button>
        <View style={styles.optionsGrid}>
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              style={styles.optionButton}
              onPress={() => setBuildSentence([...buildSentence, option])}
              disabled={buildSentence.includes(option)}
            >
              {option}
            </Button>
          ))}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  sentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  sentencePart: {
    color: '#333333',
  },
  buildPartsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buildPartButton: {
    margin: 4,
    backgroundColor: '#dbeafe',
  },
  optionsContainer: {
    position: 'relative',
  },
  resetButton: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#dbeafe',
  },
});

export default BuildStep;