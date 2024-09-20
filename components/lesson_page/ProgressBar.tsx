import React from 'react';
import { View } from 'react-native';
import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <Progress value={progress} className="w-full mb-4" />
  );
}