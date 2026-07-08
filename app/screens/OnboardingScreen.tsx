import React, { useState, useRef } from 'react';
import { View, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LogoWhite from '@/assets/icons/LogoWhite';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Svg, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import ONBOARDING_1 from '@/assets/images/onboarding/onboarding-1.png';
import ONBOARDING_2 from '@/assets/images/onboarding/onboarding-2.png';
import ONBOARDING_3 from '@/assets/images/onboarding/onboarding-3.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SLIDES = [
  {
    key: 'worker-1',
    image: ONBOARDING_1,
    title: 'The Smarter Way\nTo Find Work',
    subtitle: 'Workers find real jobs at transparent rates.',
  },
  {
    key: 'employer-1',
    image: ONBOARDING_2,
    title: 'The Smarter Way\nTo Hire Trades',
    subtitle: 'Contractors fill positions faster without the Agency rates.',
  },
  {
    key: 'worker-2',
    image: ONBOARDING_3,
    title: 'The Smarter Way\nTo Find Work',
    subtitle: 'Workers find real jobs at transparent rates.',
  },
];

const BottomGradient = () => (
  <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: SCREEN_HEIGHT * 0.65, zIndex: 1 }}>
    <Svg height="100%" width="100%">
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <Stop offset="45%" stopColor="#000000" stopOpacity="0.75" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  </View>
);

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  const handleScroll = (event: any) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / SCREEN_WIDTH);
    if (index !== activeIndex && index >= 0 && index < SLIDES.length) {
      setActiveIndex(index);
    }
  };

  const navigateToWorker = () => {
    router.replace({ pathname: '/auth', params: { role: 'worker' } });
  };

  const navigateToEmployer = () => {
    router.replace({ pathname: '/auth', params: { role: 'employer' } });
  };

  const handleNext = () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex < SLIDES.length) {
      scrollRef.current?.scrollTo({ x: nextIndex * SCREEN_WIDTH, animated: true });
      setActiveIndex(nextIndex);
    }
  };

  const handleSkip = () => {
    const lastIndex = SLIDES.length - 1;
    scrollRef.current?.scrollTo({ x: lastIndex * SCREEN_WIDTH, animated: true });
    setActiveIndex(lastIndex);
  };

  return (
    <Box className="flex-1 bg-black">
      {/* Logo Overlay */}
      <View style={{ position: 'absolute', top: 55, left: 0, right: 0, alignItems: 'center', zIndex: 10 }}>
        <LogoWhite />
      </View>

      {/* Main Slide Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {SLIDES.map((slide, index) => (
          <ImageBackground
            key={slide.key}
            source={slide.image}
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            resizeMode="cover"
          >
            {/* Dark bottom gradient overlay */}
            <BottomGradient />

            {/* Slide Content Container */}
            <View style={{ position: 'absolute', bottom: 50, left: 0, right: 0, paddingHorizontal: 24, zIndex: 5 }}>
              
              {/* Pagination Dots */}
              <View className="flex-row justify-center items-center gap-2 mb-6">
                {SLIDES.map((_, i) => (
                  <View
                    key={i}
                    style={{
                      height: 8,
                      width: activeIndex === i ? 24 : 8,
                      borderRadius: 4,
                      backgroundColor: activeIndex === i ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
                    }}
                  />
                ))}
              </View>

              {/* Title & Description */}
              <Text className="text-white text-3xl font-extrabold text-center mb-2 leading-tight">
                {slide.title}
              </Text>
              <Text className="text-neutral-300 text-sm text-center px-4 mb-8">
                {slide.subtitle}
              </Text>

              {/* Action Buttons */}
              {index === SLIDES.length - 1 ? (
                <>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={navigateToWorker}
                    className="bg-white rounded-xl py-4 items-center justify-center shadow-md"
                  >
                    <Text className="text-black font-bold text-base">Worker</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={navigateToEmployer}
                    className="border border-white/40 bg-black/35 rounded-xl py-4 items-center justify-center mt-3"
                  >
                    <Text className="text-white font-bold text-base">Employer</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={handleNext}
                    className="bg-white rounded-xl py-4 items-center justify-center shadow-md"
                  >
                    <Text className="text-black font-bold text-base">Next</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={handleSkip}
                    className="border border-white/40 bg-black/35 rounded-xl py-4 items-center justify-center mt-3"
                  >
                    <Text className="text-white font-bold text-base">Skip</Text>
                  </TouchableOpacity>
                </>
              )}
              
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </Box>
  );
}
