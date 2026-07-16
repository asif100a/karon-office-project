import { View, Text } from "react-native";
import React from "react";
import { Star } from "lucide-react-native";

export default function WorkerRatingStars({ rating }: { rating: string }) {
  const fullStars = Math.floor(Number(rating));
  return (
    <View className="flex-row items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          color={index < fullStars ? "#FBBF24" : "#D1D5DB"}
          fill={index < fullStars ? "#FBBF24" : "transparent"}
        />
      ))}
    </View>
  );
}
