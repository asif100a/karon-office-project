import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { Star } from "lucide-react-native";

export default function ReviewComposer({
  reviewRating,
  setReviewRating,
  reviewText,
  setReviewText,
}: {
  reviewRating: number;
  setReviewRating: (rating: number) => void;
  reviewText: string;
  setReviewText: (text: string) => void;
}) {
  return (
    <View className="flex-1">
      <View className="items-center justify-center flex-row gap-2 mt-4 mb-4">
        {Array.from({ length: 5 }).map((_, index) => {
          const value = index + 1;
          const active = value <= reviewRating;

          return (
            <TouchableOpacity
              key={value}
              onPress={() => setReviewRating(value)}
              className="p-1"
              activeOpacity={0.85}
            >
              <Star
                size={40}
                color={active ? "#FDBA3F" : "#D1D5DB"}
                fill={active ? "#FDBA3F" : "transparent"}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="bg-white border border-neutral-200/80 rounded-2xl px-4 py-3 min-h-[240px]">
        <TextInput
          value={reviewText}
          onChangeText={setReviewText}
          placeholder="What Did You Think?....."
          placeholderTextColor="#6B7280"
          multiline
          textAlignVertical="top"
          className="text-neutral-900 text-sm leading-6 flex-1"
        />
      </View>
    </View>
  );
}
