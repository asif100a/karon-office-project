import { View, Text } from "react-native";
import React from "react";

export default function AvatarStack() {
  return (
    <View className="flex-row items-center">
      <View className="w-6 h-6 rounded-full border-2 border-white bg-slate-300 items-center justify-center">
        <Text className="text-[10px] font-extrabold text-slate-700">K</Text>
      </View>
      <View className="-ml-2 w-6 h-6 rounded-full border-2 border-white bg-slate-600 items-center justify-center">
        <Text className="text-[10px] font-extrabold text-white">K</Text>
      </View>
      <View className="-ml-2 w-6 h-6 rounded-full border-2 border-white bg-slate-800 items-center justify-center">
        <Text className="text-[10px] font-extrabold text-white">K</Text>
      </View>
    </View>
  );
}
