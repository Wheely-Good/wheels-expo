import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, Mic, Book, BarChart, Users, Play } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    // Implement scrolling logic here
  };

  return (
    <ScrollView 
      ref={scrollViewRef} 
      className="flex-1 bg-white"
      onScroll={({nativeEvent}) => {
        setIsScrolled(nativeEvent.contentOffset.y > 50);
      }}
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
      <View className="py-16 px-4" id="features">
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
      <View className="bg-gray-100 py-16 px-4" id="demo">
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
                    "Describe a memorable journey you have taken. You should say:
                    {"\n"}• Where you went
                    {"\n"}• Who you went with
                    {"\n"}• What you did during the journey
                    {"\n"}• And explain why it was memorable for you"
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
      <View className="bg-white py-16 px-4" id="pricing">
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
            className="bg-white px-8 py-3 rounded-md inline-flex items-center"
            onPress={() => router.push('/signup')}
          >
            <Text className="text-blue-600 text-lg font-medium">Get Started Now</Text>
            <ArrowRight className="ml-2 h-5 w-5 text-blue-600" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
    
      <View className="bg-blue-800 text-white py-8 px-4">
        <View className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
          <View className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <View className="flex flex-row items-center justify-center md:justify-start">
              <Mic className="h-8 w-8 mr-2 text-white" />
              <Text className="text-2xl font-bold">Wheels</Text>
            </View>
            <Text className="mt-2 text-sm">Accelerate your IELTS speaking skills</Text>
          </View>
          <View className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <View className="space-x-4">
              <TouchableOpacity onPress={() => router.push('/privacy')}>
                <Text className="text-white hover:text-yellow-400 transition duration-300">Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/terms')}>
                <Text className="text-white hover:text-yellow-400 transition duration-300">Terms of Service</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/contact')}>
                <Text className="text-white hover:text-yellow-400 transition duration-300">Contact Us</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full md:w-1/3 text-center md:text-right">
            <Text>&copy; 2023 Wheels. All rights reserved.</Text>
          </View>
        </View>
      </View>


    </ScrollView>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps): JSX.Element {
  return (
    <View className="bg-white p-6 rounded-lg shadow-md w-[48%] mb-8">
      <View className="flex flex-row justify-center mb-4">
        {icon}
      </View>
      <Text className="text-lg font-semibold text-gray-900 mb-2 text-center">{title}</Text>
      <Text className="text-gray-600 text-center">{description}</Text>
    </View>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

function PricingCard({ title, price, features, highlighted = false }: PricingCardProps): JSX.Element {
  return (
    <View className={`bg-white p-6 rounded-lg shadow-md ${highlighted ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
      <Text className="text-2xl font-bold text-gray-900 mb-4">{title}</Text>
      <Text className="text-4xl font-extrabold text-blue-600 mb-6">
        {price}<Text className="text-lg font-normal text-gray-500">/month</Text>
      </Text>
      <View className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <View key={index} className="flex-row items-center">
            <ArrowRight className="h-5 w-5 text-green-500 mr-2" />
            <Text>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity className={`w-full py-2 px-4 rounded-md ${highlighted ? 'bg-blue-600' : 'bg-gray-200'}`}>
        <Text className={`text-center font-medium ${highlighted ? 'text-white' : 'text-gray-800'}`}>Choose Plan</Text>
      </TouchableOpacity>
    </View>
  );
}