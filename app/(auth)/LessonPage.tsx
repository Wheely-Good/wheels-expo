import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { lessonSteps } from '@/data/lessonData';
import Header from '@/components/lesson_page/Header';
import ExplanationStep from '@/components/lesson_page/ExplanationStep';
import ExampleStep from '@/components/lesson_page/ExampleStep';
import QuizStep from '@/components/lesson_page/QuizStep';
import BuildStep from '@/components/lesson_page/BuildStep';
import ListenStep from '@/components/lesson_page/ListenStep';
import FinishStep from '@/components/lesson_page/FinishStep';
import ResultModal from '@/components/lesson_page/ResultModal';
import { useRouter } from 'expo-router';

export default function LessonPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [buildSentence, setBuildSentence] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const router = useRouter();

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

  const renderStep = () => {
    const step = lessonSteps[currentStep];
    switch (step.type) {
      case 'explanation':
        return <ExplanationStep content={step.content} />;
      case 'example':
        return (
          <ExampleStep
            sentence={step.sentence}
            translation={step.translation}
            showTranslation={showTranslation}
            setShowTranslation={setShowTranslation}
          />
        );
      case 'quiz':
        return (
          <QuizStep
            question={step.question}
            sentence={step.sentence} // Ensure sentence exists for quiz
            options={step.options}
            quizAnswer={quizAnswer}
            setQuizAnswer={setQuizAnswer}
            checkAnswer={checkAnswer}
          />
        );
      case 'build':
        return (
          <BuildStep
            sentence={step.sentence} // Ensure sentence exists for build
            options={step.options}
            buildSentence={buildSentence}
            setBuildSentence={setBuildSentence}
          />
        );
      case 'listen':
        return (
          <ListenStep
            typedAnswer={typedAnswer}
            setTypedAnswer={setTypedAnswer}
          />
        );
      case 'finish':
        return <FinishStep score={score} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-4 pt-4">
          {/* <Progress
            progress={(currentStep / (lessonSteps.length - 1)) * 100}
            className="h-2 rounded"
          /> */}
        </View>
        <View className="flex-1 p-4">{renderStep()}</View>
      </ScrollView>
      <View className="flex-row justify-between p-4 bg-white">
        <Button
          onPress={handlePrevious}
          disabled={currentStep === 0}
          className="min-w-[100px]"
        >
          Previous
        </Button>
        {currentStep < lessonSteps.length - 1 && lessonSteps[currentStep].type !== 'quiz' && (
          <Button
            onPress={handleNext}
            disabled={!isStepCompleted()}
            className="min-w-[100px]"
          >
            Next
          </Button>
        )}
      </View>
      <ResultModal
        isVisible={showModal}
        isCorrect={isCorrect}
        onClose={() => {
          setShowModal(false);
          if (lessonSteps[currentStep].type === 'quiz') {
            setCurrentStep(currentStep + 1);
          }
          setQuizAnswer('');
          setBuildSentence([]);
          setTypedAnswer('');
        }}
        sentence={
          'sentence' in lessonSteps[currentStep]
            ? lessonSteps[currentStep].sentence
            : ''
        }
        translation={
          'translation' in lessonSteps[currentStep]
            ? lessonSteps[currentStep].translation
            : ''
        }
      />
    </SafeAreaView>
  );
}
