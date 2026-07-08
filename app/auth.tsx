import React, { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { ChevronLeft } from 'lucide-react-native';

// Import Screens
import LoginScreen from './screens/auth/LoginScreen';
import RegisterGeneralScreen from './screens/auth/RegisterGeneralScreen';
import RegisterDocumentsScreen from './screens/auth/RegisterDocumentsScreen';
import RegisterPasswordScreen from './screens/auth/RegisterPasswordScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthStep = 'login' | 'register_general' | 'register_documents' | 'register_password';

export default function AuthFlow() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialStep = (params.step as AuthStep) || 'login';

  const [step, setStep] = useState<AuthStep>(initialStep);
  const [role, setRole] = useState<string>((params.role as string) || 'worker');

  // Go back to the previous screen in the flow
  const handleBack = () => {
    if (step === 'register_general') {
      setStep('login');
    } else if (step === 'register_documents') {
      setStep('register_general');
    } else if (step === 'register_password') {
      setStep('register_documents');
    } else {
      router.back();
    }
  };

  const renderActiveScreen = () => {
    switch (step) {
      case 'login':
        return (
          <LoginScreen
            onRegisterPress={() => setStep('register_general')}
            onLoginPress={(email) => {
              // Redirect based on selected user role
              if (role === 'employer') {
                router.replace('/tabs/(employer-tabs)');
              } else {
                router.replace('/tabs/(worker-tabs)');
              }
            }}
          />
        );
      case 'register_general':
        return (
          <RegisterGeneralScreen
            onContinue={(data) => {
              console.log('General register data:', data);
              setStep('register_documents');
            }}
          />
        );
      case 'register_documents':
        return (
          <RegisterDocumentsScreen
            onContinue={(docs) => {
              console.log('Uploaded documents:', docs);
              setStep('register_password');
            }}
          />
        );
      case 'register_password':
        return (
          <RegisterPasswordScreen
            onComplete={(password) => {
              console.log('Password complete registration');
              // On success, redirect to home tabs
              if (role === 'employer') {
                router.replace('/tabs/(employer-tabs)');
              } else {
                router.replace('/tabs/(worker-tabs)');
              }
            }}
          />
        );
      default:
        return <LoginScreen onRegisterPress={() => setStep('register_general')} />;
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <SafeAreaView className="flex-1">
        {/* Top Mini-Navigation Bar */}
        <View className="flex-row items-center justify-between px-4 py-2 border-b border-neutral-100 bg-white">
          <TouchableOpacity 
            onPress={handleBack} 
            className="p-2 -ml-2 flex-row items-center gap-1"
            activeOpacity={0.7}
          >
            <ChevronLeft size={20} color="#1B2530" />
            <Text className="text-[#1B2530] text-sm font-semibold">Back</Text>
          </TouchableOpacity>

          <View className="flex-row items-center gap-1.5">
            <Text className="text-neutral-400 text-xs font-semibold uppercase tracking-widest">
              Role:
            </Text>
            <TouchableOpacity 
              onPress={() => setRole(role === 'worker' ? 'employer' : 'worker')}
              className="bg-neutral-100 px-2.5 py-1 rounded-md"
              activeOpacity={0.7}
            >
              <Text className="text-neutral-700 text-xs font-bold capitalize">
                {role}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Render Current Active Screen */}
        <View className="flex-1">
          {renderActiveScreen()}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
