import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, ArrowRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const MOCK_CHATS = [
  {
    id: 'sarah',
    name: 'Sarah Mitchell',
    lastMessage: 'You: Did you see the proposal? I ma...',
    time: '4:30 PM',
    unread: true,
    initials: 'SM',
    avatarBg: '#E0F2FE', // Light blue
    avatarColor: '#0369A1',
  },
  {
    id: 'james-1',
    name: 'James Thornton',
    lastMessage: "James: Let's grab coffee tomorrow,...",
    time: '3:15 PM',
    unread: false,
    initials: 'JT',
    avatarBg: '#FEE2E2', // Light red
    avatarColor: '#B91C1C',
  },
  {
    id: 'james-2',
    name: 'James Thornton',
    lastMessage: "James: Let's grab coffee tomorrow,...",
    time: '3:15 PM',
    unread: false,
    initials: 'JT',
    avatarBg: '#F3E8FF', // Light purple
    avatarColor: '#6B21A8',
  },
  {
    id: 'james-3',
    name: 'James Thornton',
    lastMessage: "James: Let's grab coffee tomorrow,...",
    time: '3:15 PM',
    unread: false,
    initials: 'JT',
    avatarBg: '#ECFDF5', // Light green
    avatarColor: '#047857',
  },
  {
    id: 'james-4',
    name: 'James Thornton',
    lastMessage: "James: Let's grab coffee tomorrow,...",
    time: '3:15 PM',
    unread: false,
    initials: 'JT',
    avatarBg: '#FEF3C7', // Light amber
    avatarColor: '#B45309',
  },
  {
    id: 'james-5',
    name: 'James Thornton',
    lastMessage: "James: Let's grab coffee tomorrow,...",
    time: '3:15 PM',
    unread: false,
    initials: 'JT',
    avatarBg: '#F1F5F9', // Muted slate
    avatarColor: '#475569',
  },
];

export default function WorkerChatsScreen() {
  const router = useRouter();

  const handleOpenChat = (id: string) => {
    router.push(`/screens/chats/${id}` as any);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Brand Header */}
      <View 
        style={{ backgroundColor: Colors.common.BRAND }} 
        className="pt-16 pb-8 px-6 rounded-b-[32px] shadow-lg shadow-orange-500/10"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-extrabold tracking-tight">Chats</Text>
          
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/15 items-center justify-center border border-white/10 active:opacity-75">
            <Bell color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chats List */}
      <ScrollView 
        className="flex-1 px-4 mt-4" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="divide-y divide-neutral-100">
          {MOCK_CHATS.map((chat) => (
            <TouchableOpacity 
              key={chat.id}
              onPress={() => handleOpenChat(chat.id)}
              activeOpacity={0.7}
              className="flex-row items-center justify-between py-4"
            >
              <View className="flex-row items-center flex-1 gap-4.5">
                {/* Initials Avatar */}
                <View 
                  style={{ backgroundColor: chat.avatarBg }} 
                  className="w-12 h-12 rounded-full items-center justify-center border border-neutral-100"
                >
                  <Text style={{ color: chat.avatarColor }} className="font-bold text-sm">
                    {chat.initials}
                  </Text>
                </View>

                {/* Message Snippet & Name */}
                <View className="flex-1 pr-4">
                  <View className="flex-row items-center gap-1.5 mb-1">
                    <Text className="text-neutral-900 font-extrabold text-sm">{chat.name}</Text>
                    {chat.unread && (
                      <View className="w-2.5 h-2.5 rounded-full bg-[#FF5500]" />
                    )}
                  </View>
                  <Text 
                    style={chat.unread ? { color: Colors.common.BRAND } : {}}
                    className={`text-xs font-semibold ${chat.unread ? '' : 'text-neutral-400'}`}
                    numberOfLines={1}
                  >
                    {chat.lastMessage}
                  </Text>
                </View>
              </View>

              {/* Timestamp */}
              <View className="items-end">
                <Text className="text-neutral-400 text-xs font-semibold">{chat.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}