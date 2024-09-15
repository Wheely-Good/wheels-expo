import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, Mic, Book, BarChart, Users, Play } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import PricingCard from '@/components/PricingCard';
import FeatureCard from '@/components/FeatureCard';

interface HeaderProps {
  isScrolled: boolean;
  scrollToSection: (sectionId: string) => void;
}

function Header({ isScrolled, scrollToSection }: HeaderProps): JSX.Element {
  const router = useRouter();

  return (
    <View className={`z-50 transition-all duration-300 ${isScrolled ? 'bg-indigo-600' : 'bg-transparent'}`}>
      <View className="flex-row justify-between items-center px-4 py-4">
        {/* Logo */}
        <View className="flex-row items-center">
          <Mic className="h-6 w-6 mr-2 text-white" />
          <Text className="text-white text-xl font-bold">Wheels</Text>
        </View>

        {/* Navigation Links */}
        <View className="flex-row space-x-6">
          <TouchableOpacity onPress={() => scrollToSection('features')}>
            <Text className="text-white">Features</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollToSection('demo')}>
            <Text className="text-white">Demo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollToSection('pricing')}>
            <Text className="text-white">Pricing</Text>
          </TouchableOpacity>
        </View>

        {/* Auth Buttons */}
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="text-white">Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-white px-4 py-2 rounded-full"
            onPress={() => router.push('/signup')}
          >
            <Text className="text-indigo-600 font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function LandingPage(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<{ [key: string]: View | null }>({});
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    if (scrollViewRef.current && sectionRefs.current[sectionId]) {
      sectionRefs.current[sectionId]?.measureLayout(
        scrollViewRef.current as unknown as number,
        (_, y) => {
          scrollViewRef.current?.scrollTo({ x: 0, y: y, animated: true });
        },
        () => console.log('Failed to measure')
      );
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsScrolled(event.nativeEvent.contentOffset.y > 50);
  };

  const currentYear = new Date().getFullYear()

  return (
    <ScrollView 
      ref={scrollViewRef} 
      className="flex-1 bg-white"
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        className="pb-16"
      >
        {/* Header */}
        <Header isScrolled={isScrolled} scrollToSection={scrollToSection} />


        {/* Hero Section */}
        <View className="px-4 pt-16">
          <Text className="text-5xl font-extrabold text-white text-center mb-6">
            Master IELTS Speaking with <Text className="text-yellow-400">Wheels</Text>
          </Text>
          <Text className="text-xl text-white text-center mb-10 max-w-2xl mx-auto">
            Accelerate your English speaking skills and ace your IELTS test with our interactive platform
          </Text>
          <View className="flex-row justify-center space-x-4">
            <TouchableOpacity 
              className="bg-white px-6 py-3 rounded-full flex-row items-center"
              onPress={() => router.push('/signup')}
            >
              <Text className="text-indigo-600 font-medium">Start Free Trial</Text>
              <ArrowRight className="ml-2 h-5 w-5 text-indigo-600" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="border-2 border-white px-6 py-3 rounded-full flex-row items-center"
              onPress={() => scrollToSection('demo')}
            >
              <Text className="text-white font-medium">Learn More</Text>
              <Play className="ml-2 h-5 w-5 text-white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Features Section */}
      <View ref={(ref) => sectionRefs.current['features'] = ref} className="py-16 px-4" id="features">
        <View className="max-w-7xl mx-auto">
          <Text className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Why Choose Wheels for IELTS Speaking?
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <FeatureCard 
              icon={<Mic className="h-10 w-10 text-indigo-600" />}
              title="Real-time Speaking Practice"
              description="Practice with our AI-powered speaking partner that simulates real IELTS conversations."
            />
            <FeatureCard 
              icon={<Book className="h-10 w-10 text-indigo-600" />}
              title="Comprehensive Lessons"
              description="Access a wide range of lessons covering all aspects of the IELTS speaking test."
            />
            <FeatureCard 
              icon={<BarChart className="h-10 w-10 text-indigo-600" />}
              title="Detailed Analytics"
              description="Track your progress with in-depth analysis of your speaking performance."
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-indigo-600" />}
              title="Expert Feedback"
              description="Receive personalized feedback from IELTS experts to improve your skills."
            />
          </View>
        </View>
      </View>

      {/* Experience a lesson */}
      <View ref={(ref) => sectionRefs.current['demo'] = ref} className="bg-gray-100 py-16 px-4" id="demo">
        <View className="max-w-7xl mx-auto">
          <Text className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Experience an IELTS Speaking Lesson
          </Text>
          <View className="bg-white rounded-lg shadow-lg overflow-hidden">
            <View className="p-6">
              <Text className="text-2xl font-bold text-gray-900 mb-4">Topic: Describing a Memorable Journey</Text>
              <Text className="text-gray-600 mb-6">In this lesson, you'll practice describing a memorable journey you've taken. We'll focus on using descriptive language, proper tenses, and structuring your response.</Text>
              <View className="space-y-4">
                <View className="flex-row items-start">
                  <Mic className="h-6 w-6 text-blue-600" />
                  <Text className="ml-3 text-gray-700">
                    <Text className='font-bold'>Describe a memorable journey you have taken. You should say:</Text>
                    {"\n"}
                    {"\n"}  • Where you went
                    {"\n"}  • Who you went with
                    {"\n"}  • What you did during the journey
                    {"\n"}
                    {"\n"}And explain why it was memorable for you.
                  </Text>
                </View>
                <TouchableOpacity className="flex-row items-center justify-center w-full bg-blue-600 px-4 py-2 rounded-md">
                  <Play className="h-5 w-5 mr-2 text-white" />
                  <Text className="text-white font-semibold">Start Practice Session</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Pricing Section */}
      <View ref={(ref) => sectionRefs.current['pricing'] = ref} className="bg-white py-16 px-4" id="pricing">
        <View className="max-w-7xl mx-auto">
          <Text className="text-3xl font-extrabold text-gray-900 text-center mb-12">
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

    {/* Ready? */}
      <View className="bg-blue-600 text-white py-16 px-4">
        <View className="max-w-7xl mx-auto text-center">
          <Text className="text-3xl text-white font-extrabold mb-8">Ready to Boost Your IELTS Speaking Score?</Text>
          <TouchableOpacity 
            className="bg-white px-8 py-3 rounded-md inline-flex flex-row justify-center items-center"
            onPress={() => router.push('/signup')}
          >
            <Text className="text-blue-600 text-lg font-medium">Get Started Now</Text>
            <ArrowRight className="ml-2 h-5 w-5 text-blue-600 inline" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
    
    <View className="bg-blue-900 p-4">
      <View className="items-end">

        <Text className="text-white text-sm">
          © {currentYear} Wheels. All rights reserved.
        </Text>
      </View>
    </View>


    </ScrollView>
  );
}