import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import LogoWhite from '@/assets/icons/LogoWhite';
import { useForm } from 'react-hook-form';
import StandardInputField from '@/components/standard_ui/form_fields/StandardInputField';

interface LoginScreenProps {
  onRegisterPress?: () => void;
  onLoginPress?: (email: string) => void;
}

export default function LoginScreen({ onRegisterPress, onLoginPress }: LoginScreenProps) {
  const router = useRouter();
  
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (data: any) => {
    if (onLoginPress) {
      onLoginPress(data.email);
    } else {
      router.replace('/tabs/(worker-tabs)');
    }
  };

  const handleRegister = () => {
    if (onRegisterPress) {
      onRegisterPress();
    } else {
      router.push({ pathname: '/auth', params: { step: 'register_general' } });
    }
  };

  return (
    <ScrollView 
      className="flex-1 bg-white" 
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      {/* Orange Header Section */}
      <View className="bg-[#FF5500] pb-10 px-6 items-start justify-end min-h-[220px]">
        <View className="mb-4">
          <LogoWhite />
        </View>
        <Text className="text-white text-3xl font-bold tracking-tight">
          Login To Your Account
        </Text>
        <Text className="text-white/85 text-sm mt-1.5 font-medium">
          Register to continue your journey with Sitesource
        </Text>
      </View>

      {/* Form Section */}
      <View className="flex-1 px-6 pt-8 pb-10 justify-between">
        <View className="gap-1">
          {/* Email Field */}
          <StandardInputField
            label="Email Address"
            id="email"
            type="email"
            control={control}
            required={true}
            placeholder="Enter Your Email"
          />

          {/* Password Field */}
          <StandardInputField
            label="Password"
            id="password"
            type="password"
            control={control}
            required={true}
            placeholder="•••••••"
          />
        </View>

        {/* Action Buttons */}
        <View className="mt-6 gap-6">
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.9}
            className="w-full bg-[#1B2530] py-4 rounded-xl items-center justify-center shadow-sm"
          >
            <Text className="text-white text-base font-semibold">
              Login
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center items-center">
            <Text className="text-neutral-800 text-sm font-medium">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
              <Text className="text-[#1B2530] text-sm font-bold underline">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
