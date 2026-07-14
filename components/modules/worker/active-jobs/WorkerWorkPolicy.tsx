import { View, Text } from "react-native";
import React from "react";

export default function WorkerWorkPolicy() {
  return (
    <View>
      <Text className="text-neutral-900 font-extrabold text-base mb-3.5">
        Work Summary
      </Text>

      <View className="gap-3.5">
        <View className="bg-emerald-50/60 border border-emerald-100/55 rounded-2xl p-4 flex-row items-start gap-3">
          <View className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5" />
          <View>
            <Text className="text-emerald-850 font-extrabold text-sm">
              Free cancellation
            </Text>
            <Text className="text-emerald-600 text-xs font-semibold mt-0.5">
              More than 48 hours before start
            </Text>
          </View>
        </View>

        <View className="bg-amber-50/60 border border-amber-100/55 rounded-2xl p-4 flex-row items-start gap-3">
          <View className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5" />
          <View>
            <Text className="text-amber-850 font-extrabold text-sm">
              50% charge
            </Text>
            <Text className="text-amber-600 text-xs font-semibold mt-0.5">
              Between 48-24 hours before start
            </Text>
          </View>
        </View>

        <View className="bg-red-50/60 border border-red-100/55 rounded-2xl p-4 flex-row items-start gap-3">
          <View className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5" />
          <View>
            <Text className="text-red-855 font-extrabold text-sm">
              Full charge
            </Text>
            <Text className="text-red-600 text-xs font-semibold mt-0.5">
              Within 24 hours of start
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
