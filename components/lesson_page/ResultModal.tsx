import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Button } from '@/components/ui/button';
import { Volume2, Flag } from 'lucide-react-native';

interface ResultModalProps {
  isVisible: boolean;
  isCorrect: boolean;
  onClose: () => void;
  sentence: string;
  translation: string;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isVisible,
  isCorrect,
  onClose,
  sentence,
  translation,
}) => {
  return (
    <Modal visible={isVisible}> {/* TODO:Check this works as Claude suggsted using React-Native-Modal */}
      <View style={[styles.container, isCorrect ? styles.correctBackground : styles.incorrectBackground]}>
        <Text style={[styles.title, isCorrect ? styles.correctText : styles.incorrectText]}>
          {isCorrect ? 'Correct' : 'Not correct'}
        </Text>
        <Text style={styles.sentence}>{sentence}</Text>
        <Text style={styles.translation}>{translation}</Text>
        <View style={styles.buttonContainer}>
          <Button
            variant="outline"
            size="icon"
            onPress={() => {/* TODO: Implement audio playback */}}
            style={styles.iconButton}
          >
            <Volume2 size={20} color="#666666" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onPress={() => {/* TODO: Implement flag functionality */}}
            style={styles.iconButton}
          >
            <Flag size={20} color="#666666" />
          </Button>
        </View>
        <Button
          onPress={onClose}
          style={[styles.continueButton, isCorrect ? styles.correctButton : styles.incorrectButton]}
        >
          Continue
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
  correctBackground: {
    backgroundColor: '#ecfdf5',
  },
  incorrectBackground: {
    backgroundColor: '#fef2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  correctText: {
    color: '#059669',
  },
  incorrectText: {
    color: '#dc2626',
  },
  sentence: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  translation: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconButton: {
    backgroundColor: '#e5e7eb',
  },
  continueButton: {
    width: '100%',
  },
  correctButton: {
    backgroundColor: '#10b981',
  },
  incorrectButton: {
    backgroundColor: '#3b82f6',
  },
});

export default ResultModal;