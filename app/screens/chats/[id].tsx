import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Send } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from '@/components/modules/common/chat/ChatHeader';
import MessagesLog from '@/components/modules/common/chat/MessagesLog';

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const [inputText, setInputText] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={[]}>
      {/* Brand Header */}
      <ChatHeader />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {/* Messages Log */}
        <MessagesLog id={id as string} />

        {/* Input Bar Footer */}
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-200/80 px-6 pt-4 pb-14 flex-row items-center gap-3">
          <View className="flex-1 bg-neutral-50 border border-neutral-200/70 rounded-xl px-4 py-0">
            <TextInput
              className="text-neutral-800 text-sm font-semibold py-0"
              placeholder="Write here....."
              placeholderTextColor="#A3A3A3"
              value={inputText}
              onChangeText={setInputText}
            />
          </View>

          <TouchableOpacity 
            className="w-12 h-12 rounded-xl bg-neutral-900 items-center justify-center active:opacity-90"
          >
            <Send size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
