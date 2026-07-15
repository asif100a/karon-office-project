import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { RatingStars } from "@/app/screens/profile/_components";
import { MapPin } from "lucide-react-native";
import PLACEHOLDER_USER from "@/assets/images/placeholder/placeholder-user.png";

export default function WorkerProfileSection({ worker }: { worker: any }) {
  return (
    <View className="bg-white rounded-xl border border-neutral-200/80 px-5 py-5 items-center">
      <View className="relative">
        <Image
          source={PLACEHOLDER_USER}
          style={{ width: 96, height: 96 }}
          className="rounded-full"
        />
        <View
          style={{ right: 0, transform: [{ translateX: 0 }] }}
          className="absolute -bottom-2 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full"
        >
          <Text className="text-emerald-600 text-[10px] font-bold">
            {worker.status}
          </Text>
        </View>
      </View>

      <Text className="text-neutral-900 text-2xl font-extrabold mt-5">
        {worker.name}
      </Text>
      <Text className="text-neutral-500 text-base mt-1">{worker.role}</Text>

      <View className="flex-row items-center gap-2 mt-2">
        <RatingStars rating={worker.rating} />
        <View className="flex-row items-center -space-x-2">
          <View className="w-7 h-7 rounded-full bg-orange-500 border-2 border-white items-center justify-center">
            <Text className="text-white text-xs font-bold">K</Text>
          </View>
          <View className="w-7 h-7 rounded-full bg-violet-600 border-2 border-white items-center justify-center">
            <Text className="text-white text-xs font-bold">C</Text>
          </View>
        </View>
        <Text className="text-neutral-500 text-sm font-medium">
          ({worker.reviews})
        </Text>
      </View>

      <View className="flex-row items-center gap-2 mt-4">
        <MapPin size={14} color="#C81E1E" />
        <Text className="text-neutral-500 text-sm">{worker.location}</Text>
      </View>
    </View>
  );
}
