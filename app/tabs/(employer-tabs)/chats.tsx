import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Bell, MessageCircle, ChevronRight } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

const CHATS = [
  { id: "1", name: "Sarah Mitchell", message: "Can we confirm the start time?", time: "4:30 PM" },
  { id: "2", name: "James Thornton", message: "I’m on my way to the site.", time: "3:15 PM" },
];

export default function EmployerChatsScreen() {
  return (
    <View className="flex-1 bg-neutral-50">
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

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="gap-4">
          {CHATS.map((chat) => (
            <View key={chat.id} className="bg-white rounded-2xl p-5 border border-neutral-100/85 shadow-sm">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3 flex-1">
                  <View className="w-12 h-12 bg-orange-50 rounded-full items-center justify-center">
                    <MessageCircle size={20} color={Colors.common.BRAND} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-950 font-extrabold text-base">{chat.name}</Text>
                    <Text className="text-neutral-500 text-xs font-semibold" numberOfLines={1}>
                      {chat.message}
                    </Text>
                  </View>
                </View>
                <View className="items-end ml-3">
                  <Text className="text-neutral-400 text-xs font-semibold">{chat.time}</Text>
                  <ChevronRight size={20} color="#737373" />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
