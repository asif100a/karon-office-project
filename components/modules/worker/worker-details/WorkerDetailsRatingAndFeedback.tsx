import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import WorkerRatingStars from "./_ui/WorkerRatingStars";
import { Colors } from "@/constants/Colors";

export default function WorkerDetailsRatingAndFeedback({
  worker,
  setShowReviewComposer,
}: {
  worker: any;
  setShowReviewComposer: (show: boolean) => void;
}) {
  return (
    <View className="mt-6">
      <Text className="text-neutral-900 text-base font-extrabold mb-3">
        Rating & Feedback
      </Text>

      <View className="bg-white rounded-xl p-4 border border-neutral-200/80">
        <View className="flex-row items-center gap-4">
          <View className="items-center">
            <Text className="text-neutral-900 text-4xl font-extrabold">
              {worker.rating}
            </Text>
            <Text className="text-neutral-400 text-xs">/5</Text>
            <View className="mt-2">
              <WorkerRatingStars rating={worker.rating} />
            </View>
            <Text className="text-neutral-400 text-xs mt-2">
              {worker.reviews}
            </Text>
          </View>

          <View className="flex-1 gap-2">
            {[200, 40, 32, 19, 7].map((value, index) => (
              <View
                key={`${value}-${index}`}
                className="flex-row items-center gap-2"
              >
                <Text className="text-neutral-400 text-xs w-4 text-right">
                  {5 - index}
                </Text>
                <View className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-slate-500 rounded-full"
                    style={{
                      width: `${Math.max(15, value / 2)}%`,
                    }}
                  />
                </View>
                <Text className="text-neutral-400 text-xs w-8 text-right">
                  {value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setShowReviewComposer(true)}
        style={{ backgroundColor: Colors.common.GRAY_DARK }}
        className="w-full py-4 rounded-xl items-center justify-center active:opacity-90 mt-4"
      >
        <Text className="text-white font-extrabold text-sm">Write Review</Text>
      </TouchableOpacity>
    </View>
  );
}
