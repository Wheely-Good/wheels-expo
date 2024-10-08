import React, { useEffect } from "react";
import { View } from "react-native";
import { Stack, Redirect, useRouter } from "expo-router";
import DesktopNavigation from "@/components/DesktopNavigation";
import MobileNavigation from "@/components/MobileNavigation";
import { useAuthStore } from "@/hooks/useAuthStore";
import Loading from "@/components/Loading";

export default function MainLayout() {
  const { session, isLoading } = useAuthStore((state) => ({
    session: state.session,
    isLoading: state.isLoading,
  }));

  if (isLoading) {
    return <Loading />;
  }

  // if(!session) {
  //   console.log("No session, redirecting to sign-in");
  //   return <Redirect href="/sign-in" /> 
  // }

  return (
    <View className="flex flex-col h-screen bg-gray-50">
      <DesktopNavigation />
      <View className="lg:ml-16 flex-1 flex flex-col">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <MobileNavigation />
    </View>
  );
}