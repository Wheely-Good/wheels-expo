// App.js or your main screen component
import React from 'react';
import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function LessonsPage() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center">
      <Button title="Start Study Session" onPress={() => router.push('./srs/studySession')} />
    </View>
  );
};
