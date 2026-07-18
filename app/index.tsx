import React, { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import SplashScreenComponent from "./screens/SplashScreen";
import OnboardingScreenComponent from "./screens/OnboardingScreen";
import { router } from "expo-router";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // useEffect(() => {
  //   router.push("/tabs/(employer-tabs)");
  // }, []);

  useEffect(() => {
    // Show splash for 2.5s, then fade out and render the onboarding screens
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <SplashScreenComponent />
      </Animated.View>
    );
  }

  return <OnboardingScreenComponent />;
}
