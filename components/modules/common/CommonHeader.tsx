import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Bell, ChevronLeft } from "lucide-react-native";

export default function CommonHeader({
  headerTitle = "Header",
  withBackButton = false,
  onPress,
}: {
  headerTitle?: string;
  withBackButton?: boolean;
  onPress?: () => void;
}) {
  const handleNavigateBack = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };
  return (
    <View
      style={{ backgroundColor: Colors.common.BRAND }}
      className="pt-14 pb-4 px-6"
    >
      <View className="flex-row justify-between items-center">
        {withBackButton ? (
          <TouchableOpacity
            onPress={handleNavigateBack}
            className="flex-row items-center"
          >
            <ChevronLeft size={20} color="#FFFFFF" />
            <Text className="text-white text-2xl font-extrabold tracking-tight">
              {headerTitle}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-white text-2xl font-extrabold tracking-tight">
            {headerTitle}
          </Text>
        )}
        <TouchableOpacity className="w-10 h-10 rounded-full bg-white/15 items-center justify-center border border-white/10 active:opacity-75">
          <Bell color="#FFFFFF" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
