import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react-native';
import { lessonSteps } from '@/data/lessonData';

interface HeaderProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const Header: React.FC<HeaderProps> = ({ currentStep, setCurrentStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Japanese Lesson</Text>
        <Button variant="ghost" size="icon" style={styles.closeButton}>
          <X size={24} color="#666666" />
        </Button>
      </View>
      <View style={styles.navigation}>
        {lessonSteps.map((step, index) => (
          <Button
            key={index}
            onPress={() => setCurrentStep(index)}
            style={[
              styles.navButton,
              currentStep === index && styles.activeNavButton,
            ]}
          >
            <Text
              style={[
                styles.navButtonText,
                currentStep === index && styles.activeNavButtonText,
              ]}
            >
              {step.type.charAt(0).toUpperCase() + step.type.slice(1)} {index + 1}
            </Text>
          </Button>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  closeButton: {
    backgroundColor: 'transparent',
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  navButton: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  activeNavButton: {
    backgroundColor: '#3b82f6',
  },
  navButtonText: {
    fontSize: 14,
    color: '#666666',
  },
  activeNavButtonText: {
    color: '#ffffff',
  },
});

export default Header;