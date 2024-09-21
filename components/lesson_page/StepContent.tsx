import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Text } from "@/components/base/Text"
import { Volume2, RotateCcw } from 'lucide-react-native';
import { Button } from "@/components/ui/button"
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
        <>
          <Text className="text-gray-800 text-base">{step.content}</Text>
        </>
      );
    case 'example':
      return (
        <>
          <View className="flex-row items-center mb-4">
            <TouchableOpacity className="mr-2 bg-blue-100 p-2 rounded">
              <Volume2 className="h-4 w-4 text-gray" />
            </TouchableOpacity>
            <Text className="text-gray-800 text-xl">{step.sentence}</Text>
          </View>
          {showTranslation ? (
            <Text className="text-gray-600 text-lg">{step.translation}</Text>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowTranslation(true)}
              className="text-gray"
            >
              Show hidden sentence
            </Button>
          )}
        </>
      );
    case 'quiz':
      const [sentenceStart, sentenceEnd] = step.sentence.split('＿＿＿');
      return (
        <>
          <Text className="text-lg font-semibold mb-4 text-gray-800">{step.question}</Text>
          <View className="my-4">
          <Text className="mb-4 text-lg text-gray-800">
            {sentenceStart}
            <Text className="font-medium text-lg text-gray">{quizAnswer || '＿＿＿'}</Text>
            {sentenceEnd}
          </Text>
          </View>
          <View className="space-y-2">
            {step.options.map((option, index) => (
              <Button
                key={index}
                variant={quizAnswer === option ? "default" : "outline"}
                className={quizAnswer === option ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-gray'}
                onClick={() => {
                  setQuizAnswer(option);
                  checkAnswer(option);
                }}
              >
                {option}
              </Button>
            ))}
          </View>
        </>
      );
    case 'build':
      const sentenceParts = step.sentence.split('＿＿＿');
      return (
        <>
          <Text className="text-lg font-semibold mb-4 text-gray-800">Build the sentence</Text>
          <View className="mb-4 min-h-12">
            <Text className="text-gray-800 mt-2 text-lg items-center flex flex-wrap gap-2">
              {sentenceParts[0]}
              {buildSentence.map((part, index) => (
                <TouchableOpacity
                  key={index}
                  className="py-1 px-2 bg-indigo-100 rounded border"
                  onPress={() => setBuildSentence(buildSentence.filter((_, i) => i !== index))}
                >
                  <Text className="text-gray">{part}</Text>
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
              <RotateCcw className="h-5 w-5 text-gray" />
            </TouchableOpacity>
            <View className="flex-row flex-wrap">
              {step.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="m-1 bg-blue-100 text-gray"
                  onClick={() => setBuildSentence([...buildSentence, option])}
                  disabled={buildSentence.includes(option)}
                >
                  {option}
                </Button>
              ))}
            </View>
          </View>
        </>
      );
    case 'listen':
      return (
        <>
          <Text className="text-lg font-semibold mb-4 text-gray-800">Type what the speaker says</Text>
          <TouchableOpacity className="mb-4 p-2 bg-blue-100 rounded w-10 h-10 my-3 flex items-center justify-center">
            <Volume2 className="h-5 w-5 text-gray" />
          </TouchableOpacity>
          <TextInput
            value={typedAnswer}
            onChangeText={setTypedAnswer}
            className="w-full p-2 border rounded bg-white text-gray-800 border-blue-300 h-10"
            placeholder="Type your answer here"
          />
        </>
      );
    case 'finish':
      return (
        <>
          <Text className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Nice going.{'\n'}You're nearly perfect.
          </Text>
          <Text className="text-6xl mb-4">😍</Text>
          <Text className="text-4xl font-bold mb-4 text-gray">86%</Text>
          <Button variant="secondary" className="w-full mb-2 bg-blue-100 text-gray">
            Review errors (1)
          </Button>
          <Button className="w-full bg-blue-500 text-white">
            Continue
          </Button>
        </>
      );
  }
}