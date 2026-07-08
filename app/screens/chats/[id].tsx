import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Send } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [inputText, setInputText] = useState('');

  // Lookup chat partner details based on route parameter (mock)
  const chatPartner = {
    name: id === 'sarah' ? 'Sarah Mitchell' : 'Hafizur Rahman',
    initials: id === 'sarah' ? 'SM' : 'HR',
    avatarBg: id === 'sarah' ? '#E0F2FE' : '#FEF3C7',
    avatarColor: id === 'sarah' ? '#0369A1' : '#D97706',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      {/* Brand Header */}
      <View 
        style={{ backgroundColor: Colors.common.BRAND }} 
        className="pb-5 pt-4 px-6 rounded-b-[24px] shadow-lg shadow-orange-500/10 z-10"
      >
        <View className="flex-row items-center gap-1">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="flex-row items-center gap-0.5 active:opacity-75"
          >
            <ChevronLeft size={20} color="#FFFFFF" />
            <Text className="text-white text-base font-extrabold tracking-tight">Chats</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {/* Messages Log */}
        <ScrollView 
          className="flex-1 px-5 pt-6 bg-white"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Message 1 (From Chat Partner) */}
          <View className="flex-row items-start mb-6 gap-3">
            {/* Avatar */}
            <View 
              style={{ backgroundColor: chatPartner.avatarBg }} 
              className="w-10 h-10 rounded-full items-center justify-center border border-neutral-100"
            >
              <Text style={{ color: chatPartner.avatarColor }} className="font-extrabold text-xs">
                {chatPartner.initials}
              </Text>
            </View>

            <View className="flex-1 items-start">
              {/* Partner Name */}
              <Text className="text-neutral-700 text-xs font-bold mb-1.5">{chatPartner.name}</Text>
              
              {/* Bubble */}
              <View className="bg-orange-50/80 rounded-2xl rounded-tl-none px-4 py-3 border border-orange-100/50 max-w-[85%]">
                <Text className="text-neutral-800 text-sm font-semibold leading-relaxed">
                  Have a great working week!!
                </Text>
              </View>

              {/* Timestamp */}
              <Text className="text-neutral-400 text-[10px] font-semibold mt-1">09:25 AM</Text>
            </View>
          </View>

          {/* Message 2 (From You) */}
          <View className="flex-row items-start justify-end mb-6 gap-3">
            <View className="flex-1 items-end">
              {/* Your Name */}
              <Text className="text-neutral-700 text-xs font-bold mb-1.5">You</Text>
              
              {/* Bubble */}
              <View className="bg-[#7C3AED] rounded-2xl rounded-tr-none px-4 py-3 max-w-[85%] shadow-sm">
                <Text className="text-white text-sm font-semibold leading-relaxed">
                  You did your job well!
                </Text>
              </View>

              {/* Timestamp */}
              <Text className="text-neutral-400 text-[10px] font-semibold mt-1">09:25 AM</Text>
            </View>

            {/* Avatar */}
            <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center border border-purple-200">
              <Text className="text-purple-700 font-extrabold text-xs">TH</Text>
            </View>
          </View>
        </ScrollView>

        {/* Input Bar Footer */}
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-6 py-4 flex-row items-center gap-3">
          <View className="flex-1 bg-neutral-50 border border-neutral-200/70 rounded-2xl px-4 py-3 shadow-sm">
            <TextInput
              className="text-neutral-800 text-sm font-semibold py-0"
              placeholder="Write here....."
              placeholderTextColor="#A3A3A3"
              value={inputText}
              onChangeText={setInputText}
            />
          </View>

          <TouchableOpacity 
            className="w-12 h-12 rounded-2xl bg-neutral-900 items-center justify-center active:opacity-90 shadow-sm"
          >
            <Send size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
