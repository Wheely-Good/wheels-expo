import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { lessonSteps } from '@/components/lesson_page/lesson_data';
import Header from '@/components/lesson_page/Header';
import ProgressBar from '@/components/lesson_page/ProgressBar';
import StepContent from '@/components/lesson_page/StepContent';
import Footer from '@/components/lesson_page/Footer';
import ResultModal from '@/components/lesson_page/ResultModal';

export default function LessonPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [buildSentence, setBuildSentence] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const isStepCompleted = () => {
    const step = lessonSteps[currentStep];
    switch (step.type) {
      case 'explanation':
      case 'example':
        return true;
      case 'quiz':
        return quizAnswer !== '';
      case 'build':
        return buildSentence.length > 0;
      case 'listen':
        return typedAnswer !== '';
      case 'finish':
        return true;
      default:
        return false;
    }
  };

  const checkAnswer = (answer?: string) => {
    const step = lessonSteps[currentStep] as any;
    let correct = false;

    switch (step.type) {
      case 'quiz':
        correct = (answer || quizAnswer) === step.correctAnswer;
        break;
      case 'build':
        correct = buildSentence.join('') === step.correctAnswer;
        break;
      case 'listen':
        correct = typedAnswer.trim().toLowerCase() === step.sentence.trim().toLowerCase();
        break;
    }

    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowModal(true);
  };

  const handleNext = () => {
    if (currentStep < lessonSteps.length - 1 && isStepCompleted()) {
      const step = lessonSteps[currentStep];
      if (step.type === 'build' || step.type === 'listen') {
        checkAnswer();
      } else {
        setCurrentStep(currentStep + 1);
      }
      setShowTranslation(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowTranslation(false);
    }
  };

  const handleSkipIntroduction = () => {
    const quizIndex = lessonSteps.findIndex(step => step.type === 'quiz');
    if (quizIndex !== -1) {
      setCurrentStep(quizIndex);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <Header currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <View className="flex-1 justify-center items-center">
        <View className="w-full max-w-3xl px-4">
          <ProgressBar progress={(currentStep / (lessonSteps.length - 1)) * 100} />
          <ScrollView>
            <StepContent
              step={lessonSteps[currentStep]}
              showTranslation={showTranslation}
              setShowTranslation={setShowTranslation}
              quizAnswer={quizAnswer}
              setQuizAnswer={setQuizAnswer}
              buildSentence={buildSentence}
              setBuildSentence={setBuildSentence}
              typedAnswer={typedAnswer}
              setTypedAnswer={setTypedAnswer}
              checkAnswer={checkAnswer}
            />
          </ScrollView>
        </View>
      </View>
      <Footer
  currentStep={currentStep}
  totalSteps={lessonSteps.length}
  handlePrevious={handlePrevious}
  handleNext={handleNext}
  handleSkipIntroduction={handleSkipIntroduction}
  isStepCompleted={isStepCompleted}
  lessonSteps={lessonSteps}
/>
<ResultModal
  isVisible={showModal}
  isCorrect={isCorrect}
  onClose={() => {
    setShowModal(false);
    if (isCorrect) {
      setCurrentStep(currentStep + 1);
    }
    setQuizAnswer('');
    setBuildSentence([]);
    setTypedAnswer('');
  }}
  sentence={getQuizSentence(lessonSteps[currentStep])}
  translation={(lessonSteps[currentStep] as any).translation || ''}
/>
    </SafeAreaView>
  );
}

function getQuizSentence(step: any): string {
  if (step.type === 'quiz' && step.sentence && 'correctAnswer' in step) {
    return step.sentence.replace('＿＿＿', step.correctAnswer);
  } else if (step.type === 'build' && 'correctAnswer' in step) {
    return step.sentence.replace('＿＿＿', step.correctAnswer);
  } else if (step.type === 'listen') {
    return step.sentence;
  }
  return '';
}