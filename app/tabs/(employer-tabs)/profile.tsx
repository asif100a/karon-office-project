import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Bell, User, Settings, Lock, LogOut } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

const MENU_ITEMS = [
  { icon: User, label: "Edit profile" },
  { icon: Settings, label: "Settings" },
  { icon: Lock, label: "Security" },
  { icon: LogOut, label: "Log out" },
];

export default function EmployerProfileScreen() {
  return (
    <View className="flex-1 bg-neutral-50">
      <View
        style={{ backgroundColor: Colors.common.BRAND }}
        className="pt-16 pb-8 px-6 rounded-b-[32px] shadow-lg shadow-orange-500/10"
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }}
              className="w-12 h-12 rounded-full border-2 border-white/35"
            />
            <View>
              <Text className="text-white text-base font-extrabold tracking-tight">Wade Warren</Text>
              <Text className="text-white/85 text-xs font-semibold">Employer account</Text>
            </View>
          </View>

          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/15 items-center justify-center border border-white/10 active:opacity-75">
            <Bell color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="bg-white rounded-2xl border border-neutral-100/85 shadow-sm overflow-hidden">
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              className={`flex-row items-center gap-3 px-5 py-4 active:opacity-70 ${
                index === MENU_ITEMS.length - 1 ? "" : "border-b border-neutral-50"
              }`}
            >
              <item.icon size={20} color={item.label === "Log out" ? Colors.common.BRAND : "#525252"} />
              <Text
                className="font-semibold text-base"
                style={item.label === "Log out" ? { color: Colors.common.BRAND } : { color: "#171717" }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
