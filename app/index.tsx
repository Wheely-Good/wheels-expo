import React, { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import LandingPage from "./LandingPage";
import { useAuthStore } from "@/hooks/useAuthStore"; // Adjust the import path as needed

export default function RootLayoutAuth() {
  const router = useRouter();
  const segments = useSegments();
  const { session, isLoading, initialize } = useAuthStore((state) => ({
    session: state.session,
    isLoading: state.isLoading,
    initialize: state.initialize,
  }));

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (session && session.user) {
        router.replace('/(auth)');
      }
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <LandingPage />;
}