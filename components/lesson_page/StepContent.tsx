import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Volume2, RotateCcw } from 'lucide-react-native';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LessonStep } from './lesson_types';

interface StepContentProps {
  step: LessonStep;
  showTranslation: boolean;
  setShowTranslation: (show: boolean) => void;
  quizAnswer: string;
  setQuizAnswer: (answer: string) => void;
  buildSentence: string[];
  setBuildSentence: (sentence: string[]) => void;
  typedAnswer: string;
  setTypedAnswer: (answer: string) => void;
  checkAnswer: (answer?: string) => void;
}

export default function StepContent({
  step,
  showTranslation,
  setShowTranslation,
  quizAnswer,
  setQuizAnswer,
  buildSentence,
  setBuildSentence,
  typedAnswer,
  setTypedAnswer,
  checkAnswer,
}: StepContentProps) {
  switch (step.type) {
    case 'explanation':
      return (
        <Card className="p-6 bg-white">
          <Text className="text-gray-800">{step.content}</Text>
        </Card>
      );
    case 'example':
      return (
        <Card className="p-6 bg-white">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity className="mr-2 bg-blue-100 p-2 rounded">
              <Volume2 className="h-4 w-4 text-blue-600" />
            </TouchableOpacity>
            <Text className="text-gray-800">{step.sentence}</Text>
          </View>
          {showTranslation ? (
            <Text className="text-gray-600">{step.translation}</Text>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowTranslation(true)}
              className="bg-blue-100 text-blue-600"
            >
              Show hidden sentence
            </Button>
          )}
        </Card>
      );
    case 'quiz':
      const [sentenceStart, sentenceEnd] = step.sentence.split('＿＿＿');
      return (
        <Card className="p-6 bg-white">
          <Text className="text-lg font-semibold mb-4 text-gray-800">{step.question}</Text>
          <Text className="mb-4 text-gray-800">
            {sentenceStart}
            <Text className="font-bold text-blue-600">{quizAnswer}</Text>
            {sentenceEnd}
          </Text>
          <View className="space-y-2">
            {step.options.map((option, index) => (
              <Button
                key={index}
                variant={quizAnswer === option ? "default" : "outline"}
                className={quizAnswer === option ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'}
                onClick={() => {
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
    case 'build':
      const sentenceParts = step.sentence.split('＿＿＿');
      return (
        <Card className="p-6 bg-white">
          <Text className="text-lg font-semibold mb-4 text-gray-800">Build the sentence</Text>
          <View className="mb-4">
            <Text className="text-gray-800">
              {sentenceParts[0]}
              {buildSentence.map((part, index) => (
                <TouchableOpacity
                  key={index}
                  className="mx-1 my-1 py-1 px-2 bg-blue-100 rounded"
                  onPress={() => setBuildSentence(buildSentence.filter((_, i) => i !== index))}
                >
                  <Text className="text-blue-600">{part}</Text>
                </TouchableOpacity>
              ))}
              {sentenceParts[1]}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              className="absolute top-0 right-0 p-2 z-10"
              onPress={() => setBuildSentence([])}
            >
              <RotateCcw className="h-5 w-5 text-blue-600" />
            </TouchableOpacity>
            <View className="flex-row flex-wrap">
              {step.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="m-1 bg-blue-100 text-blue-600"
                  onClick={() => setBuildSentence([...buildSentence, option])}
                  disabled={buildSentence.includes(option)}
                >
                  {option}
                </Button>
              ))}
            </View>
          </View>
        </Card>
      );
    case 'listen':
      return (
        <Card className="p-6 bg-white">
          <Text className="text-lg font-semibold mb-4 text-gray-800">Type what the speaker says</Text>
          <TouchableOpacity className="mb-4 p-2 bg-blue-100 rounded self-start">
            <Volume2 className="h-4 w-4 text-blue-600" />
          </TouchableOpacity>
          <TextInput
            value={typedAnswer}
            onChangeText={setTypedAnswer}
            className="w-full p-2 border rounded bg-white text-gray-800 border-blue-300"
            placeholder="Type your answer here"
          />
        </Card>
      );
    case 'finish':
      return (
        <Card className="p-6 bg-white items-center">
          <Text className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Nice going.{'\n'}You're nearly perfect.
          </Text>
          <Text className="text-6xl mb-4">😍</Text>
          <Text className="text-4xl font-bold mb-4 text-blue-600">86%</Text>
          <Button variant="secondary" className="w-full mb-2 bg-blue-100 text-blue-600">
            Review errors (1)
          </Button>
          <Button className="w-full bg-blue-500 text-white">
            Continue
          </Button>
        </Card>
      );
  }
}