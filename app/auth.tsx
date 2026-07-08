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
import CompletePayrollScreen from './screens/auth/CompletePayrollScreen';
import ReviewScreen from './screens/auth/ReviewScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/standard_ui/buttons/BackButton';

type AuthStep = 'login' | 'register_general' | 'register_documents' | 'register_password' | 'complete_payroll' | 'review';

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
    } else if (step === 'complete_payroll' || step === 'review') {
      setStep('login');
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
              if (role === 'employer') {
                setStep('review');
              } else {
                setStep('complete_payroll');
              }
            }}
          />
        );
      case 'complete_payroll':
        return (
          <CompletePayrollScreen
            onComplete={() => {
              router.replace('/tabs/(worker-tabs)');
            }}
          />
        );
      case 'review':
        return (
          <ReviewScreen
            onBackToLogin={() => {
              setStep('login');
            }}
          />
        );
      default:
        return <LoginScreen onRegisterPress={() => setStep('register_general')} />;
    }
  };

  const showHeader = step !== 'complete_payroll' && step !== 'review';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['bottom']}>
        {/* Top Mini-Navigation Bar */}
        {showHeader && (
          <View className="flex-row items-center justify-between px-4 pt-16" style={{backgroundColor: Colors.common.BRAND}}>
            <BackButton onPress={handleBack} />
          </View>
        )}

        {/* Render Current Active Screen */}
        <View style={{ flex: 1 }} className="flex-1">
          {renderActiveScreen()}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
