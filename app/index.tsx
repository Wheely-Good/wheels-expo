import React, { useState, useRef } from 'react';
import { View, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '@/components/landing_page/Header';
import Hero from '@/components/landing_page/Hero';
import Features from '@/components/landing_page/Features';
import ExperienceLesson from '@/components/landing_page/ExperienceLesson';
import Pricing from '@/components/landing_page/Pricing';
import CallToAction from '@/components/landing_page/CallToAction';
import Footer from '@/components/landing_page/Footer';

export default function LandingPage(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<{ [key: string]: View | null }>({});

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
        <Header isScrolled={isScrolled} scrollToSection={scrollToSection} />
        <Hero scrollToSection={scrollToSection} />
      </LinearGradient>

      <View ref={(ref) => sectionRefs.current['features'] = ref}>
        <Features />
      </View>

      <View ref={(ref) => sectionRefs.current['demo'] = ref}>
        <ExperienceLesson />
      </View>

      <View ref={(ref) => sectionRefs.current['pricing'] = ref}>
        <Pricing />
      </View>

      <CallToAction />

      <Footer />
    </ScrollView>
  );
}