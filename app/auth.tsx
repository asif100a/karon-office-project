import { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Import Screens
import LoginScreen from './screens/auth/LoginScreen';
import RegisterGeneralScreen from './screens/auth/RegisterGeneralScreen';
import RegisterDocumentsScreen from './screens/auth/RegisterDocumentsScreen';
import RegisterPasswordScreen from './screens/auth/RegisterPasswordScreen';
import CompletePayrollScreen from './screens/auth/CompletePayrollScreen';
import ReviewScreen from './screens/auth/ReviewScreen';
import RegisterEmployerScreen from './screens/auth/RegisterEmployerScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/standard_ui/buttons/BackButton';
import { getDashboardRouteForRole, normalizeUserRole, UserRole } from '@/constants/Routes';

type AuthStep = 'login' | 'register_general' | 'register_employer' | 'register_documents' | 'register_password' | 'complete_payroll' | 'review';

export default function AuthFlow() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialStep = (params.step as AuthStep) || 'login';

  const [step, setStep] = useState<AuthStep>(initialStep);
  const [role, setRole] = useState<UserRole>(normalizeUserRole(params.role));

  useEffect(() => {
    setRole(normalizeUserRole(params.role));
  }, [params.role]);

  const goToRoleDashboard = () => {
    router.replace(getDashboardRouteForRole(role));
  };

  // Go back to the previous screen in the flow
  const handleBack = () => {
    if (step === 'register_general' || step === 'register_employer') {
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
    if (role === 'employer' && (step === 'register_general' || step === 'register_employer')) {
      return (
        <RegisterEmployerScreen
          onContinue={(data) => {
            console.log('Employer register data:', data);
            setStep('complete_payroll');
          }}
          onLoginPress={() => setStep('login')}
        />
      );
    }

    switch (step) {
      case 'login':
        return (
          <LoginScreen
            role={role}
            onRegisterPress={() => setStep(role === 'employer' ? 'register_employer' : 'register_general')}
            onLoginPress={goToRoleDashboard}
          />
        );
      case 'register_general':
        return (
          <RegisterGeneralScreen
            role={role}
            onContinue={(data) => {
              console.log('General register data:', data);
              setStep('register_documents');
            }}
            onLoginPress={() => setStep('login')}
          />
        );
      case 'register_documents':
        return (
          <RegisterDocumentsScreen
            role={role}
            onContinue={(docs) => {
              console.log('Uploaded documents:', docs);
              setStep('register_password');
            }}
          />
        );
      case 'register_password':
        return (
          <RegisterPasswordScreen
            role={role}
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
              if (role === 'employer') {
                setStep('review');
              } else {
                goToRoleDashboard();
              }
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
        return (
          <LoginScreen
            role={role}
            onRegisterPress={() => setStep(role === 'employer' ? 'register_employer' : 'register_general')}
            onLoginPress={goToRoleDashboard}
          />
        );
    }
  };

  const showHeader = step !== 'complete_payroll' && step !== 'review' && step !== 'login' && step !== 'register_general';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['bottom']}>
        {/* Top Mini-Navigation Bar */}
        {showHeader && (
          <View className="flex-row items-center justify-between px-4 pt-16" style={{backgroundColor: Colors.common.BRAND}}>
            <BackButton onPress={handleBack} textStyle={{
              color: Colors.common.WHITE
            }} 
            iconColor={Colors.common.WHITE}
            />
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
