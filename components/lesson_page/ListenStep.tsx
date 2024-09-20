import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react-native';

interface ListenStepProps {
  typedAnswer: string;
  setTypedAnswer: (answer: string) => void;
}

const ListenStep: React.FC<ListenStepProps> = ({ typedAnswer, setTypedAnswer }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Type what the speaker says</Text>
      <Button
        variant="outline"
        size="icon"
        onPress={() => {/* TODO: Implement audio playback */}}
        style={styles.audioButton}
      >
        <Volume2 size={20} color="#3b82f6" />
      </Button>
      <TextInput
        value={typedAnswer}
        onChangeText={setTypedAnswer}
        style={styles.input}
        placeholder="Type your answer here"
        placeholderTextColor="#999999"
      />
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
  audioButton: {
    marginBottom: 16,
    backgroundColor: '#dbeafe',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 4,
    color: '#333333',
  },
});

export default ListenStep;