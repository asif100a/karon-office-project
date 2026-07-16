import { View, Text } from "react-native";
import React from "react";
import { MessageCircle } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

export default function WorkerDetailsEmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm items-center w-full max-w-[320px]">
        <View className="w-20 h-20 rounded-full bg-orange-50 items-center justify-center mb-5">
          <MessageCircle size={34} color={Colors.common.BRAND} />
        </View>
        <Text className="text-neutral-900 text-xl font-extrabold">
          No reviews yet
        </Text>
        <Text className="text-neutral-500 text-sm text-center mt-3 leading-6">
          Be the first to share your thoughts and help others decide.
        </Text>
      </View>
    </View>
  );
}
