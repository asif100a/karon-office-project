import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowLeft, Bookmark } from "lucide-react-native";

export default function WorkerDetailsHeader({
  handleHeaderBack,
}: {
  handleHeaderBack: () => void;
}) {
  return (
    <View className="bg-[#FAFAFA] px-5 pt-4 pb-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={handleHeaderBack}
          className="w-9 h-9 rounded-full bg-white items-center justify-center active:opacity-75"
        >
          <ArrowLeft size={18} color="#111827" />
        </TouchableOpacity>
        <Text className="text-neutral-900 text-lg font-extrabold ml-2">
          Worker Details
        </Text>
      </View>
      <TouchableOpacity className="w-9 h-9 rounded-lg bg-[#101820] items-center justify-center active:opacity-85">
        <Bookmark size={17} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
