import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Logo from '@/assets/icons/Logo';
import { Center } from '@/components/ui/center';
import { Box } from '@/components/ui/box';

export default function SplashScreen() {
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Box className="flex-1 bg-white items-center justify-center">
      <Animated.View 
        style={{ 
          opacity: logoFade,
          transform: [{ scale: logoScale }]
        }}
      >
        <Center className="px-6 py-4 rounded-2xl border border-neutral-100 bg-white/50 shadow-sm">
          <Logo />
        </Center>
      </Animated.View>
    </Box>
  );
}
