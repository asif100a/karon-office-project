import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ChevronRight } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

const MARKET_RATES = [
  {
    id: "1",
    title: "Labourer",
    rate: "$100 - $120/hour",
    tag: "Market Rate",
  },
  {
    id: "2",
    title: "Labourer",
    rate: "$100 - $120/hour",
    tag: "Market Rate",
  },
];

export default function MarketRate() {
  return (
    <View className="mt-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-neutral-950 text-[18px] font-semibold">
          Market Rate
        </Text>
        <ChevronRight size={22} color="#1F2937" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="-mx-5 px-5"
      >
        {MARKET_RATES.map((job, index) => (
          <View
            key={job.id}
            className={`bg-white rounded-xl px-4 py-4 border border-neutral-200/80 w-56 ${index === 0 ? "mr-3" : "mr-3"}`}
          >
            <View className="">
              <View className="flex-1 flex-row items-start justify-between gap-3">
                <Text className="text-neutral-900 font-bold text-base">
                  {job.title}
                </Text>
                <View className="bg-orange-50 px-2.5 py-1 rounded-md">
                  <Text
                    style={{ color: Colors.common.BRAND }}
                    className="text-[10px] font-semibold"
                  >
                    {job.tag}
                  </Text>
                </View>
              </View>
              <Text className="flex-1 text-neutral-500 text-sm mt-1">
                {job.rate}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
