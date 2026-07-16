import { View, Text } from "react-native";
import React from "react";

export default function CompletedWorkSummary() {
  const mockWeeklyWork = [
    { week: "Week 1", dates: "12th - 16th July", status: "Completed" },
    { week: "Week 1", dates: "12th - 16th July", status: "Approved" },
    { week: "Week 1", dates: "12th - 16th July", status: "Approved" },
    { week: "Week 1", dates: "12th - 16th July", status: "Approved" },
  ];

  return (
    <View>
      <Text className="text-neutral-900 font-extrabold text-base mb-4">
        Work Summary
      </Text>
      <View className="border border-neutral-200/80 rounded-xl bg-white overflow-hidden divide-y divide-neutral-50">
        {mockWeeklyWork.map((item, idx) => (
          <View key={idx} className="flex-row justify-between items-center p-4">
            <View>
              <Text className="text-neutral-800 font-extrabold text-sm">
                {item.week}
              </Text>
              <Text className="text-neutral-400 text-xs font-semibold mt-0.5">
                {item.dates}
              </Text>
            </View>
            <View
              className={`px-3 py-1 rounded-full ${item.status === "Approved" ? "bg-green-50" : "bg-neutral-100"}`}
            >
              <Text
                className={`text-[10px] font-extrabold ${item.status === "Approved" ? "text-green-600" : "text-neutral-500"}`}
              >
                {item.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
