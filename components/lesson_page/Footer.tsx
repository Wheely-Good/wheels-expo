import React from 'react';
import { View, Text } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Button } from "@/components/ui/button";

interface FooterProps {
  currentStep: number;
  totalSteps: number;
  handlePrevious: () => void;
  handleNext: () => void;
  handleSkipIntroduction: () => void;
  isStepCompleted: () => boolean;
  lessonSteps: any[]; // Replace 'any' with the actual type of your lesson steps
}

export default function Footer({
  currentStep,
  totalSteps,
  handlePrevious,
  handleNext,
  handleSkipIntroduction,
  isStepCompleted,
  lessonSteps,
}: FooterProps) {
  return (
    <View className="bg-white shadow-md mt-8 pb-[56px] lg:pb-0">
      <View className="px-4 py-4">
        {/* Desktop view */}
        <View className="hidden md:flex md:flex-row md:justify-between md:items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex-row items-center text-gray-600"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            <Text>Previous</Text>
          </Button>
          {currentStep < totalSteps - 1 && lessonSteps[currentStep].type !== 'quiz' && (
            <Button 
              className="flex-row items-center bg-blue-500"
              onClick={handleNext}
              disabled={!isStepCompleted()}
            >
              <Text className="text-white mr-2">Next</Text>
              <ChevronRight className="h-4 w-4 text-white" />
            </Button>
          )}
        </View>
        {/* Mobile view */}
        <View className="md:hidden block space-y-2">
          {currentStep < 4 && (
            <Button 
              onClick={handleSkipIntroduction} 
              className="w-full bg-blue-100 text-blue-600"
            >
              <Text>Skip Introduction</Text>
            </Button>
          )}
          {currentStep < totalSteps - 1 && lessonSteps[currentStep].type !== 'quiz' && (
            <Button 
              className="w-full bg-blue-500"
              onClick={handleNext}
              disabled={!isStepCompleted()}
            >
              <Text className="text-white mr-2">Next</Text>
              <ChevronRight className="h-4 w-4 text-white" />
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}