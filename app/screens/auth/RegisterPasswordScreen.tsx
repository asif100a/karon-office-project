import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import LogoWhite from '@/assets/icons/LogoWhite';
import { Eye, EyeOff, Check } from 'lucide-react-native';

interface RegisterPasswordScreenProps {
  onComplete?: (password: string) => void;
}

export default function RegisterPasswordScreen({ onComplete }: RegisterPasswordScreenProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleComplete = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (onComplete) {
      onComplete(password);
    } else {
      router.replace('/tabs/(worker-tabs)');
    }
  };

  return (
    <ScrollView 
      className="flex-1 bg-white" 
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      {/* Orange Header Section - Styled "Register Your Account" */}
      <View className="bg-[#FF5500] pt-14 pb-10 px-6 items-start justify-end min-h-[220px]">
        <View className="mb-4">
          <LogoWhite />
        </View>
        <Text className="text-white text-3xl font-bold tracking-tight">
          Register Your Account
        </Text>
        <Text className="text-white/85 text-sm mt-1.5 font-medium">
          Register to continue your journey with Sitesource
        </Text>
      </View>

      {/* Password Setup Form */}
      <View className="flex-1 px-6 pt-8 pb-10 justify-between">
        <View className="gap-5">
          {/* Password */}
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

          {/* Confirm Password */}
          <View className="gap-2">
            <Text className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
              Confirm Password
            </Text>
            <View className="w-full bg-[#FCFCFC] border border-neutral-200 rounded-xl px-4 py-3.5 flex-row items-center justify-between">
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="•••••••"
                placeholderTextColor="#A3A3A3"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                className="flex-1 text-neutral-800 text-sm font-medium p-0"
              />
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 p-1"
                activeOpacity={0.7}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} color="#A3A3A3" />
                ) : (
                  <Eye size={18} color="#A3A3A3" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me Checkbox */}
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.8}
            className="flex-row items-center gap-3 mt-1.5 py-1"
          >
            <View className={`w-5 h-5 rounded-md items-center justify-center border ${
              rememberMe ? 'bg-[#FF5500] border-[#FF5500]' : 'bg-[#FCFCFC] border-neutral-300'
            }`}>
              {rememberMe && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
            </View>
            <Text className="text-neutral-700 text-sm font-medium">
              Remember me
            </Text>
          </TouchableOpacity>
        </View>

        {/* Complete Registration Action */}
        <View className="mt-10">
          <TouchableOpacity
            onPress={handleComplete}
            activeOpacity={0.9}
            className="w-full bg-[#1B2530] py-4 rounded-xl items-center justify-center shadow-sm"
          >
            <Text className="text-white text-base font-semibold">
              Complete Registration
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
