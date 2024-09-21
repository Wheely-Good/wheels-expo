import React from 'react';
import { View } from 'react-native';
import PricingCard from '@/components/landing_page/PricingCard';
import { Text } from "@/components/base/Text";

export default function Pricing(): JSX.Element {
  return (
    <View className="bg-white py-16 px-4">
      <View className="max-w-7xl mx-auto">
        <Text font="bold" className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Choose Your Plan
        </Text>
        <View className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Basic"
            price="$9.99"
            features={[
              "Access to all lessons",
              "10 AI practice sessions per month",
              "Basic performance analytics"
            ]}
          />
          <PricingCard
            title="Pro"
            price="$19.99"
            features={[
              "Everything in Basic",
              "Unlimited AI practice sessions",
              "Advanced performance analytics",
              "1 expert feedback session per month"
            ]}
            highlighted={true}
          />
          <PricingCard
            title="Premium"
            price="$29.99"
            features={[
              "Everything in Pro",
              "Priority support",
              "3 expert feedback sessions per month",
              "Personalized study plan"
            ]}
          />
        </View>
      </View>
    </View>
  );
}