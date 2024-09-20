import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react-native';

interface ExampleStepProps {
  sentence: string;
  translation: string;
  showTranslation: boolean;
  setShowTranslation: (show: boolean) => void;
}

const ExampleStep: React.FC<ExampleStepProps> = ({
  sentence,
  translation,
  showTranslation,
  setShowTranslation,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.sentenceContainer}>
        <Button
          variant="outline"
          size="icon"
          onPress={() => {/* TODO: Implement audio playback */}}
          style={styles.audioButton}
        >
          <Volume2 size={16} color="#3b82f6" />
        </Button>
        <Text style={styles.sentence}>{sentence}</Text>
      </View>
      {showTranslation ? (
        <Text style={styles.translation}>{translation}</Text>
      ) : (
        <Button
          variant="outline"
          onPress={() => setShowTranslation(true)}
          style={styles.showButton}
        >
          Show hidden sentence
        </Button>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  sentenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  audioButton: {
    marginRight: 8,
    backgroundColor: '#dbeafe',
  },
  sentence: {
    color: '#333333',
    flex: 1,
  },
  translation: {
    color: '#666666',
  },
  showButton: {
    backgroundColor: '#dbeafe',
  },
});

export default ExampleStep;