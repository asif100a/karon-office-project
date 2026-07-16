import { View, Text } from "react-native";
import React from "react";

export default function WorkerDetailsStats({ worker }: { worker: any }) {
  return (
    <View className="bg-white rounded-xl p-4 border border-neutral-200/80 mt-6">
      <View className="flex-row">
        {worker.stats.map((item: any, index: number) => (
          <View
            key={item.label}
            className={`flex-1 items-center py-2 ${index < worker.stats.length - 1 ? "border-r border-neutral-100" : ""}`}
          >
            <Text className="text-neutral-900 text-3xl font-extrabold">
              {item.value}
            </Text>
            <Text className="text-neutral-500 text-[11px] mt-1 text-center">
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
