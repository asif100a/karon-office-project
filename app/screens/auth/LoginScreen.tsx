import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import LogoWhite from '@/assets/icons/LogoWhite';
import { Eye, EyeOff } from 'lucide-react-native';

interface LoginScreenProps {
  onRegisterPress?: () => void;
  onLoginPress?: (email: string) => void;
}

export default function LoginScreen({ onRegisterPress, onLoginPress }: LoginScreenProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (onLoginPress) {
      onLoginPress(email);
    } else {
      // Default navigation behavior
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
      <View className="bg-[#FF5500] pt-14 pb-10 px-6 items-start justify-end min-h-[220px]">
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
        <View className="gap-5">
          {/* Email Field */}
          <View className="gap-2">
            <Text className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
              Email Address
            </Text>
            <View className="w-full bg-[#FCFCFC] border border-neutral-200 rounded-xl px-4 py-3.5 flex-row items-center">
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Your Email"
                placeholderTextColor="#A3A3A3"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="flex-1 text-neutral-800 text-sm font-medium p-0"
              />
            </View>
          </View>

          {/* Password Field */}
          <View className="gap-2">
            <Text className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
              Password
            </Text>
            <View className="w-full bg-[#FCFCFC] border border-neutral-200 rounded-xl px-4 py-3.5 flex-row items-center justify-between">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="•••••••"
                placeholderTextColor="#A3A3A3"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                className="flex-1 text-neutral-800 text-sm font-medium p-0"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                className="ml-2 p-1"
                activeOpacity={0.7}
              >
                {showPassword ? (
                  <EyeOff size={18} color="#A3A3A3" />
                ) : (
                  <Eye size={18} color="#A3A3A3" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-10 gap-6">
          <TouchableOpacity
            onPress={handleLogin}
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
