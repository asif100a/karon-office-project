import { View, Text } from "react-native";
import React from "react";
import { Star } from "lucide-react-native";

export default function WorkerDetailsReviews({ worker }: { worker: any }) {
  return (
    <View className="mt-4 gap-3">
      {worker.feedback.map((item: any) => (
        <View
          key={item.id}
          className="bg-white rounded-2xl p-4 border border-neutral-200/80"
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-row items-center gap-3 flex-1">
              <View className="w-11 h-11 rounded-full bg-neutral-100 items-center justify-center">
                <Text className="text-neutral-700 font-bold text-xs">
                  {item.name
                    .split(" ")
                    .map((part: string) => part[0])
                    .join("")
                    .slice(0, 2)}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-neutral-900 font-bold text-sm">
                  {item.name}
                </Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <Star size={13} color="#FBBF24" fill="#FBBF24" />
                  <Text className="text-neutral-900 font-bold text-xs">
                    {item.rating}
                  </Text>
                </View>
              </View>
            </View>
            <Text className="text-neutral-400 text-xs">{item.date}</Text>
          </View>
          <Text className="text-neutral-600 text-sm leading-6 mt-3">
            {item.text}
          </Text>
        </View>
      ))}
    </View>
  );
}
